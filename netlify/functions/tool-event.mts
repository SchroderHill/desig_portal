import { getStore, getDeployStore } from "@netlify/blobs";
import type { Config, Context } from "@netlify/functions";

// No IPs, user agents, URLs, project labels or design data are persisted.
export default async (request: Request, context: Context) => {
  const reply = (status: number) => new Response(null, { status, headers: { "Cache-Control": "no-store" } });
  if (request.method !== "POST") return reply(405);
  if (request.headers.get("origin") !== new URL(request.url).origin) return reply(403);
  if (request.headers.get("sec-fetch-site") !== "same-origin") return reply(403);
  if (/bot|crawler|spider|headless|slurp|curl|wget/i.test(request.headers.get("user-agent") || "")) return reply(204);
  if (Number(request.headers.get("content-length") || 0) > 512) return reply(413);
  try {
    const raw = await request.text();
    if (raw.length > 512) return reply(413);
    const data = JSON.parse(raw);
    const allowed = ["page_view", "geojson_download", "design_package_download", "report_click", "report_pdf_ready", "print_dialog_open", "map_pdf_click", "map_pdf_ready"];
    if (!allowed.includes(data.event) || !/^[0-9a-f-]{36}$/.test(data.id) ||
        Object.keys(data).some(key => !["event", "id"].includes(key))) return reply(400);
    const now = new Date().toISOString();
    const country = context.geo?.country?.code || "UNKNOWN";
    const code = context.geo?.subdivision?.code?.replace(/^NZ-/, "").toUpperCase();
    const region = country === "NZ" && code && ["NTL","AUK","WKO","BOP","GIS","HKB","TKI","MWT","WGN","TAS","NSN","MBH","WTC","CAN","OTA","STL","CIT"].includes(code) ? code : "UNKNOWN";
    const store = context.deploy.context === "production"
      ? getStore("tool-events-v1") : getDeployStore("tool-events-v1");
    await store.setJSON(`events/${now.slice(0,10)}/${data.id}/${data.event}`, {
      version: 2, event: data.event, receivedAt: now, country, region
    });
    return reply(204);
  } catch {
    return reply(503);
  }
};

export const config: Config = {
  path: "/api/tool-event",
  rateLimit: { windowLimit: 60, windowSize: 60, aggregateBy: ["ip", "domain"] }
};

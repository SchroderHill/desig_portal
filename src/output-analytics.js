/**
 * Best-effort, cookie-free output events. The random ID identifies one action,
 * not a visitor. A blocked collector must never interfere with an export.
 * @param {string} event
 * @param {string} [actionId]
 * @returns {string | undefined}
 */
export function trackOutput(event, actionId) {
  try {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ||
        window.navigator.doNotTrack === "1" || window.navigator.webdriver ||
        window.localStorage.getItem("sh-disable-analytics") === "1") return;
    const id = actionId || window.crypto.randomUUID();
    const body = JSON.stringify({ event, id });
    void window.fetch("/api/tool-event", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body, keepalive: true, credentials: "omit"
    }).catch(() => {});
    return id;
  } catch { return; }
}
let pageViewScheduled = false;

/** Count one visible canonical page load. Ignore SPA fallback scanner paths. */
export function trackPageView() {
  try {
  if (pageViewScheduled || !["/", "/index.html"].includes(window.location?.pathname || "")) return;
  pageViewScheduled = true;
  const sendWhenVisible = () => {
    if (document.visibilityState !== "visible") return;
    document.removeEventListener("visibilitychange", sendWhenVisible);
    trackOutput("page_view");
  };
  if (document.visibilityState === "visible") sendWhenVisible();
  else document.addEventListener("visibilitychange", sendWhenVisible);
  } catch { /* Analytics must never prevent application startup. */ }
}

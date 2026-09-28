// @ts-nocheck
/* global Request */
import { beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({setJSON: vi.fn(), production: vi.fn(), preview: vi.fn()}));
vi.mock("@netlify/blobs", () => ({
 getStore: (...args) => {mocks.production(...args); return {setJSON:mocks.setJSON};},
 getDeployStore: (...args) => {mocks.preview(...args); return {setJSON:mocks.setJSON};}
}));
import collect from "../netlify/functions/tool-event.mts";
const id = "11111111-1111-4111-8111-111111111111";
function request(data = {event:"report_click",id}, headers = {}) {
 return new Request("https://tool.example/api/tool-event", {method:"POST",
 headers:{origin:"https://tool.example","sec-fetch-site":"same-origin","user-agent":"Mozilla/5.0",...headers},
 body:JSON.stringify(data)});
}
const context = {deploy:{context:"production"},geo:{country:{code:"NZ"}}};
describe("event collector", () => {
 beforeEach(()=>{vi.clearAllMocks();mocks.setJSON.mockResolvedValue(undefined);});
 it("uses server country and persists no visitor or design information", async()=>{
  const result = await collect(request(), context);
  expect(result.status).toBe(204);
  const [key,value] = mocks.setJSON.mock.calls[0];
  expect(key).toContain(id);
  expect(value).toEqual({version:2,event:"report_click",country:"NZ",region:"UNKNOWN",receivedAt:expect.any(String)});
  expect(mocks.production).toHaveBeenCalledWith("tool-events-v1");
 });
 it("rejects foreign origins, unknown actions and extra data", async()=>{
  expect((await collect(request(undefined,{origin:"https://foreign.example"}),context)).status).toBe(403);
  expect((await collect(request({event:"unknown",id}),context)).status).toBe(400);
  expect((await collect(request({event:"report_click",id,country:"NZ"}),context)).status).toBe(400);
  expect(mocks.setJSON).not.toHaveBeenCalled();
 });
 it("ignores recognisable bots and isolates preview events", async()=>{
  await collect(request(undefined,{"user-agent":"Googlebot"}),context);
  expect(mocks.setJSON).not.toHaveBeenCalled();
  await collect(request(), {...context,deploy:{context:"deploy-preview"}});
  expect(mocks.preview).toHaveBeenCalledWith("tool-events-v1");
 });
 it("reports failed writes as unavailable instead of acknowledging them", async()=>{
  await collect(request({event:"page_view",id}), {...context,geo:{country:{code:"NZ"},subdivision:{code:"NZ-TAS",name:"Tasman"},city:"Private city",latitude:-41,longitude:173}});
  expect(mocks.setJSON.mock.calls[0][1]).toEqual({version:2,event:"page_view",country:"NZ",region:"TAS",receivedAt:expect.any(String)});
  mocks.setJSON.mockRejectedValue(new Error("storage unavailable"));
  expect((await collect(request(),context)).status).toBe(503);
 });
});

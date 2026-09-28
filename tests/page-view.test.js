// @ts-nocheck
import { beforeEach, afterEach, expect, it, vi } from "vitest";
let browser, page, onVisible;
beforeEach(() => {
 vi.resetModules();
 browser={location:{hostname:"tool.example",pathname:"/"},navigator:{webdriver:false},localStorage:{getItem:()=>null},crypto:{randomUUID:()=>"11111111-1111-4111-8111-111111111111"},fetch:vi.fn().mockResolvedValue({})};
 page={visibilityState:"visible",addEventListener:vi.fn((event,callback)=>{onVisible=callback;}),removeEventListener:vi.fn()};
 vi.stubGlobal("window",browser);vi.stubGlobal("document",page);
});
afterEach(()=>vi.unstubAllGlobals());
it("records one visible canonical page load", async()=>{
 const {trackPageView}=await import("../src/output-analytics.js");
 trackPageView();trackPageView();
 expect(browser.fetch).toHaveBeenCalledTimes(1);
 expect(JSON.parse(browser.fetch.mock.calls[0][1].body).event).toBe("page_view");
});
it("does not count unmatched SPA scanner paths", async()=>{
 browser.location.pathname="/.env";
 const {trackPageView}=await import("../src/output-analytics.js");
 trackPageView();
 expect(browser.fetch).not.toHaveBeenCalled();
});
it("waits for a hidden tab to be viewed", async()=>{
 page.visibilityState="hidden";
 const {trackPageView}=await import("../src/output-analytics.js");
 trackPageView();
 expect(browser.fetch).not.toHaveBeenCalled();
 page.visibilityState="visible";onVisible();
 expect(browser.fetch).toHaveBeenCalledTimes(1);
 expect(page.removeEventListener).toHaveBeenCalled();
});

it("does not break startup when browser APIs are unavailable", async()=>{
 delete browser.location;
 const {trackPageView}=await import("../src/output-analytics.js");
 expect(()=>trackPageView()).not.toThrow();
 expect(browser.fetch).not.toHaveBeenCalled();
});

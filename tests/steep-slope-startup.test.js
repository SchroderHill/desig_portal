import { describe, expect, it, vi } from "vitest";
import { initialiseSteepSlope } from "../src/steep-slope-controller.js";

describe("slope startup before Mapbox style loads", () => {
  it("waits for style.load without crashing portal startup", () => {
    let loaded = false;
    const sources = new Map();
    const layers = new Map();
    const handlers = new Map();
    const map = {
      isStyleLoaded: () => loaded,
      getStyle: vi.fn(() => { throw new Error("Style not ready"); }),
      getSource: (id) => sources.get(id),
      getLayer: (id) => layers.get(id),
      addSource: vi.fn((id) => sources.set(id, { setData: vi.fn() })),
      addLayer: vi.fn((layer) => layers.set(layer.id, layer)),
      once: vi.fn(),
      on: (event, handler) => handlers.set(event, handler),
    };
    const buttonElement = { addEventListener: vi.fn() };
    expect(() => initialiseSteepSlope({
      map, draw: { getAll: () => ({ features: [] }) },
      accessToken: "test", buttonElement,
    })).not.toThrow();
    expect(map.getStyle).not.toHaveBeenCalled();
    expect(map.addSource).not.toHaveBeenCalled();
    expect(buttonElement.addEventListener).toHaveBeenCalledWith("click", expect.any(Function));
    loaded = true;
    handlers.get("style.load")();
    expect(map.addSource).toHaveBeenCalledTimes(1);
    expect(map.addLayer).toHaveBeenCalledTimes(2);
  });
});

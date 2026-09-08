import { describe, expect, it, vi } from "vitest";
import { downloadDesignKml, geojsonToKml } from "../src/kml-export.js";

const road = {
  type: "Feature",
  geometry: { type: "LineString", coordinates: [[172.8, -41.6], [172.81, -41.61]] },
  properties: {},
};
const pad = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [[
      [172.8, -41.6],
      [172.81, -41.6],
      [172.81, -41.61],
      [172.8, -41.6],
    ]],
  },
  properties: {},
};

describe("KML export", () => {
  it("exports roads and pads with their expected KML geometry and styles", () => {
    const kml = geojsonToKml([road, pad]);

    expect(kml).toContain("<name>Line 1</name>");
    expect(kml).toContain("<LineString>");
    expect(kml).toContain("172.8,-41.6,0 172.81,-41.61,0");
    expect(kml).toContain("<name>Polygon 2</name>");
    expect(kml).toContain("<Polygon><outerBoundaryIs><LinearRing>");
    expect(kml).toContain("<styleUrl>#polyStyle</styleUrl>");
  });

  it("ignores unsupported feature geometry", () => {
    const kml = geojsonToKml([{ type: "Feature", geometry: { type: "Point", coordinates: [0, 0] } }]);

    expect(kml).not.toContain("<Placemark>");
    expect(kml).toContain("<Document>");
  });

  it("downloads a named KML file and releases its temporary URL", () => {
    const click = vi.fn();
    const remove = vi.fn();
    const appendChild = vi.fn();
    const link = { click, remove, href: "", download: "" };
    const documentRef = { body: { appendChild }, createElement: vi.fn(() => link) };
    const urlApi = {
      createObjectURL: vi.fn(() => "blob:test-kml"),
      revokeObjectURL: vi.fn(),
    };
    class FakeBlob {
      constructor(parts, options) {
        this.parts = parts;
        this.type = options.type;
      }
    }

    downloadDesignKml([road], { documentRef, urlApi, BlobClass: FakeBlob });

    expect(link.href).toBe("blob:test-kml");
    expect(link.download).toBe("design_export.kml");
    expect(appendChild).toHaveBeenCalledWith(link);
    expect(click).toHaveBeenCalledOnce();
    expect(remove).toHaveBeenCalledOnce();
    expect(urlApi.revokeObjectURL).toHaveBeenCalledWith("blob:test-kml");
  });
});

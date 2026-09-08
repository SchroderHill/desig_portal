export function geojsonToKml(features) {
  const supportedFeatures = (features ?? []).filter(({ geometry }) => (
    geometry?.type === "LineString" || geometry?.type === "Polygon"
  ));
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Design Portal Export</name>
    <Style id="lineStyle">
      <LineStyle><color>ffD20C0C</color><width>3</width></LineStyle>
    </Style>
    <Style id="polyStyle">
      <LineStyle><color>ffD20C0C</color><width>2</width></LineStyle>
      <PolyStyle><color>40D20C0C</color></PolyStyle>
    </Style>`;
  const placemarks = supportedFeatures.map((feature, index) => {
    const isLine = feature.geometry.type === "LineString";
    const coordinates = isLine ? feature.geometry.coordinates : feature.geometry.coordinates[0];
    const geometryName = isLine ? "LineString" : "Polygon";
    const boundaryStart = isLine ? "" : "<outerBoundaryIs><LinearRing>";
    const boundaryEnd = isLine ? "" : "</LinearRing></outerBoundaryIs>";
    const coordinateText = coordinates
      .map(([longitude, latitude, altitude = 0]) => `${longitude},${latitude},${altitude}`)
      .join(" ");

    return `
    <Placemark>
      <name>${isLine ? "Line" : "Polygon"} ${index + 1}</name>
      <styleUrl>${isLine ? "#lineStyle" : "#polyStyle"}</styleUrl>
      <${geometryName}>${boundaryStart}<coordinates>${coordinateText}</coordinates>${boundaryEnd}</${geometryName}>
    </Placemark>`;
  }).join("");

  return `${header}${placemarks}
  </Document>
</kml>`;
}

export function downloadDesignKml(features, {
  documentRef = document,
  urlApi = URL,
  BlobClass = Blob,
} = {}) {
  const blob = new BlobClass([geojsonToKml(features)], {
    type: "application/vnd.google-earth.kml+xml",
  });
  const url = urlApi.createObjectURL(blob);
  const link = documentRef.createElement("a");
  link.href = url;
  link.download = "design_export.kml";
  documentRef.body.appendChild(link);
  link.click();
  link.remove();
  urlApi.revokeObjectURL(url);
}

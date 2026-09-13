# Export delivery operations

The export package contains NZTM GeoPackage layers, the annotated original PDF, metadata, optional classified slope polygons/coverage cells and optional DEM. PDF page 1's imported georeferenced panel is the crop; other pages are preserved. Snapshot geometry at preparation time. The native DEM option is limited to 25 million cells and may be omitted independently with a recorded reason.

## Netlify setup

- Deploy `netlify/functions/design-packages.mjs` with the site. It uses site-scoped Netlify Blobs through runtime credentials; no browser secret or separate provider is required.
- Enable Netlify form detection and confirm `design-portal-submission` appears after deployment.
- Configure a notification for **that form only** to **thomas@schroderhill.co.nz**. Do not reuse the Skid Builder notification/form. The submitted subject includes the job and unique DP reference; ensure the notification configuration does not replace it with a fixed subject.
- Each package is uploaded in 2 MiB chunks (maximum 256 MiB). The server validates exact chunk lengths and initial ZIP signature, verifies all chunks before completion, and freezes completed packages. Uploads must finish within 24 hours.
- Email carries a `download.html#<random capability>` link; the browser assembles chunks locally, avoiding oversized function responses and email attachments. Anyone holding that link can download the package. Do not publish these links in public logs or pages. Blobs are not exposed via a public listing endpoint.
- A rate limit of 180 requests per minute per IP/domain protects the function; inspect Netlify deploy logs to confirm enforcement. Review actual usage in Netlify before broad launch. Completed files currently remain stored until an administrator removes them; agree a retention policy before large-scale rollout. Incomplete uploads also require administrative cleanup.
- Client retains a submission reference for retries within the open dialog. A network failure after form acceptance can still result in duplicate notification; use the reference to identify that case.

## Release verification still required

Verify the deployed blob service, >35 MB package upload/download, form acceptance, and notification configuration on a Netlify preview. A real email receipt/threading test requires an explicitly authorized test submission. Do not describe email delivery as verified from unit tests or a 200 response alone.

Local evidence: 63 tests initially passed; GDAL opened generated GeoPackage as EPSG:2193; synthetic rotated georeference round-tripped; rendered PDF road passed through three control marks; second page preserved; browser local ZIP download succeeded. Detailed field-app compatibility, production delivery and DEM source comparisons are separate acceptance checks.

## Preview verification — 13 September 2026

- Commit 7f0784d deployed successfully on PR #2 after retrying a transient GitHub host-key error in Netlify's repository preparation.
- Enabled Netlify form detection and configured a notification only for design-portal-submission to thomas@schroderhill.co.nz. The form's unique subject takes priority.
- Hosted 37,791,858-byte synthetic ZIP uploaded in 19 chunks and downloaded with an identical SHA-256 checksum.
- Two explicitly authorised synthetic submissions were accepted. The user confirmed both emails arrived separately and both download links work.
- Browser preview generated and sent a package containing the annotated source PDF, GeoPackage with 3,156 slope polygons, coverage metadata and a 658 x 944 EPSG:2193 1 m DEM. DEM contained 443,074 valid elevation cells (362.177 to 592.138 m), with NoData outside the map footprint. GDAL opened the slope layer; rendered PDF shading stayed inside the source map panel.
- 65 automated tests passed. Production is unchanged; preview review and merge remain separate release steps. Source-accuracy comparison and field-app compatibility remain acceptance checks, not claims established by these delivery tests.

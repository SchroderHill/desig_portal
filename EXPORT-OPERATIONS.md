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

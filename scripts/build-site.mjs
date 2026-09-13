import { access, cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDir = join(projectRoot, "site-dist");

async function copy(relativePath) {
  const source = join(projectRoot, relativePath);
  await access(source);
  await cp(source, join(outputDir, relativePath), { recursive: true });
}

async function copyIfPresent(relativePath) {
  try {
    await copy(relativePath);
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

await copy("index.html");
await copy("download.html");
await copy("submission-form.html");
await copy("geopdf-dist");
await copyIfPresent(join("data", "slope"));

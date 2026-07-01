import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  publicDir: false,
  build: {
    outDir: "geopdf-dist",
    emptyOutDir: true,
    target: "es2022",
    lib: {
      entry: "src/geopdf-controller.js",
      formats: ["es"],
      fileName: () => "geopdf-importer.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
      },
    },
  },
});

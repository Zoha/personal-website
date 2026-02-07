import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { compression } from "vite-plugin-compression2";
export default defineConfig({
  base: "/",
  plugins: [
    tailwindcss(),
    compression({ algorithms: ["gzip", "brotliCompress"] }),
  ],
  build: {
    cssMinify: true,
    minify: true,
  },
});

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "copy-favicon",
      apply: "build",
      generateBundle() {
        // Ensure favicon.png is copied to dist
        const publicDir = path.resolve(__dirname, "public");
        const distDir = path.resolve(__dirname, "dist");

        if (!fs.existsSync(distDir)) {
          fs.mkdirSync(distDir, { recursive: true });
        }

        const faviconSrc = path.join(publicDir, "favicon.png");
        const faviconDest = path.join(distDir, "favicon.png");
        if (fs.existsSync(faviconSrc)) {
          fs.copyFileSync(faviconSrc, faviconDest);
        }
      },
    },
  ],
});

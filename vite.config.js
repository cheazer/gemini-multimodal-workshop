import { defineConfig } from "vite";

export default defineConfig({
  // relative paths so the built app works on GitHub Pages under /your-repo-name/
  base: "./",
  server: { open: true },
});

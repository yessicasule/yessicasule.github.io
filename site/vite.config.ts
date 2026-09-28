import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base is "/" for local dev; GitHub Pages base path is configured at deploy stage.
export default defineConfig({
  plugins: [react()],
});

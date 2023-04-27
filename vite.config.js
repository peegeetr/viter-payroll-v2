import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { baseUrl } from "./src/component/helpers/functions-general";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: baseUrl,
  build: {
    chunkSizeWarningLimit: 1600,
  },
});

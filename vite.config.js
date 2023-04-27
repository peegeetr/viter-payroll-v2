import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { devNavUrl } from "./src/component/helpers/functions-general";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: devNavUrl,
  build: {
    chunkSizeWarningLimit: 1600,
  },
});

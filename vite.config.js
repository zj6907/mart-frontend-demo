import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@views": path.resolve(__dirname, "src/views"),
      "@composables": path.resolve(__dirname, "src/composables"),
    },
  },
  envPrefix: "APP_",
  server: {
    host: "0.0.0.0", // Allow access from any device on the local network
    port: 3000, // Or your desired port
  },
})

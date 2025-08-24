import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const plugins = [
  react(),
  runtimeErrorOverlay(),
];

// Conditionally add cartographer plugin without dynamic import
if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
  try {
    const { cartographer } = require("@replit/vite-plugin-cartographer");
    plugins.push(cartographer());
  } catch (error) {
    console.warn("Cartographer plugin not available, skipping...");
  }
}

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
});
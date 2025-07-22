/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "dist/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    global: "globalThis",
  },
  build: {
    lib: {
      entry: "src/index.tsx",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      // Don't externalize React - bundle it instead
      external: [],
      output: {
        globals: {},
        manualChunks: undefined, // Keep everything in a single bundle
      },
    },
    // Optimize build
    minify: "terser",
    sourcemap: false,
    target: "esnext",
    reportCompressedSize: true,
  },
  // Development optimizations
  server: {
    hmr: true,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@anywidget/react", "@assistant-ui/react", "react-markdown"],
  },
  // Test configuration
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "**/*.test.{ts,tsx}",
        "**/*.config.{ts,js}",
      ],
    },
  },
});

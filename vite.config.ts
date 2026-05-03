import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    reportCompressedSize: false,
    cssCodeSplit: true,
    // Inline small assets as base64 to save HTTP requests
    assetsInlineLimit: 4096,
    // Target modern browsers for smaller output
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core React runtime — always needed
          if (id.includes('react-dom') || id.includes('react/') || id.includes('scheduler')) {
            return 'react';
          }
          // Routing + data fetching — loaded on every page
          if (id.includes('wouter') || id.includes('@tanstack/react-query')) {
            return 'vendor';
          }
          // Animation library — lazy-split from initial bundle
          if (id.includes('framer-motion')) {
            return 'motion';
          }
          // Icons — tree-shaken but still large
          if (id.includes('react-icons') || id.includes('lucide-react')) {
            return 'icons';
          }
          // Radix UI — UI primitives used across many pages
          if (id.includes('@radix-ui')) {
            return 'ui';
          }
          // Utility libraries
          if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('date-fns') || id.includes('class-variance-authority')) {
            return 'utils';
          }
        },
        // Predictable file names for caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});

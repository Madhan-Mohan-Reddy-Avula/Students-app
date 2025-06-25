import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",      // Accepts all network interfaces
    port: 8080,      // Dev server will run on http://localhost:8080
  },
  plugins: [
    react(),                          // React + SWC
    mode === 'development' && componentTagger(), // Tagger only in dev
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // '@' now maps to ./src
    },
  },
}));

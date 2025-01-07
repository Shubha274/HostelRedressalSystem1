import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // If you're using React

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // Backend server URL
        changeOrigin: true, // Ensures the host header is updated to match the target
        secure: false, // If using HTTPS and the backend server has self-signed certificates
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Removes '/api' prefix if needed
      },
    },
    hmr: true,
  },
});

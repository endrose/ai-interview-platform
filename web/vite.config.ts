import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 5173,
        proxy: {
            "/api": {
                target: "http://127.0.0.1:3001",
                changeOrigin: true,
                secure: false,
            },
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    "vendor-react": ["react", "react-dom", "react-router-dom"],
                    "vendor-ui": [
                        "@radix-ui/react-dialog",
                        "@radix-ui/react-select",
                        "@radix-ui/react-tabs",
                        "@radix-ui/react-alert-dialog",
                        "@radix-ui/react-dropdown-menu"
                    ],
                    "vendor-misc": ["axios", "jotai", "lucide-react", "react-hook-form"],
                },
            },
        },
    },
});
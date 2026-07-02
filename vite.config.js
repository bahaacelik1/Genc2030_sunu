import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages için base path — VITE_BASE env değişkeni ile geçilir.
// Örnek: repo "yz-gorsel-sunum" ise VITE_BASE=/yz-gorsel-sunum/ ile build alınır.
// Lokal geliştirmede base=/ olur (deploy workflow'u değeri set eder).
// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE || "/",
  plugins: [react()],
});

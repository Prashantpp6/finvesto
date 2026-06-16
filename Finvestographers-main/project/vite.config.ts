import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import { URL } from 'node:url';

// Read package.json to derive a base path when `homepage` is set
const pkgPath = new URL('./package.json', import.meta.url);
let basePath = '/';
try {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  if (pkg && pkg.homepage) {
    try {
      const u = new URL(pkg.homepage);
      basePath = u.pathname.endsWith('/') ? u.pathname : `${u.pathname}/`;
    } catch (e) {
      // ignore invalid homepage
    }
  }
} catch (e) {
  // ignore read errors
}

// https://vitejs.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

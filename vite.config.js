import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        nosotros: resolve(process.cwd(), 'nosotros.html'),
        proyectos: resolve(process.cwd(), 'proyectos.html'),
      },
    },
  },
});

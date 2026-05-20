import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          /* Split node_modules into separate chunks for better caching */
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three';
            }
            if (id.includes('gsap')) {
              return 'gsap';
            }
            if (id.includes('framer-motion')) {
              return 'motion';
            }
            if (id.includes('@studio-freight')) {
              return 'lenis';
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react';
            }
            /* Everything else from node_modules goes into 'vendor' */
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 2000,
  },
});
// vite.config.js
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'; // Import the plugin

export default defineConfig({
  plugins: [
    tailwindcss(), // Add the plugin to the plugins array
    // ... other plugins
  ],
});

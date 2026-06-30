import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

/**
 * Inlines the single built CSS bundle into <head> as a <style> tag and removes
 * the render-blocking <link rel="stylesheet">. The CSS is small (~9 KB gzipped)
 * so inlining removes a critical-path request and eliminates render-blocking CSS.
 */
function inlineCriticalCss(): Plugin {
  return {
    name: 'inline-critical-css',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html;
      let result = html;
      for (const [fileName, asset] of Object.entries(ctx.bundle)) {
        if (asset.type !== 'asset' || !fileName.endsWith('.css')) continue;
        const css = String(asset.source);
        const base = fileName.split('/').pop()!;
        const linkRe = new RegExp(
          `<link[^>]*rel="stylesheet"[^>]*href="[^"]*${base}"[^>]*>`,
          'g'
        );
        result = result.replace(linkRe, '');
        result = result.replace('</head>', `<style>${css}</style></head>`);
        delete ctx.bundle[fileName];
      }
      return result;
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), inlineCriticalCss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'es2020',
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          // Keep the stable React runtime in its own long-cacheable chunk.
          manualChunks(id) {
            if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) {
              return 'react';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

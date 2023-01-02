// vite.config.ts
import * as path from "path";
import react from "file:///home/omar/Hungry-for-Grades/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig, loadEnv } from "file:///home/omar/Hungry-for-Grades/client/node_modules/vite/dist/node/index.js";
import removeConsole from "file:///home/omar/Hungry-for-Grades/client/node_modules/vite-plugin-remove-console/dist/index.js";
import svgrPlugin from "file:///home/omar/Hungry-for-Grades/client/node_modules/vite-plugin-svgr/dist/index.mjs";
import viteTsconfigPaths from "file:///home/omar/Hungry-for-Grades/client/node_modules/vite-tsconfig-paths/dist/index.mjs";
import { VitePWA } from "file:///home/omar/Hungry-for-Grades/client/node_modules/vite-plugin-pwa/dist/index.mjs";
var __vite_injected_original_dirname = "/home/omar/Hungry-for-Grades/client";
var aliases = [
  {
    find: "@",
    replacement: path.resolve(__vite_injected_original_dirname, "./src")
  },
  {
    find: "@components",
    replacement: path.resolve(__vite_injected_original_dirname, "./src/components")
  },
  {
    find: "@enums",
    replacement: path.resolve(__vite_injected_original_dirname, "./src/enums")
  },
  {
    find: "@store",
    replacement: path.resolve(__vite_injected_original_dirname, "./src/store")
  },
  {
    find: "@interfaces",
    replacement: path.resolve(__vite_injected_original_dirname, "./src/interfaces")
  },
  {
    find: "@pages",
    replacement: path.resolve(__vite_injected_original_dirname, "./src/pages")
  },
  {
    find: "@hooks",
    replacement: path.resolve(__vite_injected_original_dirname, "./src/hooks")
  }
];
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = env.VITE_APP_ENV !== "prod" ? "/" : "https://your_cdn_domain/";
  const PORT = parseInt(env.VITE_APP_CLIENT_PORT);
  return {
    base,
    resolve: {
      alias: aliases
    },
    plugins: [
      react({
        include: "**/*.tsx"
      }),
      viteTsconfigPaths({
        root: path.resolve(__vite_injected_original_dirname, "./"),
        projects: ["./tsconfig.json"],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
      }),
      svgrPlugin(),
      VitePWA({ registerType: "autoUpdate" }),
      removeConsole()
    ],
    server: {
      port: PORT,
      open: true
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/setupTests.ts"]
    },
    build: {
      outDir: "build"
    }
  };
});
export {
  aliases,
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9vbWFyL0h1bmdyeS1mb3ItR3JhZGVzL2NsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvb21hci9IdW5ncnktZm9yLUdyYWRlcy9jbGllbnQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvb21hci9IdW5ncnktZm9yLUdyYWRlcy9jbGllbnQvdml0ZS5jb25maWcudHNcIjsvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXMgKi9cbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwidml0ZXN0XCIgLz5cbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwidml0ZS9jbGllbnRcIiAvPlxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHJlbW92ZUNvbnNvbGUgZnJvbSAndml0ZS1wbHVnaW4tcmVtb3ZlLWNvbnNvbGUnO1xuaW1wb3J0IHN2Z3JQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tc3Zncic7XG5pbXBvcnQgdml0ZVRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcblxuZXhwb3J0IGNvbnN0IGFsaWFzZXMgPSBbXG5cdHtcblx0XHRmaW5kOiAnQCcsXG5cdFx0cmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpXG5cdH0sXG5cdHtcblx0XHRmaW5kOiAnQGNvbXBvbmVudHMnLFxuXHRcdHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvY29tcG9uZW50cycpXG5cdH0sXG5cdHtcblx0XHRmaW5kOiAnQGVudW1zJyxcblx0XHRyZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2VudW1zJylcblx0fSxcblx0e1xuXHRcdGZpbmQ6ICdAc3RvcmUnLFxuXHRcdHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvc3RvcmUnKVxuXHR9LFxuXHR7XG5cdFx0ZmluZDogJ0BpbnRlcmZhY2VzJyxcblx0XHRyZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2ludGVyZmFjZXMnKVxuXHR9LFxuXHR7XG5cdFx0ZmluZDogJ0BwYWdlcycsXG5cdFx0cmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9wYWdlcycpXG5cdH0sXG5cdHtcblx0XHRmaW5kOiAnQGhvb2tzJyxcblx0XHRyZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2hvb2tzJylcblx0fVxuXTtcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcblx0Y29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJyk7XG5cdGNvbnN0IGJhc2UgPVxuXHRcdGVudi5WSVRFX0FQUF9FTlYgIT09ICdwcm9kJyA/ICcvJyA6ICdodHRwczovL3lvdXJfY2RuX2RvbWFpbi8nO1xuXHRjb25zdCBQT1JUID0gcGFyc2VJbnQoZW52LlZJVEVfQVBQX0NMSUVOVF9QT1JUKTtcblx0cmV0dXJuIHtcblx0XHRiYXNlLFxuXHRcdHJlc29sdmU6IHtcblx0XHRcdGFsaWFzOiBhbGlhc2VzXG5cdFx0fSxcblx0XHRwbHVnaW5zOiBbXG5cdFx0XHRyZWFjdCh7XG5cdFx0XHRcdGluY2x1ZGU6ICcqKi8qLnRzeCdcblx0XHRcdH0pLFxuXHRcdFx0dml0ZVRzY29uZmlnUGF0aHMoe1xuXHRcdFx0XHRyb290OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi8nKSxcblx0XHRcdFx0cHJvamVjdHM6IFsnLi90c2NvbmZpZy5qc29uJ10sXG5cdFx0XHRcdGV4dGVuc2lvbnM6IFsnLnRzJywgJy50c3gnLCAnLmpzJywgJy5qc3gnLCAnLmpzb24nXVxuXHRcdFx0fSksXG5cdFx0XHRzdmdyUGx1Z2luKCksXG5cdFx0XHRWaXRlUFdBKHsgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScgfSksXG5cdFx0XHRyZW1vdmVDb25zb2xlKClcblx0XHRdLFxuXHRcdHNlcnZlcjoge1xuXHRcdFx0cG9ydDogUE9SVCxcblx0XHRcdG9wZW46IHRydWVcblx0XHR9LFxuXHRcdHRlc3Q6IHtcblx0XHRcdGdsb2JhbHM6IHRydWUsXG5cdFx0XHRlbnZpcm9ubWVudDogJ2pzZG9tJyxcblx0XHRcdHNldHVwRmlsZXM6IFsnLi9zcmMvc2V0dXBUZXN0cy50cyddXG5cdFx0fSxcblx0XHRidWlsZDoge1xuXHRcdFx0b3V0RGlyOiAnYnVpbGQnXG5cdFx0fVxuXHR9O1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBR0EsWUFBWSxVQUFVO0FBRXRCLE9BQU8sV0FBVztBQUNsQixTQUFTLGNBQWMsZUFBZTtBQUN0QyxPQUFPLG1CQUFtQjtBQUMxQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLHVCQUF1QjtBQUM5QixTQUFTLGVBQWU7QUFWeEIsSUFBTSxtQ0FBbUM7QUFZbEMsSUFBTSxVQUFVO0FBQUEsRUFDdEI7QUFBQSxJQUNDLE1BQU07QUFBQSxJQUNOLGFBQWtCLGFBQVEsa0NBQVcsT0FBTztBQUFBLEVBQzdDO0FBQUEsRUFDQTtBQUFBLElBQ0MsTUFBTTtBQUFBLElBQ04sYUFBa0IsYUFBUSxrQ0FBVyxrQkFBa0I7QUFBQSxFQUN4RDtBQUFBLEVBQ0E7QUFBQSxJQUNDLE1BQU07QUFBQSxJQUNOLGFBQWtCLGFBQVEsa0NBQVcsYUFBYTtBQUFBLEVBQ25EO0FBQUEsRUFDQTtBQUFBLElBQ0MsTUFBTTtBQUFBLElBQ04sYUFBa0IsYUFBUSxrQ0FBVyxhQUFhO0FBQUEsRUFDbkQ7QUFBQSxFQUNBO0FBQUEsSUFDQyxNQUFNO0FBQUEsSUFDTixhQUFrQixhQUFRLGtDQUFXLGtCQUFrQjtBQUFBLEVBQ3hEO0FBQUEsRUFDQTtBQUFBLElBQ0MsTUFBTTtBQUFBLElBQ04sYUFBa0IsYUFBUSxrQ0FBVyxhQUFhO0FBQUEsRUFDbkQ7QUFBQSxFQUNBO0FBQUEsSUFDQyxNQUFNO0FBQUEsSUFDTixhQUFrQixhQUFRLGtDQUFXLGFBQWE7QUFBQSxFQUNuRDtBQUNEO0FBQ0EsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDekMsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBQzNDLFFBQU0sT0FDTCxJQUFJLGlCQUFpQixTQUFTLE1BQU07QUFDckMsUUFBTSxPQUFPLFNBQVMsSUFBSSxvQkFBb0I7QUFDOUMsU0FBTztBQUFBLElBQ047QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNSLE9BQU87QUFBQSxJQUNSO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUixNQUFNO0FBQUEsUUFDTCxTQUFTO0FBQUEsTUFDVixDQUFDO0FBQUEsTUFDRCxrQkFBa0I7QUFBQSxRQUNqQixNQUFXLGFBQVEsa0NBQVcsSUFBSTtBQUFBLFFBQ2xDLFVBQVUsQ0FBQyxpQkFBaUI7QUFBQSxRQUM1QixZQUFZLENBQUMsT0FBTyxRQUFRLE9BQU8sUUFBUSxPQUFPO0FBQUEsTUFDbkQsQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBLE1BQ1gsUUFBUSxFQUFFLGNBQWMsYUFBYSxDQUFDO0FBQUEsTUFDdEMsY0FBYztBQUFBLElBQ2Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNQO0FBQUEsSUFDQSxNQUFNO0FBQUEsTUFDTCxTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsTUFDYixZQUFZLENBQUMscUJBQXFCO0FBQUEsSUFDbkM7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNOLFFBQVE7QUFBQSxJQUNUO0FBQUEsRUFDRDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

// vite.config.ts
import * as path from "path";
import react from "file:///home/omar/acl/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig, loadEnv } from "file:///home/omar/acl/client/node_modules/vite/dist/node/index.js";
import removeConsole from "file:///home/omar/acl/client/node_modules/vite-plugin-remove-console/dist/index.js";
import svgrPlugin from "file:///home/omar/acl/client/node_modules/vite-plugin-svgr/dist/index.mjs";
import viteTsconfigPaths from "file:///home/omar/acl/client/node_modules/vite-tsconfig-paths/dist/index.mjs";
var __vite_injected_original_dirname = "/home/omar/acl/client";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9vbWFyL2FjbC9jbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL29tYXIvYWNsL2NsaWVudC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9vbWFyL2FjbC9jbGllbnQvdml0ZS5jb25maWcudHNcIjsvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXMgKi9cbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwidml0ZXN0XCIgLz5cbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwidml0ZS9jbGllbnRcIiAvPlxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHJlbW92ZUNvbnNvbGUgZnJvbSAndml0ZS1wbHVnaW4tcmVtb3ZlLWNvbnNvbGUnO1xuaW1wb3J0IHN2Z3JQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tc3Zncic7XG5pbXBvcnQgdml0ZVRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XG5leHBvcnQgY29uc3QgYWxpYXNlcyA9IFtcbiAge1xuICAgIGZpbmQ6ICdAJyxcbiAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJylcbiAgfSxcbiAge1xuICAgIGZpbmQ6ICdAY29tcG9uZW50cycsXG4gICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9jb21wb25lbnRzJylcbiAgfSxcblx0e1xuICAgIGZpbmQ6ICdAZW51bXMnLFxuICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvZW51bXMnKVxuICB9LFx0XG5cdHtcbiAgICBmaW5kOiAnQHN0b3JlJyxcbiAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3N0b3JlJylcbiAgfSxcblx0e1xuICAgIGZpbmQ6ICdAaW50ZXJmYWNlcycsXG4gICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9pbnRlcmZhY2VzJylcbiAgfSxcbiAge1xuICAgIGZpbmQ6ICdAcGFnZXMnLFxuICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvcGFnZXMnKVxuICB9LFxuICB7XG4gICAgZmluZDogJ0Bob29rcycsXG4gICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9ob29rcycpXG4gIH1cbl07XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpO1xuICBjb25zdCBiYXNlID1cbiAgICBlbnYuVklURV9BUFBfRU5WICE9PSAncHJvZCcgPyAnLycgOiAnaHR0cHM6Ly95b3VyX2Nkbl9kb21haW4vJztcbiAgY29uc3QgUE9SVCA9IHBhcnNlSW50KGVudi5WSVRFX0FQUF9DTElFTlRfUE9SVCk7XG4gIHJldHVybiB7XG4gICAgYmFzZSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczogYWxpYXNlc1xuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgcmVhY3Qoe1xuICAgICAgICBpbmNsdWRlOiAnKiovKi50c3gnXG4gICAgICB9KSxcbiAgICAgIHZpdGVUc2NvbmZpZ1BhdGhzKHtcbiAgICAgICAgcm9vdDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vJyksXG4gICAgICAgIHByb2plY3RzOiBbJy4vdHNjb25maWcuanNvbiddLFxuICAgICAgICBleHRlbnNpb25zOiBbJy50cycsICcudHN4JywgJy5qcycsICcuanN4JywgJy5qc29uJ11cbiAgICAgIH0pLFxuICAgICAgc3ZnclBsdWdpbigpLFxuICAgICAgcmVtb3ZlQ29uc29sZSgpXG4gICAgXSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHBvcnQ6IFBPUlQsXG4gICAgICBvcGVuOiB0cnVlXG4gICAgfSxcbiAgICB0ZXN0OiB7XG4gICAgICBnbG9iYWxzOiB0cnVlLFxuICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgICBzZXR1cEZpbGVzOiBbJy4vc3JjL3NldHVwVGVzdHMudHMnXVxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIG91dERpcjogJ2J1aWxkJ1xuICAgIH1cbiAgfTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUdBLFlBQVksVUFBVTtBQUV0QixPQUFPLFdBQVc7QUFDbEIsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyx1QkFBdUI7QUFUOUIsSUFBTSxtQ0FBbUM7QUFVbEMsSUFBTSxVQUFVO0FBQUEsRUFDckI7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLGFBQWtCLGFBQVEsa0NBQVcsT0FBTztBQUFBLEVBQzlDO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sYUFBa0IsYUFBUSxrQ0FBVyxrQkFBa0I7QUFBQSxFQUN6RDtBQUFBLEVBQ0Q7QUFBQSxJQUNHLE1BQU07QUFBQSxJQUNOLGFBQWtCLGFBQVEsa0NBQVcsYUFBYTtBQUFBLEVBQ3BEO0FBQUEsRUFDRDtBQUFBLElBQ0csTUFBTTtBQUFBLElBQ04sYUFBa0IsYUFBUSxrQ0FBVyxhQUFhO0FBQUEsRUFDcEQ7QUFBQSxFQUNEO0FBQUEsSUFDRyxNQUFNO0FBQUEsSUFDTixhQUFrQixhQUFRLGtDQUFXLGtCQUFrQjtBQUFBLEVBQ3pEO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sYUFBa0IsYUFBUSxrQ0FBVyxhQUFhO0FBQUEsRUFDcEQ7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixhQUFrQixhQUFRLGtDQUFXLGFBQWE7QUFBQSxFQUNwRDtBQUNGO0FBQ0EsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBQzNDLFFBQU0sT0FDSixJQUFJLGlCQUFpQixTQUFTLE1BQU07QUFDdEMsUUFBTSxPQUFPLFNBQVMsSUFBSSxvQkFBb0I7QUFDOUMsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsUUFDSixTQUFTO0FBQUEsTUFDWCxDQUFDO0FBQUEsTUFDRCxrQkFBa0I7QUFBQSxRQUNoQixNQUFXLGFBQVEsa0NBQVcsSUFBSTtBQUFBLFFBQ2xDLFVBQVUsQ0FBQyxpQkFBaUI7QUFBQSxRQUM1QixZQUFZLENBQUMsT0FBTyxRQUFRLE9BQU8sUUFBUSxPQUFPO0FBQUEsTUFDcEQsQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBLE1BQ1gsY0FBYztBQUFBLElBQ2hCO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsTUFBTTtBQUFBLE1BQ0osU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsWUFBWSxDQUFDLHFCQUFxQjtBQUFBLElBQ3BDO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=

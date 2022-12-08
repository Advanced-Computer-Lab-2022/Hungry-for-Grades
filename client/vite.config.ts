/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />
import * as path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import removeConsole from 'vite-plugin-remove-console';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

export const aliases = [
	{
		find: '@',
		replacement: path.resolve(__dirname, './src')
	},
	{
		find: '@components',
		replacement: path.resolve(__dirname, './src/components')
	},
	{
		find: '@enums',
		replacement: path.resolve(__dirname, './src/enums')
	},
	{
		find: '@store',
		replacement: path.resolve(__dirname, './src/store')
	},
	{
		find: '@interfaces',
		replacement: path.resolve(__dirname, './src/interfaces')
	},
	{
		find: '@pages',
		replacement: path.resolve(__dirname, './src/pages')
	},
	{
		find: '@hooks',
		replacement: path.resolve(__dirname, './src/hooks')
	}
];
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const base =
		env.VITE_APP_ENV !== 'prod' ? '/' : 'https://your_cdn_domain/';
	const PORT = parseInt(env.VITE_APP_CLIENT_PORT);
	return {
		base,
		resolve: {
			alias: aliases
		},
		plugins: [
			react({
				include: '**/*.tsx'
			}),
			viteTsconfigPaths({
				root: path.resolve(__dirname, './'),
				projects: ['./tsconfig.json'],
				extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
			}),
			svgrPlugin(),
			VitePWA({ registerType: 'autoUpdate' }),
			removeConsole()
		],
		server: {
			port: PORT,
			open: true
		},
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: ['./src/setupTests.ts']
		},
		build: {
			outDir: 'build'
		}
	};
});

import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import type { ConfigEnv, PluginOption } from 'vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }: ConfigEnv) => {
	const env = loadEnv(mode, '.', '');
	return {
		server: {
			port: 3000,
			host: '0.0.0.0'
		},
		plugins: [react(), tailwindcss()] as PluginOption[],
		// ВАЖНО: В продакшене API ключи должны использоваться только на backend
		// Здесь оставлено только для разработки/демо
		define: {
			'process.env.API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || ''),
			'process.env.GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || '')
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, '.')
			}
		},
		publicDir: 'public',
		// Настройка для правильной работы роутинга в продакшене
		preview: {
			port: 3000
		}
	};
});

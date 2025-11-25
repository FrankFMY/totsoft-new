import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// Директория для билда (по умолчанию 'build')
			out: 'build',
			// Включить precompression для gzip/brotli
			precompress: true,
			// Переменная окружения для хоста
			envPrefix: ''
		}),
		// CSP для безопасности
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				'script-src': ['self', 'unsafe-inline'],
				'style-src': ['self', 'unsafe-inline', 'https://fonts.googleapis.com'],
				'font-src': ['self', 'https://fonts.gstatic.com'],
				'img-src': ['self', 'data:', 'https:'],
				'connect-src': ['self'],
				'frame-ancestors': ['none']
			}
		}
	}
};

export default config;

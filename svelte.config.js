import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			layout: './src/lib/components/markdown/mdsvx.svelte',
			extensions: ['.svx', '.md']
		})
	],
	kit: {
		adapter: adapter({ fallback: '404.html' }),
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		}
	},
	extensions: ['.svelte', '.svx', '.md']
};

export default config;

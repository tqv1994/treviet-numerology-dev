import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
// import vercel from '@sveltejs/adapter-vercel';
const handleError = ({ status, path, referrer, referenceType }) => {
	// if (path.startsWith('/blog')) throw new Error('Missing a blog page!');
	console.warn(
		`Render error: ${status} ${path}${referrer ? ` (${referenceType} from ${referrer})` : ''
		}`,
	);
};
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({ out: 'build' }),
		prerender: {
			enabled: false,
			onError: handleError,
		},
		vite: {
			server: {
				host: '0.0.0.0'
			}
		}
	}
};

export default config;

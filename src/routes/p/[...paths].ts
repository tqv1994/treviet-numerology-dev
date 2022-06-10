import { apiUrl } from '$lib/env';
import { makeEmptyResponse } from '$lib/utils/fetch';
import type { RequestHandler } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit/types/private';
import * as cookie from 'cookie';
const SAFE_REQUEST_FILTERS = ['accept', 'authorization', 'content-type', 'cookie'];
const SAFE_RESPONSE_FILTERS = ['set-cookie', 'content-type', 'content-length', 'accept'];
const BLOCKED_PATHS = { '': true, undefined: true };
const BLOCKED_PATH_PREFIXES = ['admin', 'graphql'];

/**
 * @type {import('@sveltejs/kit').Post}
 */

export const get: RequestHandler = proxy;
export const post: RequestHandler = proxy;
export const patch: RequestHandler = proxy;
export const put: RequestHandler = proxy;
export const del: RequestHandler = proxy;

async function proxy({ request, params, url }) {
	const cookies = cookie.parse(request.headers.get('cookie') || '');
	if (isBlocked(params.paths)) {
		return new Response('', { status: 404 });
	}
	try {
	request.headers.delete('host');
		if(!request.headers.get('authorization')){
			request.headers.append('Authorization', `Bearer ${cookies['token']}`);
		}
		request.headers.append('Accept', 'application/vnd.api+json');
		request.headers.append('Content-Type', 'application/vnd.api+json');
		console.log(`${apiUrl}/${params.paths}${url.search}`);
		const req = new Request(`${apiUrl}/${params.paths}${url.search}`, request);
		// console.debug('Req headers', req.headers);
		const res = await fetch(req);
		const body = await res.text();
		res.headers.forEach((_, key) => {
			if (!SAFE_RESPONSE_FILTERS.includes(key)) {
				res.headers.delete(key);
			}
		});
		// console.log('res.headers', res.headers);
		return new Response(body, {
			status: res.status,
			statusText: res.statusText
		});
	} catch (error) {
		console.error('Error getting trip', error);
	}
	return makeEmptyResponse(500);
}

function isBlocked(path: string): boolean {
	if (BLOCKED_PATHS[path]) {
		return true;
	}
	for (const p of BLOCKED_PATH_PREFIXES) {
		if (path.startsWith(p)) {
			return true;
		}
	}
	return false;
}

async function pp({ request, params, locals }: RequestEvent): Promise<Response> {
	// console.log('params.path', params.path, isBlocked(params.path));
	if (isBlocked(params.path)) {
		return new Response('', { status: 404 });
	}
	try {
		console.log('Proxy is getting', request.method, `${apiUrl}/${params.path}`);
		const requestHeaders = filterRequestHeaders(request.headers);
		// const requestHeaders = {
		//   'Authorization': request.headers.get('Authorization')
		// };

		console.log('outgoing headers', requestHeaders);

		// const out = {
		// 	headers,
		// 	method: request.method,
		// };
		const requestBody = await request.text();
		// if (requestBody) {
		// 	out.body = requestBody;
		// }

		const res = await fetch(`${apiUrl}/${params.paths}`, {
			headers: requestHeaders,
			method: request.method,
			body: requestBody || undefined
		});
		const body = await res.text();
		console.log(res.headers);
		res.headers.forEach((_, key) => {
			if (key.startsWith('x-')) {
				res.headers.delete(key);
			}
		});
		console.debug(res.headers);
		if (res.status === 401) {
			locals.user = undefined;
			res.headers.set('set-cookie', 'token=x; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
		}
		// console.debug('in proxy', res.headers);
		return new Response(body, {
			headers: {
				'set-cookie': res.headers.get('set-cookie')
			},
			status: res.status,
			statusText: res.statusText
		});
	} catch (error) {
		console.error('Error in proxy call', error);
		return new Response(
			JSON.stringify({
				code: 'server/unknown-error',
				message: 'An unknown error occured'
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}
}

function filterRequestHeaders(headers: Headers): Headers {
	const h = new Headers();
	for (const n of SAFE_REQUEST_FILTERS) {
		if (headers.has(n)) {
			h.set(n, headers.get(n));
			// h.set(n, headers[n]);
		}
	}
	return h;
}

function filterResponseHeaders(headers: Headers): Record<string, string> {
	const h = {};
	for (const n of SAFE_RESPONSE_FILTERS) {
		if (headers.has(n)) {
			h[n] = headers.get(n);
		}
	}
	console.log(h);
	return h;
}

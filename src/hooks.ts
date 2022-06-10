import { apiUrl } from '$lib/env';
import { authStore, type User } from '$lib/stores/auth';
import { makeEmptyResponse } from '$lib/utils/fetch';
import { ResponseHeaders } from '$lib/utils/response';
import { v4 as uuid } from '@lukeed/uuid';
import type { GetSession, Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {
	const { locals } = event;
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	if (cookies['token']) {
		try {
			const res = await fetch(`${apiUrl}/users/profile`, {
				headers: { ...ResponseHeaders, Authorization: `Bearer ${cookies['token']}` }
			});
			if (res.ok) {
				const dataUser: { results: User } = await res.json();
				authStore.set(dataUser.results);
				locals.user = dataUser.results;
			} else if (res.status === 401) {
				authStore.set(undefined);
				return new Response(await res.text(), {
					status: res.status,
					headers: {
						'set-cookie':
							'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT, session.sig=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly'
					}
				});
			} else {
				console.log(await res.json());
			}
		} catch (err) {
			console.error('Error fetching profile', err);
		}
	}

	try {
		const response = await resolve(event);
		return response;
	} catch (err) {
		return makeEmptyResponse(500);
	}

	// if (!cookies['userid']) {
	// 	// if this is the first time the user has visited this app,
	// 	// set a cookie so that we recognise them when they return
	// 	response.headers.set(
	// 		'set-cookie',
	// 		cookie.serialize('userid', event.locals.userid, {
	// 			path: '/',
	// 			httpOnly: true
	// 		})
	// 	);
	// }
};

export const getSession: GetSession = async (event) => {
	return {
		...event.locals
	};
};

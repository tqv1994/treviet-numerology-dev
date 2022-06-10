import type { Token, User } from "$lib/stores/auth";
import type { RequestHandler } from "@sveltejs/kit";

export const post: RequestHandler = async({ request, locals }) => {
	const body: Token & {user:User} =  await request.json();
	if (!body?.access_token) {
		return {
			status: 401,
			body: { error: 'token không hợp lệ' }
		};
	}
	if(body.user){
		locals.user = body.user;
	}
	return {
		headers: {
			'set-cookie': `token=${body.access_token}; path=/; max-age=${body.expires_in}`
		},
	};
}

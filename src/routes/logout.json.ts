import type { Token, User } from "$lib/stores/auth";
import type { RequestHandler } from "@sveltejs/kit";

export const post: RequestHandler = async({ request, locals }) => {
	return {
        status: 200,
		headers: {
			'set-cookie': 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT, session.sig=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;'
		},
	};
}

import { goto } from '$app/navigation';

export const redirect = (url: string, delay = 0) => {
	setTimeout(() => {
		goto(url);
	}, delay);
};

import { backendUrl, frontendUrl } from '$lib/env';
import type { Agent } from '$lib/stores/agent';
import type { User } from '$lib/stores/auth';

export function logout() {
	localStorage.removeItem('token');
	localStorage.removeItem('user');
}

export function getFullName(user?: User): string {
	if (user) {
		if (user.user_detail) {
			if (user.user_detail.first_name || user.user_detail.last_name) {
				return `${user.user_detail.first_name || ''} ${user.user_detail.last_name}`;
			}
		}
		if (user.name) {
			return user.name;
		}
	}
	return '';
}

export function getAge(user?: User): string {
	const date = new Date();
	if (user) {
		if (user.user_detail?.dob) {
			const dob = new Date(user.user_detail.dob);
			return (date.getFullYear() - dob.getFullYear()).toString();
		}
	}
	return '';
}

export function getAvatar(user?: User): string | null {
	if (user) {
		if (user.user_detail?.avatar_url) {
			let avatar = user.user_detail?.avatar_url;
			if (avatar.includes('/uploads/') === false) {
				avatar = `${backendUrl}/uploads/${user.user_detail?.avatar_url}`;
			} else {
				avatar = `${backendUrl}${user.user_detail?.avatar_url}`;
			}
			return avatar;
		}
	}
	return null;
}

export function getReferralLink(user?: User): string | undefined {
	if (user) {
		if (Array.isArray(user.create_links) && user.create_links.length > 0) {
			return `${frontendUrl}/auth/register?token=${user.id}-${
				user.create_links[user.create_links.length - 1].token
			}`;
		}
	}
	return undefined;
}

export function getMyAgent(user?: User): Agent | undefined {
	if (user) {
		if (user.agents && user.agents.length > 0) {
			return user.agents[0];
		}
	}
	return undefined;
}

export function checkRole(name: string, user?: User): boolean {
	if (user && user.roles) {
		return (user.roles || []).reduce((acc: boolean, role) => {
			if (acc) {
				return acc;
			}
			if (role.name === name) {
				acc = true;
			}
			return acc;
		}, false);
	}
	return false;
}

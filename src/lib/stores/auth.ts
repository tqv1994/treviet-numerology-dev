import { writable } from 'svelte/store';
import type { Agent } from './agent';
import type { Identifiable, Timeable } from './type';
export type User = Identifiable &
	Timeable & {
		name?: string;
		email?: string;
		email_verified_at?: string;
		status: number;
		role_id: number;
		user_detail?: UserDetail;
		agents?: Agent[];
		create_links?: ReferralLink[];
		roles: Role[];
		google2fa_secret?: string;
		imageQR?: string;
	};
export type UserDetailBase = {
	first_name?: string;
	last_name?: string;
	dob?: string;
	avatar_url?: string;
	phone?: string;
	post_code?: string;
	city_name?: string;
	province_name?: string;
	address?: string;
	age?: number;
	target?: string;
	user_id?: number;
	sex?: "Nam" | "Nữ" | "Giới tính khác";
}

export type UserDetail = Identifiable & UserDetailBase;

export type Token = {
	token_type: string;
	expires_in: number;
	access_token: string;
	refresh_token: string;
};

export type ReferralLink = Identifiable & Timeable & {
	user_id?: number;
	user_id_invited?: number;
	token: string;
	status: number;
};

export const authStore = writable<User | undefined>();
export const tokenStore = writable<string | undefined>();

export type Role = Identifiable & {
	name: string;
}
<script lang="ts" context="module">
	export type RegisterForm = {
		name: string;
		full_name: string;
		email: string;
		password: string;
		password_confirmation: string;
		token: string;
		phone: string;
	};
	export const load: Load = async ({ fetch, session, url }) => {
		const tokenRequest = url.searchParams.get('token') || null;
		const tokenArr = (tokenRequest || '').split('-');
		let usernameOfAgent: string;
		if (!tokenRequest) {
			return {
				status: 302,
				redirect: '/auth/login'
			};
		}
		const userId = tokenArr[0];
		const token = tokenArr[1] ? tokenArr[1] : '';
		const res = await fetch(`/p/users/register-link/${token}/${userId}`);
		if (res.ok) {
			const user: { results: User } = await res.json();
			usernameOfAgent = user.results.name || '';
		} else {
			return {
				status: 302,
				redirect: '/auth/login'
			};
		}
		return {
			props: {
				token,
				usernameOfAgent
			}
		};
	};
</script>

<script lang="ts">
	import BaseButton from '$lib/components/BaseButton.svelte';
	import BaseInput from '$lib/components/Inputs/BaseInput.svelte';
	import BaseCheckbox from '$lib/components/Inputs/BaseCheckbox.svelte';
	import { redirect } from '$lib/utils/redirect';
	import Auth from '$lib/components/ABS/Layout/Auth.svelte';
	import type { Load } from '@sveltejs/kit';
	import { getPasswordStrengthLabel, getPasswordStrengthType } from '$lib/utils/validations';
	import { ppost } from '$lib/utils/fetch';
	import { getErrorMessage } from '$lib/utils/response';
	import type { User } from '$lib/stores/auth';
	import * as yup from 'yup';
	import { getMsgRequired } from '$lib/utils/message';
	export let token: string;
	export let usernameOfAgent: string;
	let errors: any = {};
	const schemaValidator = yup.object().shape({
		name: yup
			.string()
			.typeError(getMsgRequired('Tên tài khoản'))
			.required(getMsgRequired('Tên tài khoản')),
		email: yup.string().typeError(getMsgRequired('Email')).required(getMsgRequired('Email')),
		password: yup
			.string()
			.typeError(getMsgRequired('Mật khẩu'))
			.required(getMsgRequired('Mật khẩu')),
		password_confirmation: yup
			.string()
			.typeError(getMsgRequired('Mật khẩu xác nhận'))
			.required(getMsgRequired('Mật khẩu xác nhận'))
			.oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không trùng khớp'),
		phone: yup
			.string()
			.typeError(getMsgRequired('Số điện thoại'))
			.required(getMsgRequired('Số điện thoại')),
		full_name: yup.string().typeError(getMsgRequired('Họ tên')).required(getMsgRequired('Họ tên'))
	});
	let formData: RegisterForm = {
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
		token: '',
		phone: '',
		full_name: ''
	};
	reset();
	function reset() {
		formData = {
			name: '',
			email: '',
			password: '',
			password_confirmation: '',
			token,
			phone: '',
			full_name: ''
		};
	}
	const handleSubmit = async () => {
		window.openLoading();
		errors = {};
		try {
			await schemaValidator.validate({ ...formData }, { abortEarly: false });
			const res = await ppost('users/register', formData);
			if (!res.ok) {
				const error = await res.json();
				throw getErrorMessage(error.errors);
			}
			window.notice({
				text: 'Đăng ký tài khoản thành công',
				type: 'success'
			});
			redirect('/auth/login');
		} catch (err) {
			if (err.inner) {
				errors = err.inner.reduce((acc, err) => {
					return { ...acc, [err.path]: err.message };
				}, {});
			} else {
				window.notice({
					text: 'Có lỗi xảy ra! Vui lòng thử lại sau',
					type: 'danger'
				});
			}
		}
		window.closeLoading();
	};
</script>

<Auth title="Đăng ký tài khoản" subTitle="Đăng ký">
	<form role="form" on:submit|preventDefault={handleSubmit} slot="content">
		<BaseInput
			alternative
			class="mb-3"
			prependIcon="ni ni-circle-08"
			placeholder="Người giới thiệu (username)"
			name="name_introduce"
			value={usernameOfAgent}
			disabled
		/>
		<BaseInput
			alternative
			class="mb-3"
			prependIcon="ni ni-circle-08"
			placeholder="Tên tài khoản*"
			name="name"
			error={errors.name || ''}
			bind:value={formData.name}
		/>

		<BaseInput
			alternative
			class="mb-3"
			prependIcon="ni ni-circle-08"
			placeholder="Họ và tên*"
			name="fullname"
			error={errors.full_name}
			bind:value={formData.full_name}
		/>

		<BaseInput
			alternative
			class="mb-3"
			prependIcon="ni ni-circle-08"
			placeholder="Số điện thoại*"
			name="phone_number"
			error={errors.phone}
			bind:value={formData.phone}
		/>

		<BaseInput
			alternative
			class="mb-3"
			prependIcon="ni ni-email-83"
			placeholder="Nhập email*"
			name="Email"
			error={errors.email}
			bind:value={formData.email}
		/>
		<div>
			<BaseInput
				alternative
				class="mb-3"
				prependIcon="ni ni-lock-circle-open"
				placeholder="Mật khẩu*"
				type="password"
				name="password"
				error={errors.password}
				bind:value={formData.password}
			/>
			<div class="password-strength">
				<div class="text-muted font-italic">
					<small>
						Độ mạnh mật khẩu:
						<span class="text-{getPasswordStrengthType(formData.password)} font-weight-700"
							>{getPasswordStrengthLabel(formData.password)}</span
						>
					</small>
				</div>
			</div>
		</div>

		<div>
			<BaseInput
				alternative
				class="mb-3"
				prependIcon="ni ni-lock-circle-open"
				placeholder="Mật khẩu xác nhận*"
				type="password"
				error={errors.password_confirmation}
				bind:value={formData.password_confirmation}
			/>
			<div class="password-strength">
				<div class="text-muted font-italic">
					<small>
						Độ mạnh mật khẩu:
						<span
							class="text-{getPasswordStrengthType(formData.password_confirmation)} font-weight-700"
							>{getPasswordStrengthLabel(formData.password_confirmation)}</span
						>
					</small>
				</div>
			</div>
		</div>

		<BaseCheckbox model="agree">
			<span class="text-muted"> Tôi không phải là robot </span>
		</BaseCheckbox>

		<div class="text-center">
			<BaseButton
				type="primary"
				nativeType="submit"
				className="mt-4"
				on:click={(e) => e.preventDefault()}
			>
				Tạo tài khoản mới
			</BaseButton>
		</div>
	</form>
</Auth>

<style>
	.password-strength {
		float: right;
		margin-top: -26px;
		padding-bottom: 15px;
	}

	#verify {
		min-height: 2.5rem;
	}
</style>

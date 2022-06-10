<script lang="ts" context="module">
	export type ResetPassword = {
		password: string;
		password_confirm: string;
		token: string;
		email: string;
	};
	export const load: Load = ({ fetch, session, url }) => {
		const resetPasswordToken = url.searchParams.get('token');
		const email = url.searchParams.get('email');
		if (!resetPasswordToken) {
			return {
				status: 302,
				redirect: '/auth/login'
			};
		}
		return {
			props: {
				resetPasswordToken,
				email
			}
		};
	};
</script>

<script lang="ts">
	import BaseButton from '$lib/components/BaseButton.svelte';
	import BaseInput from '$lib/components/Inputs/BaseInput.svelte';
	import BaseCheckbox from '$lib/components/Inputs/BaseCheckbox.svelte';
	import Auth from '$lib/components/ABS/Layout/Auth.svelte';
	import { redirect } from '$lib/utils/redirect';
	import type { Load } from '@sveltejs/kit';
	import { ppost } from '$lib/utils/fetch';
	import { getErrorMessage } from '$lib/utils/response';
	import { getPasswordStrengthLabel, getPasswordStrengthType } from '$lib/utils/validations';
	export let resetPasswordToken: string;
	export let email: string;
	let formData: ResetPassword = {
		password: '',
		password_confirm: '',
		email: email,
		token: resetPasswordToken
	};
	reset();
	function reset() {
		formData = {
			password: '',
			password_confirm: '',
			email: email,
			token: resetPasswordToken
		};
	}
	const handleSubmit = async () => {
		window.openLoading();
		try {
			const res = await ppost('password-reset', {
				data: { type: 'password-reset', attributes: formData }
			});
			if (!res.ok) {
				const error = await res.json();
				throw getErrorMessage(error.errors);
			}
			window.notice({
				text: 'Đặt lại mật khẩu thành công',
				type: 'success'
			});
			redirect('/auth/login', 1000);
		} catch (err) {
			window.notice({
				text: err,
				type: 'danger'
			});
		}
		window.closeLoading();
	};
</script>

<Auth title="Đặt lại mật khẩu" subTitle="Đặt lại mật khẩu cho tài khoản của bạn">
	<form role="form" slot="content" on:submit|preventDefault={handleSubmit}>
		<BaseInput
			alternative
			class="mb-3"
			prependIcon="ni ni-lock-circle-open"
			placeholder="Mật khẩu"
			type="password"
			required
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

		<BaseInput
			alternative
			class="mb-3"
			prependIcon="ni ni-lock-circle-open"
			placeholder="Nhập lại mật khẩu"
			type="password"
			required
			bind:value={formData.password_confirm}
		/>
		<div class="password-strength">
			<div class="text-muted font-italic">
				<small>
					Độ mạnh mật khẩu:
					<span class="text-{getPasswordStrengthType(formData.password_confirm)} font-weight-700"
						>{getPasswordStrengthLabel(formData.password_confirm)}</span
					>
				</small>
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
				Đặt lại mật khẩu
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
</style>

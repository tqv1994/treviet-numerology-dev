<script lang="ts" context="module">
	export type ForgotPasswordForm = {
		email: string;
		redirect_url: string;
	};
</script>

<script lang="ts">
	import Auth from '$lib/components/ABS/Layout/Auth.svelte';
	import BaseButton from '$lib/components/BaseButton.svelte';
	import BaseInput from '$lib/components/Inputs/BaseInput.svelte';
	import { frontendUrl } from '$lib/env';
	import { TIME_RESEND_EMAIL_FORGOT_PW } from '$lib/utils/const';
	import { ppost } from '$lib/utils/fetch';
	import { getErrorMessage } from '$lib/utils/response';
	let formData: ForgotPasswordForm = {
		email: '',
		redirect_url: ''
	};
	let count = TIME_RESEND_EMAIL_FORGOT_PW;
	let countDownStart = false;
	const countDown = () => {
		if (count > 0 && countDownStart) {
			count--;
			setTimeout(countDown, 1000);
		} else {
			countDownStart = false;
			count = TIME_RESEND_EMAIL_FORGOT_PW;
		}
	};
	reset();
	function reset() {
		formData = {
			email: '',
			redirect_url: `${frontendUrl}/reset-password`
		};
	}
	const handleSubmit = async () => {
		window.openLoading();
		try {
			const res = await ppost('password-forgot', {
				data: { type: 'password-forgot', attributes: formData }
			});
			if (!res.ok) {
				const error = await res.json();
				throw getErrorMessage(error.errors);
			}
			window.notice({
				text: 'Link quên mật khẩu đã được gửi tới email của bạn. Nếu không nhận được email, vui lòng kiểm tra trong hòm thư rác',
				type: 'success'
			});
			countDownStart = true;
			countDown();
		} catch (err) {
			console.log(err);
			window.notice({
				text: err,
				type: 'danger'
			});
		}
		window.closeLoading();
	};
</script>

<Auth
	title="Quên mật khẩu"
	subTitle="Nhập địa chỉ email hoặc tên tài khoản
    để khôi phục tài khoản của bạn"
>
	<form role="form" slot="content" on:submit|preventDefault={handleSubmit}>
		<BaseInput
			alternative
			class="mb-3"
			name="Email"
			prependIcon="ni ni-email-83"
			placeholder="Email hoặc Username"
			required
			bind:value={formData.email}
		/>

		<div class="text-center">
			{#if !countDownStart}
				<BaseButton type="primary" nativeType="submit" className="mt-4">
					Lấy lại mật khẩu
				</BaseButton>
			{:else}
				<BaseButton type="default" disabled nativeType="submit" className="mt-4">
					{count}
				</BaseButton>
			{/if}
		</div>
	</form>
</Auth>

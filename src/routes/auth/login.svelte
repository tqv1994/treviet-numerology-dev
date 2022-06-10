<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import BaseButton from '$lib/components/BaseButton.svelte';
	import BaseInput from '$lib/components/Inputs/BaseInput.svelte';
	import BaseCheckbox from '$lib/components/Inputs/BaseCheckbox.svelte';
	import type { LoginForm } from '$lib/services/auth.service';
	import { authStore, type Token, type User } from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import Auth from '$lib/components/ABS/Layout/Auth.svelte';
	import { pauth, ppost } from '$lib/utils/fetch';
	import { redirect } from '$lib/components/redirect.svelte';
	import { appName } from '$lib/env';
	import { getErrorMessage } from '$lib/utils/response';
	let formData: LoginForm = {
		email: '',
		password: ''
	};
	reset();
	function reset() {
		formData = {
			email: '',
			password: ''
		};
	}
	const handleSubmit = async () => {
		window.openLoading();
		try {
			const res = await ppost('login', {
				...formData
			});
			if (!res.ok) {
				const error = await res.json();
				throw getErrorMessage(error.errors);
			}
			const token: Token = await res.json();
			const resUser = await pauth(token.access_token);
			if (!resUser.ok) {
				const error = await resUser.json();
				throw getErrorMessage(error.errors);
			}
			const user: { results: User } = await resUser.json();
			authStore.set(user.results);
			await fetch('/auth.json', {
				method: 'POST',
				body: JSON.stringify({ ...token, user: user.results }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			window.notice({
				text: 'Đăng nhập thành công',
				type: 'success'
			});
			window.location.href = '/';
			// redirect('/');
		} catch (err) {
			window.notice({
				text: err,
				type: 'danger'
			});
		}
		window.closeLoading();
	};
</script>

<svelte:head>
	<title>{appName || ''} - Đăng nhập</title>
</svelte:head>
<Auth title="Xin chào !" subTitle="Đăng nhập tài khoản">
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
		<BaseInput
			alternative
			class="mb-3"
			name="Password"
			prependIcon="ni ni-lock-circle-open"
			type="password"
			placeholder="Mật khẩu"
			required
			bind:value={formData.password}
		/>

		<BaseCheckbox model="agree">
			<span class="text-muted"> Tôi không phải là robot </span>
		</BaseCheckbox>

		<BaseCheckbox model="rememberMe">Nhớ mật khẩu</BaseCheckbox>
		<div class="text-center">
			<BaseButton type="primary" nativeType="submit" className="my-4">Đăng nhập</BaseButton>
		</div>
		<div class="d-flex" style="text-align:  center;">
			<p>
				Nếu bạn chưa có tài khoản, vui lòng liên hệ người giới thiệu hoặc nhắn tin với chúng tôi để
				được hỗ trợ
			</p>
		</div>
	</form>
	<div slot="footer">
		<div class="row mt-3">
			<div class="col-6">
				<a href="/lost-password" class="text-light">
					<small>Quên mật khẩu</small>
				</a>
			</div>
			<div class="col-6 text-right" />
		</div>
	</div>
</Auth>

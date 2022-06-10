<script lang="ts" context="module">
	export const load: Load = async ({ session, fetch }) => {
		const user: User = session.user;
		if (user) {
			if (user.google2fa_secret) {
				const res = await fetch('/p/get-qr-image', {
					method: 'POST',
					body: JSON.stringify({ email: user.email || '', key: user.google2fa_secret })
				});
				if (res.ok) {
					const data = await res.json();
					const imageQR = data['QR-image'];
          session.user.imageQR = imageQR;
          authStore.update(s=>{
            if(s){
              s.imageQR = imageQR;
            }
            return s;
          });
				}
			}
		}
		return {};
	};
</script>

<script lang="ts">
	import UserCardAgent from '$lib/components/ABS/Global/Profile/UserCardAgent.svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Update from '$lib/components/ABS/Global/Profile/Update.svelte';
	import type { Load } from '@sveltejs/kit';
	import { authStore, type User } from '$lib/stores/auth';
	onMount(function () {
	});
</script>

<div transition:fade={{ duration: 250 }}>
	<div class="header pb-6 d-flex align-items-center profile-header" style="min-height: 300px;">
		<span class="mask bg-gradient-green opacity-8" />
	</div>

	<div class="container-fluid mt--6">
		<div class="row">
			<div class="col-xl-4 order-xl-1">
				<UserCardAgent />

				<!-- Progress track -->
			</div>
			<div class="col-xl-8 order-xl-2">
				<Update />
			</div>
		</div>
	</div>
</div>

<style>
	.profile-header {
		background-image: url(/img/theme/profile-cover.jpg);
		background-size: cover;
		background-position: center top;
		min-height: 500px;
	}

	.bg-gradient-green {
		background: linear-gradient(87deg, #2dce89, #2dcecc);
	}
</style>

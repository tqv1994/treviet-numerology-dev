<script context="module" lang="ts">
	import { redirect } from '$lib/components/redirect.svelte';
	import { appName, appDescription } from '$lib/env';
import { checkRole } from '$lib/utils/user';
	import type { Load } from '@sveltejs/kit';

	export const prerender = true;
	export const load: Load = ({ fetch, session, url }) => {
		if (!session.user) {
			return redirect('/auth/login');
		} else {
			if(checkRole('admin',session.user)){
				return redirect('/admin');	
			}
			return redirect('/agent');
		}
		return {};
	};
</script>

<!-- svelte-ignore missing-declaration -->
<script lang="ts">
</script>

<section />

<style></style>

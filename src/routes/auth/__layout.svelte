<script lang="ts" context="module">
	import { redirect } from '$lib/components/redirect.svelte';

	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, session, url }) => {
		if (session.user) {
			return redirect('/');
		}
		return {};
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		document.body.classList = 'bg-default';
	});
</script>

<slot />

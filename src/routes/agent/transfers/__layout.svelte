<script lang="ts" context="module">
import { packagesStore } from '$lib/stores/package';

	import type { Load } from '@sveltejs/kit';

	export const load: Load = async({fetch}) => {
        const res = await fetch('/p/packages?perPage=999');
        if(res.ok){
            const data = await res.json();
            packagesStore.set(data.results.data);
        }
		return {};
	};
</script>

<slot />

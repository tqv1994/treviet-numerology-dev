<script lang="ts" context="module">
import { authStore } from '$lib/stores/auth';

	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({fetch, session, url}) => {
        if(session.user){
            authStore.set(session.user);
        }
        return {

        }
    };
</script>

<slot />

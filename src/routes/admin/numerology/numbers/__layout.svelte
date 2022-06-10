<script lang="ts" context="module">
import { categoriesStore, type Category } from '$lib/stores/numerology';

import type { DataWithPagination } from '$lib/stores/type';

import { objectToQueryString } from '$lib/utils/string';

	import type { Load } from '@sveltejs/kit';

	export const load: Load = async({fetch}) => {
        const res = await fetch(`/p/categories/filter?${objectToQueryString({perPage: 999})}`);
        if(res.ok){
            const data: {results: DataWithPagination<Category>} = await res.json();
            categoriesStore.set(data.results?.data || []);
        }
        return {};
    };
</script>

<slot />

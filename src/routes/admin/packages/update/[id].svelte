<script lang="ts" context="module">
	export const load: Load = async ({ fetch, session, params: { id } }) => {
		const res = await fetch(`/p/packages?id=${id}`);
		
		if (res.ok) {
			const data: { results: DataWithPagination<Package> } = await res.json();
			console.log(data);
			
			if ((data.results.data || []).length > 0) {
				return {
					props: {
						Package: (data.results.data || [])[0],
						id
					}
				};
			}
		}
		return {
			status: 302,
			redirect: '/admin/packages'
		};
	};
</script>

<script lang="ts">
	import type { Package, PackageFormData } from '$lib/stores/package';
	import type { DataWithPagination } from '$lib/stores/type';
	import type { Load } from '@sveltejs/kit';
	import { pput } from '$lib/utils/fetch';
	import { onMount } from 'svelte';
	import Form from '../form.svelte';
import { redirect, redirectAdmin } from '$lib/components/redirect.svelte';

	export let Package: Package;
	export let id: number;

	let formData: PackageFormData = Package;
	
	onMount(async () => {});

	async function onSubmit(event: CustomEvent<FormData>) {
		console.log(id);
		
		window.openLoading();
		console.log(formData);
		
		const res = await pput(`packages/${id}`, formData);
		console.log(res);
		
		if (res.ok) {
			const data = await res.json();
			Package = data.results;
			formData = Package;
			window.notice({
				text: 'Cập nhật gói thành công',
				type: 'success'
			});
		} else {
			const error = await res.json();
			window.notice({
				text: error.errors,
				type: 'danger'
			});
		}

		window.closeLoading();
		redirectAdmin('/packages')
	}
</script>

<Form title="Cập nhật gói {formData.package_name || ''}" {formData} on:submit={onSubmit} />

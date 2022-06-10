<script lang="ts" context="module">
	export const load: Load = async ({ fetch, session, params: { id } }) => {
		const res = await fetch(`/p/categories/?id=${id}`);
		if (res.ok) {
			const data: { results: DataWithPagination<Category> } = await res.json();
			if ((data.results.data || []).length > 0) {
				return {
					props: {
						category: (data.results.data || [])[0],
						id
					}
				};
			}
		}
		return {
			status: 302,
			redirect: '/admin/numerology/categories'
		};
	};
</script>

<script lang="ts">
	import type { Category, CategoryFormData } from '$lib/stores/numerology';
	import { STATUS, type DataWithPagination } from '$lib/stores/type';
	import { pput, pputWithFile } from '$lib/utils/fetch';
	import type { Load } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import Form from '../form.svelte';
	let formData: CategoryFormData;
	export let category: Category;
	export let id: number;
	reset();
	function reset() {
		if (category) {
			formData = category;
		} else {
			formData = {
				cat_name: '',
				description: '',
				photo: '',
				x_order: 0,
				status: STATUS.ACTIVE
			};
		}
	}

	onMount(async () => {});

	async function onSubmit(event: CustomEvent<FormData>) {
		window.openLoading();
		const res = await pputWithFile(`categories/${id}`, event.detail);
		if (res.ok) {
			const data = await res.json();
			category = data.results;
			formData = category;
			window.notice({
				text: 'Cập nhật danh mục thành công',
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
	}
</script>

<Form title="Cập nhật nhóm {formData.cat_name || ''}" {formData} on:submit={onSubmit} />

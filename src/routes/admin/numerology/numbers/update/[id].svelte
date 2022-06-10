<script lang="ts" context="module">
	export const load: Load = async ({ fetch, session, params: { id } }) => {
		const res = await fetch(`/p/category-numbers/?id=${id}`);
		if (res.ok) {
			const data: { results: DataWithPagination<CategoryNumber> } = await res.json();
			if ((data.results.data || []).length > 0) {
				return {
					props: {
						number: (data.results.data || [])[0],
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
	import type { Category, CategoryFormData, CategoryNumber, CategoryNumberFormData } from '$lib/stores/numerology';
	import { STATUS, type DataWithPagination } from '$lib/stores/type';
	import { pput, pputWithFile } from '$lib/utils/fetch';
	import type { Load } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import Form from '../form.svelte';
	let formData: CategoryNumberFormData;
	export let number: CategoryNumber;
	export let id: number;
	reset();
	function reset() {
		if (number) {
			formData = number;
		} else {
			formData = {
				name: '',
				description: '',
				photo_link: '',
				number: 0,
				x_order: 0,
				status: STATUS.ACTIVE
			};
		}
	}

	onMount(async () => {});

	async function onSubmit(event: CustomEvent<FormData>) {
		window.openLoading();
		const res = await pputWithFile(`category-numbers/${id}`, event.detail);
		if (res.ok) {
			const data = await res.json();
			number = data.results;
			formData = number;
			window.notice({
				text: 'Cập nhật con số thành công',
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

<Form title="Cập nhật con số {formData.name || ''}" {formData} on:submit={onSubmit} />

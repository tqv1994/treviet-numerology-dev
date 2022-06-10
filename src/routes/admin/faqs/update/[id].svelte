<script lang="ts" context="module">
	export const load: Load = async ({ fetch, session, params: { id } }) => {
		const res = await fetch(`/p/faqs?id=${id}`);
		
		if (res.ok) {
			const data: { results: DataWithPagination<Faq> } = await res.json();
			console.log(data);
			
			if ((data.results.data || []).length > 0) {
				return {
					props: {
						Faq: (data.results.data || [])[0],
						id
					}
				};
			}
		}
		return {
			status: 302,
			redirect: '/admin/faqs'
		};
	};
</script>

<script lang="ts">
	import type { Faq, FaqsFormData } from '$lib/stores/faq';
	import type { DataWithPagination } from '$lib/stores/type';
	import type { Load } from '@sveltejs/kit';
	import { pput } from '$lib/utils/fetch';
	import { onMount } from 'svelte';
	import Form from '../form.svelte';
	import { redirect, redirectAdmin } from '$lib/components/redirect.svelte';

	export let Faq: Faq;
	export let id: number;

	let formData: FaqsFormData = Faq;
	
	onMount(async () => {});

	async function onSubmit(event: CustomEvent<FormData>) {
		console.log(id);
		
		window.openLoading();
		console.log(formData);
		
		const res = await pput(`faqs/${id}`, formData);
		console.log(res);
		
		if (res.ok) {
			const data = await res.json();
			Faq = data.results;
			formData = Faq;
			window.notice({
				text: 'Cập nhật Faqs thành công',
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
		redirectAdmin('/faqs')
	}
</script>

<Form title="Cập nhật FAQS" {formData} on:submit={onSubmit} />

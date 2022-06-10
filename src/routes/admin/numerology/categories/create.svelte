<script lang="ts">
	import type { CategoryFormData } from '$lib/stores/numerology';
	import { STATUS } from '$lib/stores/type';
	import { ppost, ppostWithFile } from '$lib/utils/fetch';
	import { getErrorMessage } from '$lib/utils/response';
    import Form  from './form.svelte';
	let formData: CategoryFormData;
	reset();
	function reset() {
		formData = {
			cat_name: '',
			description: '',
			photo: '',
			x_order: 0,
			status: STATUS.ACTIVE
		};
	}

	async function onSubmit(event: CustomEvent<FormData>) {
		window.openLoading();
		try {
			const res = await ppostWithFile('categories', event.detail);
			if (res.ok) {
				const data = await res.json();
				formData = data.results;
				window.notice({
					text: 'Tạo danh mục thành công',
					type: 'success'
				});
			} else {
				const error = await res.json();
				window.notice({
					text: getErrorMessage(error.errors),
					type: 'danger'
				});
			}
		} catch (err) {
			window.notice({
				text: err,
				type: 'danger'
			});
		}
		window.closeLoading();
	}
</script>

<Form title="Tạo nhóm" {formData} on:submit={onSubmit} />

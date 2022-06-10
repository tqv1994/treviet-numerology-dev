<script lang="ts">
	import type { FaqsFormData } from '$lib/stores/faq';
	import { STATUS } from '$lib/stores/type';
	import { ppost, ppostWithFile } from '$lib/utils/fetch';
	import { getErrorMessage } from '$lib/utils/response';
    import Form  from './form.svelte';
	let formData: FaqsFormData;
	reset();
	function reset() {
		formData = {
			question: '',
			answer: '',
			
		};
	}

	async function onSubmit(event: CustomEvent<FormData>) {
		window.openLoading();
		try {
			const res = await ppostWithFile('faqs', event.detail);
			if (res.ok) {
				const data = await res.json();
				formData = data.results;
				window.notice({
					text: 'Tạo FAQs thành công',
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

<Form title="Tạo FAQs" {formData} on:submit={onSubmit} />

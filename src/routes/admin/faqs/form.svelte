<script lang="ts">
	import BaseHeader from '$lib/components/BaseHeader.svelte';
	import Card from '$lib/components/Cards/Card.svelte';
	import BaseInput from '$lib/components/Inputs/BaseInput.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import 'flatpickr/dist/flatpickr.css';
	import 'flatpickr/dist/themes/light.css';
	import { createEventDispatcher } from 'svelte';
	import * as yup from 'yup';
	import { getMsgRequired } from '$lib/utils/message';
    import type { FaqsFormData } from '$lib/stores/faq';

	export let formData: FaqsFormData;
	export let title: string;

	let errors: any = {};
	const dispatch = createEventDispatcher();
	const schemaValidator = yup.object().shape({
		question: yup.string().typeError(getMsgRequired('Tên câu hỏi')).required(getMsgRequired('Tên câu hỏi')),
	});
	onMount(async () => {});

	async function onSubmit() {
        console.log('submit');
        
		errors = {};
		try {
			await schemaValidator.validate({ ...formData }, { abortEarly: false });
			const formDataInput = new FormData();

			for (const key in formData) {
				formDataInput.append(key, formData[key]);
			}
			dispatch('submit', formDataInput);
		} catch (err) {
			if (err.inner) {
				errors = err.inner.reduce((acc, err) => {
					return { ...acc, [err.path]: err.message };
				}, {});
			}
		}
	}
</script>

<div transition:fade={{ duration: 250 }}>
	<BaseHeader className="pb-6">
		<div class="row align-items-center py-4">
			<div class="col-lg-6 col-7">
				<h6 class="h2 d-inline-block mb-0">{title}</h6>
				<nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
					<span style="color:#2DCE89"> - Faqs </span>
				</nav>
			</div>
			<div class="col-lg-6 col-5 text-right">
				<a href="/admin/faqs" class="btn btn-success">Danh sách Faqs</a>
			</div>
		</div>
	</BaseHeader>

	<div class="container-fluid mt--6">
		<div class="row">
			<div class="col-lg-6">
				<div class="card-wrapper">
					<!-- Input groups -->
					<Card>
						<!-- Card header -->
						<h3 slot="header" class="mb-0">{title}</h3>
						<!-- Card body -->
						<form on:submit|preventDefault={onSubmit}>
							<!-- Input groups with icon -->
							<div class="">
								<div class="row">
									<div class="col-lg-4 ">
										<strong> Tên câu hỏi </strong>
									</div>
									<div class="col-lg-8">
										<div class="">
											<BaseInput group="prepend" inputGroupClasses="input-group-merge" bind:value={formData.question} error={errors.question} >
												<textarea
												  class="form-control" bind:value={formData.question}></textarea>
											</BaseInput>
										</div>
									</div>
								</div>

                                <div class="row">
									<div class="col-lg-4 ">
										<strong> Câu trả lời </strong>
									</div>
									<div class="col-lg-8">
										<div class="">
											<BaseInput group="prepend" inputGroupClasses="input-group-merge" bind:value={formData.answer} error={errors.answer} >
												<textarea
												  class="form-control textarea-answer" bind:value={formData.answer}></textarea>
											</BaseInput>
										</div>
									</div>
								</div>

								<div class="text-right" style="float: right">
									<button class="btn btn-success">Cập nhật faqs</button>
								</div>
							</div>
						</form>
					</Card>
				</div>
			</div>
			<div class="col-lg-6">
				<div class="card-wrapper" />
			</div>
		</div>
	</div>
</div>
<style lang="scss">
.textarea-answer{ 
	height:230px
}
</style>
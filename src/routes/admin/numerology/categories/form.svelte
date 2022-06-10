<script lang="ts">
	import type { CategoryFormData } from '$lib/stores/numerology';
	import { STATUS } from '$lib/stores/type';

	import BaseHeader from '$lib/components/BaseHeader.svelte';
	import Card from '$lib/components/Cards/Card.svelte';
	import BaseCheckbox from '$lib/components/Inputs/BaseCheckbox.svelte';
	import BaseInput from '$lib/components/Inputs/BaseInput.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import 'flatpickr/dist/flatpickr.css';
	import 'flatpickr/dist/themes/light.css';
	import { createEventDispatcher } from 'svelte';
	import * as yup from 'yup';
	import { getMsgRequired } from '$lib/utils/message';
	import Image from '$lib/components/ABS/Image.svelte';
import { backendUrl } from '$lib/env';
	const dispatch = createEventDispatcher();
	export let formData: CategoryFormData;
	export let title: string;
	let imageInput: FileList;
	let errors: any = {};
	const schemaValidator = yup.object().shape({
		cat_name: yup.string().typeError(getMsgRequired('Tên')).required(getMsgRequired('Tên')),
		description: yup.string().typeError(getMsgRequired('Mô tả')).required(getMsgRequired('Mô tả'))
	});
	onMount(async () => {});

	async function onSubmit() {
		errors = {};
		try {
			await schemaValidator.validate({ ...formData }, { abortEarly: false });
			const formDataInput = new FormData();
			if (imageInput) {
				let file = imageInput[0];
				formDataInput.append('photo', file);
			}
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

	function onChangeStatus(event: CustomEvent<boolean>) {
		formData.status = event.detail ? STATUS.ACTIVE : STATUS.INACTIVE;
	}
</script>

<div transition:fade={{ duration: 250 }}>
	<BaseHeader className="pb-6">
		<div class="row align-items-center py-4">
			<div class="col-lg-6 col-7">
				<h6 class="h2 d-inline-block mb-0">{title}</h6>
				<nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
					<span style="color:#2DCE89"> - Danh mục </span>
				</nav>
			</div>
			<div class="col-lg-6 col-5 text-right">
				<a href="/admin/numerology/categories" class="btn btn-success">Danh sách danh mục</a>
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
										<strong> Tên </strong>
									</div>
									<div class="col-lg-8">
										<div class="">
											<BaseInput bind:value={formData.cat_name} error={errors.cat_name} />
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-lg-4 ">
										<strong> Mô tả </strong>
									</div>
									<div class="col-lg-8">
										<div class="">
											<BaseInput error={errors.description}>
												<textarea bind:value={formData.description} class="form-control" rows="3" />
											</BaseInput>
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-lg-4 ">
										<strong> Hình ảnh </strong>
									</div>
									<div class="col-lg-8">
										<div class="">
											{#if formData.photo}
												<Image src={`${backendUrl}${formData.photo}`} />
											{/if}
											<BaseInput>
												<input type="file" bind:files={imageInput} />
											</BaseInput>
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-lg-4 ">
										<strong> Trạng thái </strong>
									</div>
									<div class="col-lg-8">
										<div class="">
											<BaseCheckbox
												model={formData.status === STATUS.ACTIVE ? true : false}
												class="mb-3"
												on:click={onChangeStatus}
											/>
										</div>
									</div>
								</div>
								<div class="text-right" style="float: right">
									<button class="btn btn-success">Cập nhật nhóm</button>
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

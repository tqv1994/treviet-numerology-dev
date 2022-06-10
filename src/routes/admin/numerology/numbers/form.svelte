<script lang="ts">
	import { categoriesStore, type CategoryFormData, type CategoryNumberFormData } from '$lib/stores/numerology';
	import { STATUS } from '$lib/stores/type';

	import BaseHeader from '$lib/components/BaseHeader.svelte';
	import Card from '$lib/components/Cards/Card.svelte';
	import BaseCheckbox from '$lib/components/Inputs/BaseCheckbox.svelte';
	import BaseInput from '$lib/components/Inputs/BaseInput.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import * as yup from 'yup';
	import { getMsgRequired } from '$lib/utils/message';
import Image from '$lib/components/ABS/Image.svelte';
import { backendUrl } from '$lib/env';
	const dispatch = createEventDispatcher();
	export let formData: CategoryNumberFormData;
	export let title: string;
	let imageInput: FileList;
	let errors: any = {};
	const schemaValidator = yup.object().shape({
		name: yup.string().typeError(getMsgRequired('Tên')).required(getMsgRequired('Tên')),
		description: yup.string().typeError(getMsgRequired('Mô tả')).required(getMsgRequired('Mô tả')),
		number: yup.number().typeError(getMsgRequired('Số')).required(getMsgRequired('Số')),
		category_id: yup.number().typeError(getMsgRequired("Danh mục")).required(getMsgRequired('Danh mục')),
		x_order: yup.number().typeError(getMsgRequired("Sắp xếp")).required(getMsgRequired('Sắp xếp'))
	});

	async function onSubmit() {
		errors = {};
		try {
			await schemaValidator.validate({ ...formData }, { abortEarly: false });
			const formDataInput = new FormData();
			if (imageInput) {
				let file = imageInput[0];
				formDataInput.append('photo_link', file);
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
					<span style="color:#2DCE89"> - Con số </span>
				</nav>
			</div>
			<div class="col-lg-6 col-5 text-right">
				<a href="/admin/numerology/numbers" class="btn btn-success">Danh sách các con số</a
				>
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
										<strong> Nhóm </strong>
									</div>
									<div class="col-lg-8">
										<div class="">
											<BaseInput error={errors.category_id}>
												<select class="form-control" bind:value={formData.category_id}>
													{#each $categoriesStore || [] as item}
														<option value={item.id}>{item.cat_name}</option>
													{/each}
												</select>
											</BaseInput>
											<!-- <Select
										bind:value={formData.category_id}
										options={$categoriesStore}
										optionLabel="cat_name"
										optionValue="id"
									  /> -->
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-lg-4 ">
										<strong> Tên </strong>
									</div>
									<div class="col-lg-8">
										<div class="" >
											<BaseInput error={errors.name} bind:value={formData.name} />
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-lg-4 ">
										<strong> Số </strong>
									</div>
									<div class="col-lg-8">
										<div class="">
											<BaseInput bind:value={formData.number} error={errors.number} />
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
											{#if formData.photo_link}
												<Image src={`${backendUrl}${formData.photo_link}`} />
											{/if}
											<BaseInput  >
												<input type="file" bind:files={imageInput}/>
											</BaseInput>
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-lg-4 ">
										<strong> Sắp xếp </strong>
									</div>
									<div class="col-lg-8">
										<div class="">
											<BaseInput bind:value={formData.x_order} error={errors.x_order} />
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
									<button class="btn btn-success">Cập nhật con số</button>
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

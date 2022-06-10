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
    import type { PackageFormData } from '$lib/stores/package';

	export let formData: PackageFormData;
	export let title: string;

	let errors: any = {};
	const dispatch = createEventDispatcher();
	const schemaValidator = yup.object().shape({
		package_name: yup.string().typeError(getMsgRequired('Tên gói')).required(getMsgRequired('Tên gói')),
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
					<span style="color:#2DCE89"> - Gói </span>
				</nav>
			</div>
			<div class="col-lg-6 col-5 text-right">
				<a href="/admin/packages" class="btn btn-success">Danh sách gói</a>
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
										<strong> Tên gói </strong>
									</div>
									<div class="col-lg-8">
										<div class="">
											<BaseInput bind:value={formData.package_name} error={errors.package_name} disabled/>
										</div>
									</div>
								</div>

                                <div class="row">
									<div class="col-lg-4 ">
										<strong> Số lượng bài </strong>
									</div>
									<div class="col-lg-8">
										<div class="">
											<BaseInput bind:value={formData.amount} error={errors.amount} disabled/>
										</div>
									</div>
								</div>

                                <div class="row">
									<div class="col-lg-4 ">
										<strong> Thời hạn </strong>
									</div>
									<div class="col-lg-8">
                                        <div class="">
                                            <BaseInput type="number" bind:value={formData.expiry_time} error={errors.expiry_time} disabled/>
                                        </div>
									</div>
								</div>

                                <div class="row">
									<div class="col-lg-4 ">
										<strong> Giá </strong>
									</div>
									<div class="col-lg-8">
										<div class="">
											<BaseInput bind:value={formData.price} error={errors.price} disabled/>
										</div>
									</div>
								</div>

                                <div class="row">
									<div class="col-lg-4 ">
										<strong> Màu </strong>
									</div>
									<div class="col-lg-8">
										<div class="">
											<BaseInput bind:value={formData.color} error={errors.color} />
										</div>
									</div>
								</div>

								<div class="text-right" style="float: right">
									<button class="btn btn-success">Cập nhật gói</button>
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

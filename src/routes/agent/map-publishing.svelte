<script lang="ts" context="module">
	export const load: Load = async ({ fetch, session, url }) => {
		const keyword = url.searchParams.get('keyword') || '';
		const currentPage = url.searchParams.get('page') || 1;
		let reportDatas: DataWithPagination<Report> | undefined = undefined;
		const res = await fetch(`/p/reports?${objectToQueryString({ keyword, page: currentPage })}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/vnd.api+json',
				Accept: 'application/vnd.api+json'
			}
		});
		if (res.ok) {
			const data = await res.json();
			console.log(data);
			reportDatas = data.results;
		} else {
			const err = await res.json();
			console.error(err);
		}

		return {
			props: {
				keyword,
				currentPage,
				reportDatas
			}
		};
	};
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import BaseHeader from '$lib/components/BaseHeader.svelte';
	import { onMount } from 'svelte';
	import type { Report } from '$lib/stores/report';
	import type { DataWithPagination } from '$lib/stores/type';
	import Table from '$lib/components/ABS/Global/Datatable/Table.svelte';
	import type { TableColumn } from '$lib/components/ABS/Global/Datatable/Table.svelte';
	import { redirect } from '$lib/utils/redirect';

	import type { ReportFormData } from '$lib/stores/report';
	import Card from '$lib/components/Cards/Card.svelte';
	import BaseInput from '$lib/components/Inputs/BaseInput.svelte';
	import Flatpickr from 'svelte-flatpickr';
    import { objectToQueryString } from '$lib/utils/string';
	import type { Load } from '@sveltejs/kit';
	import { ppost } from '$lib/utils/fetch';
	let reportDatas: DataWithPagination<Report> | undefined;
	export let keyword: string;
	export let currentPage: number;
    let formData: ReportFormData;
	
	reset();
	function reset() {
		formData = {
			name: '',
			dob: '',
			phone: '',
			email: '',
			facode: ''
		};
	}
	const flatpickrOptions = {
		enableTime: false,
		onChange: (selectedDates, dateStr, instance) => {}
	};
	function handleChange(selectedDates, dateStr, instance) {}

	let suffix = false;
	export let name = 'Tạo báo cáo';

	async function onSubmit() {
		window.openLoading();
		try {
			await ppost('reports', formData);
			window.notice({
				text: 'Tạo báo cáo thành công',
				type: 'success'
			});
		} catch (err) {
			window.notice({
				text: err,
				type: 'danger'
			});
		}
		window.closeLoading();
	}
	onMount(async () => {
		let topmenu = document.getElementsByTagName('nav').item(0);
		// topmenu.classList.add('bg-danger');
		topmenu.classList.add('navbar-dark');
		topmenu.classList.remove('navbar-light');
		let search = document.getElementsByTagName('form').item(0);
		search.classList.remove('navbar-search-dark');
		search.classList.add('navbar-search-light');
	});
	let tableColumns: TableColumn[] = [
		{
			type: 'selection'
		},
		{
			prop: 'created_at',
			label: 'Ngày',
			minWidth: 160,
			sortable: true
		},
		{
			prop: 'agent_id',
			label: 'Đại lý',
			minWidth: 220,
			sortable: true
		},
		{
			prop: 'name',
			label: 'Họ và tên',
			minWidth: 135,
			sortable: true
		},
		{
			prop: 'phone',
			label: 'Điện thoại',
			minWidth: 100,
			sortable: true
		},
		{
			prop: 'email',
			label: 'Email',
			minWidth: 150,
			sortable: true
		}
	];

	async function paginationChange(event: CustomEvent<number>) {
		currentPage = event.detail;
		await getData();
	}

	async function onSearch(event: CustomEvent<string>) {
		keyword = event.detail;
		await getData();
	}

	async function onCreate() {
		redirect('/dashboad/reports/create');
	}
	// function handleDelete(index, row) {
	//   Swal.fire({
	//     title: "Bạn có chắc chắn không?",
	//     text: `Bạn sẽ không thể hoàn nguyên điều này!`,
	//     type: "warning",
	//     showCancelButton: true,
	//     confirmButtonClass: "btn btn-success btn-fill",
	//     cancelButtonClass: "btn btn-danger btn-fill",
	//     confirmButtonText: "Vâng, xoá nó!",
	//     buttonsStyling: false,
	//   }).then((result) => {
	//     if (result.value) {
	//       deleteRow(row);
	//       Swal.fire({
	//         title: "Deleted!",
	//         text: `You deleted ${row.name}`,
	//         type: "success",
	//         confirmButtonClass: "btn btn-success btn-fill",
	//         buttonsStyling: false,
	//       });
	//     }
	//   });
	// }
	// function deleteRow(row) {
	//   let indexToDelete = tableData.findIndex(
	//     (tableRow) => tableRow.id === row.id
	//   );
	//   if (indexToDelete >= 0) {
	//     tableData.splice(indexToDelete, 1);
	//   }
	// }

	async function getData() {
		window.openLoading();
		// reportDatas = await getListReportsService({
		//   keyword,
		//   page: currentPage,
		// });
		window.closeLoading();
	}
</script>

<div class="content" transition:fade={{ duration: 250 }}>
	<BaseHeader className="pb-6">
		<div class="row align-items-center py-4">
			<div class="col-7 col-lg-6">
				<h6 class="h2 d-inline-block mb-0">Đại lý</h6>
				<nav
					aria-label="breadcrumb"
					class="d-none d-md-inline-block ml-md-4"
					style="color: #2DCE89"
				>
					<span> - Danh sách báo cáo </span>
				</nav>
			</div>
			<div class="col-5 col-lg-6 text-right" />
		</div>
	</BaseHeader>
	<div class="container-fluid mt--6 mb-8">
		<div class="card-wrapper">
			<Card>
				<!-- Card header -->
				<h3 slot="header" class="mb-0">Tạo mới báo cáo</h3>
				<!-- Card body -->
				<form>
					<!-- Input groups with icon -->
					<div class="row">
						<div class="col-lg-6">
							<div class="row">
								<div class="col-lg-4 ">
									<strong> Điện thoại </strong>
								</div>
								<div class="col-lg-8">
									<div class="">
										<BaseInput placeholder="(+84) 123 456 789" bind:value={formData.phone} />
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-lg-4 ">
									<strong> Họ và tên </strong>
								</div>
								<div class="col-lg-8">
									<div class="">
										<BaseInput placeholder="Trần Văn A" bind:value={formData.name} />
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-lg-4 ">
									<strong> Ngày sinh </strong>
								</div>
								<div class="col-lg-8">
									<div class="">
										<BaseInput appendIcon="fas fa-calendar">
											<Flatpickr
												options={flatpickrOptions}
												class="form-control datepicker bg-white"
												bind:value={formData.dob}
												dateFormat="Y-m-d"
												placeholder="01/01/2022"
												on:change={(event) => handleChange(event)}
											/>
										</BaseInput>
									</div>
								</div>
							</div>
						</div>

						<div class="col-lg-6">
							<div class="row">
								<div class="col-lg-4 ">
									<strong> Điện thoại </strong>
								</div>
								<div class="col-lg-8">
									<div class="">
										<BaseInput placeholder="(+84) 123 456 789" bind:value={formData.phone} />
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-lg-4 ">
									<strong> Email </strong>
								</div>
								<div class="col-lg-8">
									<div class="">
										<BaseInput placeholder="tranvananh@gmail.com" bind:value={formData.email} />
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-lg-4 ">
									<strong> Mật khẩu </strong>
								</div>
								<div class="col-lg-8">
									<div class="">
										<BaseInput
											placeholder="***********"
											type="password"
											bind:value={formData.password}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div class="text-left" style="float: left" />
						<div class="text-right" style="float: right">
							<button class="btn btn-success">Xuất map</button>
						</div>
					</div>
				</form>
			</Card>
			<!-- Input groups -->
		</div>
	</div>
	<Table
		title="Lịch sử xuất map"
		createLabel="Xuất excel"
		dataWithPagination={reportDatas}
		{tableColumns}
		{keyword}
		on:create={onCreate}
		on:changeCurrentPage={paginationChange}
		on:search={onSearch}
	>
		<div slot="filter-form-content" class="filter-form-content">
			<div class="row form-group">
				<p class="search-datetime">Từ</p>
				<div class="col-md-9">
					<BaseInput
						type="datetime-local"
						value="2018-11-23T10:30:00"
						id="example-datetime-local-input"
						inputClasses="form-control datetime-input"
						styleInput="width:200px"
					/>
				</div>
			</div>

			<div class="row form-group" style="margin-left: 25px">
				<p class="search-datetime">Đến</p>
				<div class="col-md-9">
					<BaseInput
						type="datetime-local"
						value="2018-11-23T10:30:00"
						id="example-datetime-local-input"
						inputClasses="form-control datetime-input"
						styleInput="width:200px"
					/>
				</div>
			</div>
		</div>
		<div slot="cell" let:row let:cell>
			{#if cell.key === 'agent_id'}
				{row.agent ? row.agent.agentname : ''}
			{:else}
				{cell.value}
			{/if}
		</div>
	</Table>
</div>

<style lang="scss">
	.filter-form-content {
		display: flex;
	}
</style>

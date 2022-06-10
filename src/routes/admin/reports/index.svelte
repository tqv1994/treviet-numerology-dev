<script lang="ts" context="module">
	export const load: Load = async ({ fetch, session, url }) => {
		const keyword = url.searchParams.get('keyword') || '';
		const currentPage = url.searchParams.get('page') || 1;
		let reportDatas: DataWithPagination<Report> | undefined;
		const res = await fetch(`/p/reports?${objectToQueryString({ keyword, page: currentPage })}`);

		if (res.ok) {
			const data = await res.json();
			reportDatas = data.results;
			console.log(reportDatas);
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
	import BaseHeader from '$lib/components/BaseHeader.svelte';
	import BaseInput from '$lib/components/Inputs/BaseInput.svelte';
	import Table from '$lib/components/ABS/Global/Datatable/Table.svelte';
	import { fade } from 'svelte/transition';
	import {
		getListFilterDateReportService,
		getListReportsService
	} from '$lib/services/report.service';
	import { objectToQueryString } from '$lib/utils/string';
	import type { Report } from '$lib/stores/report';
	import type { DataWithPagination } from '$lib/stores/type';
	import type { TableColumn } from '$lib/components/ABS/Global/Datatable/Table.svelte';
	import type { Load } from '@sveltejs/kit';
	import Flatpickr from 'svelte-flatpickr';
import { formatNewDate } from '$lib/helper/datetime';

	let filterTime = true;

	export let name = 'Quản trị';
	export let reportDatas: DataWithPagination<Report>;
	export let keyword: string;
	export let currentPage: number;

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
		},
		{
			prop: 'level',
			label: 'Cây',
			minWidth: 100,
			sortable: true
		}
	];

	let dates = {
		simple: new Date(),
		range: '2022-05-22 12:00 to 2022-06-21 12:00'
	};

	const flatpickrOptionsRange = {
		mode: 'range',
		enableTime: true,
		onChange: (selectedDates: Date, dateStr: string, instance: []) => {
			let keyConnect = ' to ';
			console.log(dateStr);

			if (dateStr.includes(keyConnect)) {
				let listDateStr = dateStr.split(' to ');
				let fromDate = listDateStr[0];
				let toDate = listDateStr[1];
				getFilterDateData(fromDate, toDate);
			}
		}
	};

	async function paginationChange(event: CustomEvent<number>) {
		currentPage = event.detail;
		await getData();
	}

	async function onSearch(event: CustomEvent<string>) {
		keyword = event.detail;
		await getData();
	}

	async function getData() {
		window.openLoading();
		reportDatas = await getListReportsService({
			keyword,
			page: currentPage
		});
		window.closeLoading();
	}

	async function getFilterDateData(from_date: string, to_date: string) {
		window.openLoading();
		reportDatas = await getListFilterDateReportService(from_date, to_date);
		window.closeLoading();
	}

  console.log(formatNewDate("2022-06-04T10:11:36.000000Z"));
  
</script>

<div class="content" transition:fade={{ duration: 250 }}>
	<BaseHeader className="pb-2">
		<div class="row align-items-center py-4">
			<div class="col-7 col-lg-6">
				<h6 class="h2 d-inline-block mb-0">{name}</h6>
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
	<Table
		title="Danh sách báo cáo"
		createLabel="Xuất excel"
		filterHeardClass="mt--4 ad-filter"
		classButton="mt-4"
		dataWithPagination={reportDatas}
		{tableColumns}
		{keyword}
		{filterTime}
		on:changeCurrentPage={paginationChange}
		on:search={onSearch}
		styleFilter="display: -webkit-inline-box;"
	>
		<div slot="filterRadio" class="mr-5 filter-radio">
			<label class="">
				<input type="radio" checked name="radio" class="custom-radio" />
				<span class="checkmark" />
				Toàn bộ đại lý
			</label>
			<label class="ml-3">
				<input type="radio" name="radio" class="custom-radio" />
				<span class="checkmark" />
				Theo thời gian
			</label>
		</div>
		<div slot="filterTime" class="filterHeard">
			<div class="row form-group mb--3" style="margin-bottom:0px;margin-left: -5px">
				<p class="search-datetime">Từ</p>
				<div class="col-md-9 width-date-picker">
					<BaseInput>
						<Flatpickr
							options={flatpickrOptionsRange}
							class="form-control datepicker bg-white"
							defaultDate={dates.range}
							placeholder={dates.range}
							dateFormat="Y-m-d"
						/>
					</BaseInput>
				</div>
				<div class="col-md-3" />
			</div>
		</div>
		<div slot="cell" let:row let:cell>
			{#if cell.key === 'agent_id'}
				{row.agent ? row.agent.agentname : ''}
			{:else if cell.key === 'level'}
				{row.agent ? `Đại lý cấp ${row.agent.level}` : ''}
			{:else if cell.value == null}
				Không có thông tin
      {:else if cell.key === 'created_at'}
        {row.created_at ? formatNewDate(row.created_at) : ''}
			{:else}
				{cell.value}
			{/if}
		</div>
	</Table>
</div>

<style>
	.ad-filter {
		display: -webkit-inline-box;
	}
	.filter-radio {
		margin-top: 35px;
		margin-right: 50px;
	}
	.custom-radio {
		margin-right: 10px;
	}
	.custom-label-checkbox::before {
		color: white;
		background-color: green;
	}
	.custom-radio:checked {
		color: green;
		background-color: green;
	}

	.width-date-picker {
		width: 355px;
		margin-top: 25px;
	}

	.search-datetime {
		margin-top: 34px;
	}
</style>

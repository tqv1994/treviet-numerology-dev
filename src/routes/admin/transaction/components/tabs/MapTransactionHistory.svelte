<script lang="ts">
	import Table from '$lib/components/ABS/Global/Datatable/Table.svelte';
	import BaseInput from '$lib/components/Inputs/BaseInput.svelte';
	import { fade } from 'svelte/transition';
	import { getListFilterDatePurchaseService, getListPurchasesService } from '$lib/services/purchase.service';
	import type { DataWithPagination } from '$lib/stores/type';
	import type { TableColumn } from '$lib/components/ABS/Global/Datatable/Table.svelte';
	import Flatpickr from 'svelte-flatpickr';
	import { formatDate } from '$lib/helper/datetime';
	import type { Purchase } from '$lib/stores/purchase';

	export let keyword: string;
	export let currentPage: number;
	export let props: DataWithPagination<Purchase>;

	let tableColumns: TableColumn[] = [
		{
			type: 'selection'
		},
		{
			prop: 'purchase_date',
			label: 'Ngày',
			minWidth: 220,
			sortable: true
		},
		{
			prop: 'agent_sex',
			label: 'Giới tính',
			minWidth: 100,
			sortable: true
		},
		{
			prop: 'agent_agentname',
			label: 'Họ và tên',
			minWidth: 135,
			sortable: true
		},
		{
			prop: 'agent_phone',
			label: 'Điện thoại',
			minWidth: 100,
			sortable: true
		},
		{
			prop: 'package_name',
			label: 'Tên gói',
			minWidth: 100,
			sortable: true
		},
		{
			prop: 'agent_email',
			label: 'Email',
			minWidth: 150,
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
			if (dateStr.includes(keyConnect)) {
				let listDateStr = dateStr.split(' to ');
				let fromDate = listDateStr[0];
				let toDate = listDateStr[1];
				getFilterDateDataByUser(fromDate, toDate);
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
		props = await getListPurchasesService({
			keyword,
			page: currentPage
		});
		console.log('map transaction');

		window.closeLoading();
	}

	async function getFilterDateDataByUser(from_date: string, to_date: string) {
		window.openLoading();
		props = await getListFilterDatePurchaseService(from_date, to_date);
		window.closeLoading();
	}
</script>

<div class="content" transition:fade={{ duration: 250 }}>
	<Table
		createLabel="Xuất excel"
		dataWithPagination={props}
		{tableColumns}
		{keyword}
		navTab
		on:changeCurrentPage={paginationChange}
		on:search={onSearch}
	>
		<div slot="label-search">
			<p class="label-search mt-2 ml-4 mr-4">Search:</p>
		</div>
		<div slot="filter-form-content" class="filter-form-content">
			<div class="row form-group">
				<p class="search-datetime mt-2">Từ:</p>
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
			</div>
		</div>
		<div slot="cell" let:row let:cell>
			{#if cell.key === 'agent_sex'}
				{row.agent ? row.agent.sex : ''}
			{:else if cell.key === 'agent_agentname'}
				{row.agent ? row.agent.agentname : ''}
			{:else if cell.key === 'agent_phone'}
				{row.agent ? row.agent.phone : ''}
			{:else if cell.key === 'agent_email'}
				{row.agent ? row.agent.email : ''}
			{:else if cell.key === 'package_name'}
				{row.transfer_details ? row.transfer_details[0].package.package_name : ''}
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

	.width-date-picker {
		min-width: 302px;
	}
</style>

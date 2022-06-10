<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import type { Transfer } from '$lib/stores/transfer';
	import type { DataWithPagination } from '$lib/stores/type';
	import Table from '$lib/components/ABS/Global/Datatable/Table.svelte';
	import type { TableColumn } from '$lib/components/ABS/Global/Datatable/Table.svelte';

	// const urlParams = new URLSearchParams(window.location.search);
	export let reportDatas: DataWithPagination<Transfer>;
	export let keyword: string;
	export let currentPage: number;
	import { pget } from '$lib/utils/fetch';
	import { authStore } from '$lib/stores/auth';
	import { objectToQueryString } from '$lib/utils/string';
	import { formatDate } from '$lib/utils/datetime';
	export let name = 'Tạo báo cáo';

	onMount(async () => {
		await getData();
	});
	let tableColumns: TableColumn[] = [
		{
			prop: 'transfer_date',
			label: 'Ngày',
			minWidth: 160,
			sortable: true
		},
		{
			prop: 'agent_receive_id',
			label: 'Họ và tên',
			minWidth: 220,
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

	export async function getData() {
		const res = await pget(
			`transfers/${$authStore?.id}/transfer?${objectToQueryString({
				perPage: 10
			})}`
		);
		if (res.ok) {
			const data = await res.json();
			reportDatas = data.results;
		} else {
			const error = await res.json();
			console.log(error);
		}
	}
</script>

<div class="content" transition:fade={{ duration: 250 }}>
	<Table
		dataWithPagination={reportDatas}
		{tableColumns}
		{keyword}
		navTab
		on:changeCurrentPage={paginationChange}
		on:search={onSearch}
	>
		<div slot="cell" let:row let:cell>
			{#if cell.key === 'agent_receive_id'}
				{row.agent_receive ? row.agent_receive.agentname : ''}
			{:else if cell.key === 'phone'}
				{row.agent_receive ? row.agent_receive.phone : ''}
			{:else if cell.key === 'email'}
				{row.agent_receive ? row.agent_receive.email : ''}
			{:else if cell.key === 'transfer_date'}
				{row.created_at ? formatDate(row.transfer_date, 'dd/mm/yyyy') : ''}
			{:else}
				{cell.value}
			{/if}
		</div>
	</Table>
</div>

<style lang="scss">
	.text-systerm {
		color: 800000;
		font-size: 12px;
	}
	.filter-form-content {
		display: flex;
	}
	.badge-success {
		background-color: #1aae6f;
		color: white;
	}
</style>

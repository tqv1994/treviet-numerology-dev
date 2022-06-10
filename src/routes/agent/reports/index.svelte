<script lang="ts" context="module">
	export const load: Load = async ({ fetch, session, url }) => {
		const keyword = url.searchParams.get('keyword') || '';
		const currentPage = url.searchParams.get('page') || 1;
		let reportDatas: DataWithPagination<Report>;
		const res = await fetch(`/p/reports/user/${session.user.id}?${objectToQueryString({ keyword, page: currentPage })}`);
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
	import { getListReportsService } from '$lib/services/report.service';
	import type { DataWithPagination } from '$lib/stores/type';
	import Table from '$lib/components/ABS/Global/Datatable/Table.svelte';
	import type { TableColumn } from '$lib/components/ABS/Global/Datatable/Table.svelte';
	import type { Load } from '@sveltejs/kit';
	import { appName } from '$lib/env';
	import { redirect } from '$lib/components/redirect.svelte';
	import { objectToQueryString } from '$lib/utils/string';
	export let reportDatas: DataWithPagination<Report>;
	export let keyword: string;
	export let currentPage: number;
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
		redirect('/agent/reports/create');
	}

	async function getData() {
		window.openLoading();
		reportDatas = await getListReportsService({
			keyword,
			page: currentPage
		});
		window.closeLoading();
	}
</script>

<svelte:head>
	<title>{appName || ''} - Đại lý - Danh sách báo cáo</title>
</svelte:head>
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
	<Table
		title="Danh sách báo cáo"
		createLabel="Tạo mới báo cáo"
		dataWithPagination={reportDatas}
		{tableColumns}
		{keyword}
		on:create={onCreate}
		on:changeCurrentPage={paginationChange}
		on:search={onSearch}
	>
		<div slot="cell" let:row let:cell>
			{#if cell.key === 'agent_id'}
				{row.agent ? row.agent.agentname : ''}
			{:else}
				{cell.value}
			{/if}
		</div>
	</Table>
</div>

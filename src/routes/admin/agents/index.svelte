<script lang="ts" context="module">
	export const load: Load = async ({ fetch, session, url }) => {
		const keyword = url.searchParams.get('keyword') || '';
		const currentPage = url.searchParams.get('page') || 1;
		let agentDatas: DataWithPagination<Agent> | undefined;
		const res = await fetch(`/p/agents?${objectToQueryString({ keyword, page: currentPage })}`);

		let treeViews: AgentTreeView[];
		const resTree = await fetch(`/p/tree-view`);

		if (res.ok) {
			const data = await res.json();
			agentDatas = data.results;
			console.log(agentDatas);
		} else {
			const err = await res.json();
			console.error(err);
		}

		if (resTree.ok) {
			const data = await resTree.json();
			treeViews = data.results;
		} else {
			const err = await resTree.json();
			console.error(err);
		}

		return {
			props: {
				keyword,
				currentPage,
				agentDatas,
				treeViews
			}
		};
	};
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import BaseHeader from '$lib/components/BaseHeader.svelte';
	export let name = 'Quản trị';
	import { onMount } from 'svelte';
	import type { Report } from '$lib/stores/report';
	import { getListReportsService } from '$lib/services/report.service';
	import type { DataWithPagination } from '$lib/stores/type';
	import Table from '$lib/components/ABS/Global/Datatable/Table.svelte';
	import type { TableColumn } from '$lib/components/ABS/Global/Datatable/Table.svelte';
	import BaseInput from '$lib/components/Inputs/BaseInput.svelte';
	import { redirect } from '$lib/utils/redirect';
	import Card from '$lib/components/Cards/Card.svelte';
	import type { Agent, AgentTreeView } from '$lib/stores/agent';
	import { getListAgentsService, getListFilterDateAgentService } from '$lib/services/agent.service';
	import type { Load } from '@sveltejs/kit';
	import { objectToQueryString } from '$lib/utils/string';
	import Folder from '$lib/components/ABS/Global/SystemTree/Folder.svelte';
	import Flatpickr from 'svelte-flatpickr';

	let filterTime = true;

	export let agentDatas: DataWithPagination<Agent>;
	export let treeViews: AgentTreeView[];
	export let keyword: string;
	export let currentPage: number;

	console.log(treeViews);
	
	onMount(async () => {
		// await getData();
		// let topmenu = document.getElementsByTagName('nav').item(0);
		// topmenu.classList.add('bg-danger');
		// topmenu.classList.add('navbar-dark');
		// topmenu.classList.remove('navbar-light');
		// let search = document.getElementsByTagName('form').item(0);
		// search.classList.remove('navbar-search-dark');
		// search.classList.add('navbar-search-light');
	});

	let tableColumns: TableColumn[] = [
		{
			type: 'selection'
		},
		{
			prop: 'username',
			label: 'Username',
			minWidth: 160,
			sortable: true
		},
		{
			prop: 'agentname',
			label: 'Họ và tên',
			minWidth: 220,
			sortable: true
		},
		{
			prop: 'created_at',
			label: 'Ngày tham gia',
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
			prop: 'email',
			label: 'Cây',
			minWidth: 150,
			sortable: true
		},
		{
			prop: 'status',
			label: 'Trạng thái',
			minWidth: 150,
			sortable: true
		}
	];

	let dates = {
		simple: new Date(),
		range: "2022-05-22 12:00 to 2022-06-21 12:00"
	};

	const flatpickrOptionsRange = {
		mode: "range",
		enableTime: true,
		onChange: (selectedDates: Date, dateStr: string, instance: []) => {
			let keyConnect = " to ";
			console.log(dateStr);
			
			if (dateStr.includes(keyConnect)) {
				let listDateStr = dateStr.split(" to ");
				let fromDate = listDateStr[0];
				let toDate = listDateStr[1];
				getFilterDateData(fromDate, toDate)
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
		agentDatas = await getListAgentsService({
			keyword,
			page: currentPage
		});
		window.closeLoading();
	}

	async function getFilterDateData(from_date: string, to_date: string) {
		window.openLoading();
		agentDatas = await getListFilterDateAgentService(from_date, to_date);
		console.log(agentDatas);
		
		window.closeLoading();
	}
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
					<span> - Danh sách đại lý </span>
				</nav>
			</div>
			<div class="col-5 col-lg-6 text-right" />
		</div>
	</BaseHeader>
	<div class="container-fluid">
		<div class="card-wrapper">
			<Card>
				<!-- Card header -->
				<h3 slot="header" class="mb-0">
					Hệ thống đại lý
					<span class=" badge-pill badge-success badge ml-4">Close All</span>
					<span class=" badge-pill badge-success badge">Open All</span>
				</h3>
				<!-- Card body -->
				<div class="mt-3" style="color:mediumvioletred">
					<Folder expanded={true} agentTreeViews={treeViews} ref_code={null}/>
				</div>
			</Card>
			<!-- Input groups -->
		</div>
	</div>
	<Table
		title="Danh sách đại lý"
		createLabel="Xuất excel"
		filterHeardClass="mt--4 ad-filter"
		classButton="mt-4"
		dataWithPagination={agentDatas}
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
		<div slot="filterTime" class="filterHeard" >
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
			{#if cell.key === 'username'}
				{row.user ? row.user.name : ''}
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

	.width-date-picker {
		width: 355px;
		margin-top: 25px;
	}

	.search-datetime {
		margin-top: 34px;
	}
</style>

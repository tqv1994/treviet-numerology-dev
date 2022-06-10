<script lang="ts" context="module">
	export const load: Load = async ({ fetch, session, url }) => {
		const keyword = url.searchParams.get('keyword') || '';
		const currentPage = url.searchParams.get('page') || 1;
		let numberDatas: DataWithPagination<CategoryNumber> | undefined;
		const res = await fetch(
			`/p/category-numbers?${objectToQueryString({ keyword, page: currentPage })}`
		);
		if (res.ok) {
			const data = await res.json();
			numberDatas = data.results;
		} else {
			const err = await res.json();
		}

		return {
			props: {
				keyword,
				currentPage,
				numberDatas
			}
		};
	};
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import BaseHeader from '$lib/components/BaseHeader.svelte';
	import { onMount } from 'svelte';
	import { STATUS, STATUS_LABEL, type DataWithPagination } from '$lib/stores/type';
	import Table from '$lib/components/ABS/Global/Datatable/Table.svelte';
	import type { TableColumn } from '$lib/components/ABS/Global/Datatable/Table.svelte';
	import { redirect } from '$lib/utils/redirect';
	import type { Load } from '@sveltejs/kit';
	import { objectToQueryString } from '$lib/utils/string';
	import { categoriesStore, type CategoryNumber } from '$lib/stores/numerology';
	import { redirectAdmin } from '$lib/components/redirect.svelte';
	import { pdelete } from '$lib/utils/fetch';
	import SvelteTooltip from 'svelte-tooltip';
	import Swal from 'sweetalert2/dist/sweetalert2.js';
	import Badge from '$lib/components/Badge.svelte';
	import type { SwalResult } from '$lib/utils/swal';
	import { getListCategoryNumbersService } from '$lib/services/category-number.service';
	export let numberDatas: DataWithPagination<CategoryNumber>;
	export let keyword: string;
	export let currentPage: number;
	onMount(async () => {
		console.log(numberDatas);
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
			prop: 'category_id',
			label: 'Nhóm',
			minWidth: 160,
			sortable: true
		},
		{
			prop: 'name',
			label: 'Tên',
			minWidth: 100,
			sortable: true
		},
		{
			prop: 'description',
			label: 'Mô tả',
			minWidth: 200,
			sortable: true
		},
		{
			prop: 'status',
			label: 'Trạng thái',
			sortable: true,
			minWidth: 50
		},
		{
			prop: 'actions',
			label: 'Hành động',
			minWidth: 50,
			sortable: false
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

	async function getData() {
		window.openLoading();
		numberDatas = await getListCategoryNumbersService({
			keyword,
			page: currentPage
		});
		window.closeLoading();
	}

	async function onCreate() {
		redirectAdmin('/numerology/numbers/create');
	}

	function onEdit(number: CategoryNumber) {
		redirectAdmin(`/numerology/numbers/update/${number.id}`);
	}

	async function onDelete(number: CategoryNumber) {
		try {
			const result: SwalResult = await Swal.fire({
				title: 'Bạn có chắc chắn không?',
				text: `Bạn sẽ không thể hoàn nguyên điều này!`,
				type: 'warning',
				showCancelButton: true,
				confirmButtonClass: 'btn btn-success btn-fill',
				cancelButtonClass: 'btn btn-danger btn-fill',
				confirmButtonText: 'Vâng, xoá nó!',
				cancelButtonText: 'Huỷ',
				buttonsStyling: false
			});
			if (result.isConfirmed) {
				window.openLoading();
				await pdelete(`category-numbers/${number.id}`);
				numberDatas.data = numberDatas.data?.filter((item) => item.id !== number.id);
				window.notice({
					text: 'Bản ghi đã được xoá',
					type: 'success'
				});
			}
		} catch (err) {
			window.notice({
				text: 'Có lỗi xảy ra',
				type: 'danger'
			});
		}
		window.closeLoading();
	}

	function getCategoryName(number: CategoryNumber) {
		if (number.category_id) {
			const category = $categoriesStore.find((item) => item.id === number.category_id);
			if (category) {
				return category.cat_name;
			}
		}
		return '';
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
					<span> - Danh sách danh mục </span>
				</nav>
			</div>
			<div class="col-5 col-lg-6 text-right" />
		</div>
	</BaseHeader>
	<Table
		title="Danh sách con số"
		createLabel="Tạo mới con số"
		dataWithPagination={numberDatas}
		{tableColumns}
		{keyword}
		on:create={onCreate}
		on:changeCurrentPage={paginationChange}
		on:search={onSearch}
	>
		<div slot="cell" let:row let:cell>
			{#if cell.key === 'actions'}
				<div class="d-inline" style="color:#fff">
					<SvelteTooltip tip="Sửa" top color="#000">
						<a
							href="#!"
							on:click={() => onEdit(row)}
							class="table-action"
							data-original-title="Sửa con số"
							data-toggle="tooltip"
							data-placement="top"
							title="Sửa"
						>
							<i class="fas fa-edit" />
						</a>
					</SvelteTooltip>
				</div>
				<div class="d-inline" style="color: #fff;">
					<SvelteTooltip tip="Xoá" top color="#000">
						<a
							href="#!"
							on:click={() => onDelete(row)}
							class="table-action table-action-delete"
							data-toggle="tooltip"
							data-placement="top"
							title="Xoá"
							data-original-title="Xoá con số"
						>
							<i class="fas fa-trash" />
						</a>
					</SvelteTooltip>
				</div>
			{:else if cell.key === 'status'}
				<Badge className="badge-dot mr-4">
					<i class={`bg-${cell.value === STATUS.ACTIVE ? 'success' : 'danger'}`} />
					<span class="status">{STATUS_LABEL[cell.value]}</span>
				</Badge>
			{:else if cell.key === 'category_id'}
				{getCategoryName(row)}
			{:else}
				{cell.value || ''}
			{/if}
		</div>
	</Table>
</div>

<script lang="ts" context="module">
	export const load: Load = async ({ fetch, session, url }) => {
		const keyword = url.searchParams.get('keyword') || '';
		const currentPage = url.searchParams.get('page') || 1;
		let categoryDatas: DataWithPagination<Category> | undefined;
		const res = await fetch(`/p/categories?${objectToQueryString({ keyword, page: currentPage })}`);
		if (res.ok) {
			const data = await res.json();
			categoryDatas = data.results;
		} else {
			const err = await res.json();
			console.error(err);
		}

		return {
			props: {
				keyword,
				currentPage,
				categoryDatas
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
	import type { Load } from '@sveltejs/kit';
	import { objectToQueryString } from '$lib/utils/string';
	import type { Category } from '$lib/stores/numerology';
	import { getListCategoriesService } from '$lib/services/category.service';
	import { redirectAdmin } from '$lib/components/redirect.svelte';
	import { pdelete } from '$lib/utils/fetch';
	import SvelteTooltip from 'svelte-tooltip';
	import Swal from 'sweetalert2/dist/sweetalert2.js';
	import Badge from '$lib/components/Badge.svelte';
	import type { SwalResult } from '$lib/utils/swal';
	export let categoryDatas: DataWithPagination<Category>;
	export let keyword: string;
	export let currentPage: number;
	onMount(async () => {
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
			prop: 'cat_name',
			label: 'Tên',
			minWidth: 160,
			sortable: true
		},
		{
			prop: 'description',
			label: 'Mô tả',
			minWidth: 220,
			sortable: true
		},
		{
			prop: 'status',
			label: 'Trạng thái',
			sortable: true
		},
		{
			prop: 'actions',
			label: 'Hành động',
			minWidth: 100,
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
		categoryDatas = await getListCategoriesService({
			keyword,
			page: currentPage
		});
		window.closeLoading();
	}

	async function onCreate() {
		redirectAdmin('/numerology/categories/create');
	}

	function onEdit(category: Category) {
		console.log(category);
		redirectAdmin(`/numerology/categories/update/${category.id}`);
	}

	async function onDelete(category: Category) {
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
				await pdelete(`categories/${category.id}`);
				categoryDatas.data = categoryDatas.data?.filter((item) => item.id !== category.id);
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
		title="Danh sách danh mục"
		createLabel="Tạo mới danh mục"
		dataWithPagination={categoryDatas}
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
							data-original-title="Sửa nhóm"
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
							data-original-title="Xoá nhóm"
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
			{:else}
				{cell.value}
			{/if}
		</div>
	</Table>
</div>

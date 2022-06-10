<script lang="ts" context="module">
	export type DataTableAgenctLevel = {
		name: string; // Tên gói
		report_number: number; // Số báo cáo
		expense: number; // Chi phí
		duration: string; // Thời hạn; Vd: 1 năm
		color: string; // Màu sắc của gói
	};
</script>

<script lang="ts">
	import Card from '$lib/components/Cards/Card.svelte';
	export let tableData: DataTableAgenctLevel[] = [];

	import { onMount } from 'svelte';
	import jQuery from 'jquery';
	import dt from 'datatables.net';
	import dtCss from 'datatables.net-dt';
	let tableElement;
	onMount(() => {
		window.jq = jQuery;
    dt(window.jq);
		window.jq(tableElement).DataTable({
			order: [[1, 'asc']],
			paging: false,
			searching: false,
			ordering: true,
			info: false,
			responsive: true
		});
	});
</script>

<Card bodyClasses="p-0" headerClasses="border-0">
	<div slot="header">
		<div class="row align-items-center">
			<div class="col">
				<h3 class="mb-0">Bảng cấp độ đại lý</h3>
			</div>
		</div>
	</div>

	<table
		bind:this={tableElement}
		class="table-responsive table-flush align-items-center border-bottom-0"
		style="width: 100%"
	>
		<thead class="w-100 pagevisitsthead">
			<tr>
				<th style="min-width: 90px; width: 30%">
					Tên gói
					<span class="caret-wrapper">
						<i class="sort-caret ascending" />
						<i class="sort-caret descending" />
					</span>
				</th>
				<th style="min-width: 90px; width: 30%">
					số báo cáo
					<span class="caret-wrapper">
						<i class="sort-caret ascending" />
						<i class="sort-caret descending" />
					</span>
				</th>
				<th style="min-width: 100; width: 30%">
					chi phí
					<span class="caret-wrapper">
						<i class="sort-caret ascending" />
						<i class="sort-caret descending" />
					</span>
				</th>
				<th style="min-width: 91px; width: 30%">
					thời gian
					<span class="caret-wrapper">
						<i class="sort-caret ascending" />
						<i class="sort-caret descending" />
					</span>
				</th>
			</tr>
		</thead>
		<tbody class="pagevisitsTbody">
			{#each tableData as element}
				<tr>
					<td>
						<div class="font-weight-600 text-{element.color}">{element.name}</div>
					</td>
					<td>{element.report_number}</td>
					<td>{element.expense}</td>
					<td>{element.duration}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</Card>

<style>
	.pagevisitsthead {
		background: #f6f9fc;
		color: #8898aa;
		height: 42px;
		font-size: 0.65rem !important;
		text-transform: uppercase !important;
		letter-spacing: 1px !important;
		border-top: 1px solid #ebeef5;
	}

	.pagevisitsthead tr th {
		padding-top: 0px;
		padding-bottom: 0px;
		font-weight: 600;
	}

	.pagevisitsTbody tr td {
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		padding-top: 1rem;
		padding-bottom: 1rem;
		border-top: 1px solid #e9ecef;
	}

	tbody tr {
		border-top: 1px solid #ebeef5;
	}

	thead tr td {
		padding-top: 0px;
		padding-bottom: 0px;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		width: auto;
		min-width: auto;
		white-space: nowrap;
	}

	table tbody tr {
		transition: all 0.3s ease-in-out;
	}

	table tbody tr:hover {
		background-color: transparent !important;
		transition: all 0.3s ease-in-out;
	}

	table tbody tr td {
		width: auto;
		min-width: auto;
		white-space: nowrap;
		box-sizing: border-box;
		white-space: normal;
		word-break: break-all;
		line-height: 23px;
		text-align: left;
		color: #525f7f;
		font-size: 0.8125rem;
		white-space: nowrap;
	}
</style>

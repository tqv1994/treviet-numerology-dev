<script lang="ts" context="module">
	export type DataTableAgentList = {
		name: string;
		image: string;
		sales: string; // "4.569"
		unique: string; // "340"
		bounceRate: string; //"46.53%"
		bounceRateDirection: 'up' | 'down';
		progress: number;
		progressType: 'gradient-danger' | 'gradient-primary' | 'gradient-info' | 'gradient-warning';
	};
</script>

<script lang="ts">
	export let tableData: DataTableAgentList[] = [];

	import { onMount } from 'svelte';
	import jQuery from 'jquery';
	import dt from 'datatables.net';
	import dtCss from 'datatables.net-dt';
	import Card from '$lib/components/Cards/Card.svelte';
	import BaseProgress from '$lib/components/BaseProgress.svelte';

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

<Card bodyClasses="p-0" headerClass="border-0">
	<div slot="header">
		<div class="row align-items-center">
			<div class="col">
				<h3 class="mb-0">Danh sách đại lý</h3>
			</div>
			<div class="col text-right">
				<a href="#!" class="btn btn-sm btn-primary">Tất cả</a>
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
				<th style="min-width: 200px; width: 20%;">
					họ và tên
					<span class="caret-wrapper">
						<i class="sort-caret ascending" />
						<i class="sort-caret descending" />
					</span>
				</th>
				<th style="min-width: 150px; width: 20%;">
					doanh số
					<span class="caret-wrapper">
						<i class="sort-caret ascending" />
						<i class="sort-caret descending" />
					</span>
				</th>
				<th style="min-width: 150px; width: 20%;">
					cấp độ
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
					<td colspan="1" rowspan="1" style="min-width: 200px; width: 20%;">
						<div class="list-group list-group-flush list my--3">
							<div class="list-group-item px-0" key={element.image}>
								<div class="row align-items-center">
									<div class="col-md-auto">
										<!-- Avatar -->
										<a href="/" class="avatar rounded-circle">
											<img src={element.image} class="rounded-circle" alt="Image placeholder" />
										</a>
									</div>
									<div class="col ml--2">
										<h4 class="mb-0">
											<a href="/">{element.name}</a>
										</h4>
									</div>
								</div>
							</div>
						</div>
					</td>
					<td colspan="1" rowspan="1" style="min-width: 150px; width: 20%;">
						{element.sales}
					</td>
					<td colspan="1" rowspan="1" style="min-width: 150px; width: 20%;">
						<div class="d-flex align-items-center">
							<span class="mr-2">{element.progress}%</span>
							<BaseProgress type={element.progressType} value={element.progress} />
						</div>
					</td>
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

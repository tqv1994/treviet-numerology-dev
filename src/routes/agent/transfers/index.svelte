<script lang="ts" context="module">
	export const load: Load = async ({ fetch, session, url }) => {
		const myAgent = getMyAgent(session.user);
		let myChildAgents: AgentTreeView[] = [];
		if (myAgent) {
			try {
				const res = await fetch(`/p/tree-view/${myAgent.id}`);
				if (res.ok) {
					const data: { results: AgentTreeView[] } = await res.json();
					myChildAgents = (data.results || []).filter((item) => item.id !== myAgent.id);
				} else {
					const err = await res.json();
					console.error(err);
				}
			} catch (error) {
				console.log(error);
			}
		}
		return {
			props: {
				myChildAgents,
				myAgent
			}
		};
	};
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import Tabs from '$lib/components/ABS/Tab/Tabs.svelte';
	import type { Tab } from '$lib/components/ABS/Tab/Tabs.svelte';
	export let name = 'Đại lý';
	import BaseHeader from '$lib/components/BaseHeader.svelte';
	import { onMount } from 'svelte';
	import HistoryReceiveReports from '../transfers/components/tabs/HistoryReceiveReports.svelte';
	import HistoryTransferReports from '../transfers/components/tabs/HistoryTransferReports.svelte';
	onMount(function () {});
	import CreateTranfer from '../transfers/components/tabs/createTranfer.svelte';
	import type { Load } from '@sveltejs/kit';
	import { getMyAgent } from '$lib/utils/user';
	import type { AgentTreeView } from '$lib/stores/agent';
	import { getDataTreeView } from '$lib/components/ABS/Global/SystemTree/Folder.svelte';
	import { writable } from 'svelte/store';
	import Card from '$lib/components/Cards/Card.svelte';
	let tabs: Tab[] = [
		{ id: 1, name: 'Lịch sử chuyển map', component: HistoryTransferReports },
		{ id: 2, name: 'Lịch sử nhận map', component: HistoryReceiveReports }
	];
	let tabActive: Tab = tabs[0];
	export let myChildAgents: AgentTreeView[];
</script>

<div transition:fade={{ duration: 250 }}>
	<BaseHeader className="pb-6">
		<div class="row align-items-center py-4">
			<div class="col-lg-6 col-7">
				<h6 class="h2 d-inline-block mb-0">{name}</h6>
				<nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
					<span style="color:#2DCE89"> - Chuyển map </span>
				</nav>
			</div>
			<div class="col-lg-6 col-5 text-right" />
		</div>
	</BaseHeader>

	<div class="container-fluid mt--6">
		<div class="row">
			<div class="col-lg-8">
				<div class="card-wrapper">
					<!-- Input groups -->
					<CreateTranfer {myChildAgents} />
				</div>
			</div>
			<div class="col-lg-4">
				<div class="card-wrapper" />
			</div>
		</div>
	</div>
</div>
<div class="container-fluid">
	<div class="row">
		<div class="col-8">
			<Card>
				<div slot="header">
					<ul
						class="nav nav-pills nav-fill flex-column flex-md-row"
						id="tabs-icons-text"
						role="tablist"
					>
						<li class="nav-item">
							<a
								class="nav-link mb-sm-3 mb-md-0 {tabActive.id === 1 ? 'active' : ''}"
								data-toggle="tab"
								href="javascript:void(0);" on:click={()=>{tabActive = tabs[0]}}>Lịch sử chuyển map</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link mb-sm-3 mb-md-0 {tabActive.id === 2 ? 'active' : ''}"
								id="tabs-icons-text-2-tab"
								href="javascript:void(0);"
								on:click={()=>{tabActive = tabs[1]}}>Lịch sử nhận map</a
							>
						</li>
					</ul>
				</div>
				<Tabs {tabs} tabSelected={tabActive} isShowHeader={false} />
			</Card>
		</div>
		<div class="col-4" />
	</div>
</div>

<style lang="scss">
	.thead-light {
		background: #f6f9fc;
		color: #8898aa;
		font-size: 0.65rem !important;
		text-transform: uppercase !important;
		letter-spacing: 1px !important;
		border-top: 1px solid #ebeef5;
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

	table.paginatedTable thead tr {
		border-bottom: 1px solid #ebeef5;
		border-top: 1px solid #ebeef5;
	}
	table.paginatedTable thead tr th,
	table.paginatedTable thead tr td {
		min-height: 40px;
		height: 40px;
		border-bottom: 1px solid #ebeef5;
		border-top: 1px solid #ebeef5;
	}

	table.paginatedTable tbody tr td,
	table.paginatedTable tbody tr th {
		min-height: 40px;
		height: 40px;
	}

	.tdPaginated {
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		padding-top: 1rem;
		padding-bottom: 1rem;
	}

	tbody.tbodyPaginated tr.trPaginated td {
		border-bottom: 1px solid #ebeef5;
	}

	.nav-item .active {
		position: relative;
		border-bottom: 2px solid #2dce89;
		font-weight: bold;
	}
	.container-fluid :global(.container-fluid) {
		padding-left: 0 !important;
		padding-right: 0 !important;
	}
	.container-fluid :global(.container-fluid .card-body) {
		padding: 0;
		padding-top: 1.5em;
	}
	.container-fluid :global(.container-fluid .card-header) {
		padding: 0;
	}
</style>

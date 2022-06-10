<script lang="ts" context="module">
	export const load: Load = async ({ fetch, session, url }) => {
		const keyword = url.searchParams.get('keyword') || '';
		const currentPage = url.searchParams.get('page') || 1;
		const userId = session.user.id;
		let purchaseDatas: DataWithPagination<Purchase> | undefined;
		let purchaseByIdDatas: DataWithPagination<Purchase> | undefined;
		let treeViews: AgentTreeView[];
		const resPurchases = await fetch(
			`/p/purchases?${objectToQueryString({ keyword, page: currentPage })}`
		);
		const resPurchaseByUserId = await fetch(`/p/purchases/${userId}/purchase`);
		// const resTree = await fetch(`/p/tree-view/${session.user.id}`);

		if (resPurchases.ok) {
			const data = await resPurchases.json();
			console.log(data);
			
			purchaseDatas = data.results;
		} else {
			const err = await resPurchases.json();
			console.error(err);
		}

		if (resPurchaseByUserId.ok) {
			const data = await resPurchaseByUserId.json();
			purchaseByIdDatas = data.results;
		} else {
			const err = await resPurchaseByUserId.json();
			console.error(err);
		}

		// if (resTree.ok) {
		// 	const data = await resTree.json();
		// 	treeViews = data.results;
		// } else {
		// 	const err = await resTree.json();
		// 	console.error(err);
		// }

		return {
			props: {
				keyword,
				currentPage,
				purchaseDatas,
				purchaseByIdDatas,
				treeViews
			}
		};
	};
</script>

<script lang="ts">
	import Card from '$lib/components/Cards/Card.svelte';
	import BaseHeader from '$lib/components/BaseHeader.svelte';
	import Tabs from '$lib/components/ABS/Tab/Tabs.svelte';
	import BaseInput from '$lib/components/Inputs/BaseInput.svelte';
	import ListMapSystemHistory from './components/tabs/ListMapTransactionHistory.svelte';
	import MapTransactionHistory from './components/tabs/MapTransactionHistory.svelte';
	import Folder from '$lib/components/ABS/Global/SystemTree/Folder.svelte';
	import { fade } from 'svelte/transition';
	import { objectToQueryString } from '$lib/utils/string';
	import { createPurchaseService } from '$lib/services/purchase.service';
	import type { Tab } from '$lib/components/ABS/Tab/Tabs.svelte';
	import type { DataWithPagination } from '$lib/stores/type';
	import type { Load } from '@sveltejs/kit';
	import type { AgentTreeView } from '$lib/stores/agent';
	import type { Purchase, PurchaseFormData } from '$lib/stores/purchase';

	export let purchaseDatas: DataWithPagination<Purchase>;
	export let purchaseByIdDatas: DataWithPagination<Purchase>;
	export let treeViews: AgentTreeView[];
	export let keyword: string;
	export let currentPage: number;

	let formData: PurchaseFormData;
	let tabs: Tab[] = [
		{
			id: 1,
			name: 'Lịch sử chuyển MAP hệ thống',
			component: ListMapSystemHistory,
			prop: purchaseDatas
		},
		{ id: 2, name: 'Lịch sử chuyển MAP', component: MapTransactionHistory, prop: purchaseByIdDatas }
	];

	reset();

	function reset() {
		formData = {
			username: '',
			agent_name: '',
			package_id: 0,
			code_2fa: ''
		};
	}

	async function onSubmit() {
		window.openLoading();
		try {
			await createPurchaseService(formData);
			window.notice({
				text: 'Xuất MAP thành công',
				type: 'success'
			});
		} catch (err) {
			window.notice({
				text: err,
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
			</div>
			<div class="col-5 col-lg-6 text-right" />
		</div>
	</BaseHeader>
	<div class="container-fluid mt--6 mb-4">
		<div class="card-wrapper">
			<Card>
				<!-- Card header -->
				<h3 slot="header" class="mb-0">Chuyển map cho đại lý</h3>
				<!-- Card body -->
				<form>
					<!-- Input groups with icon -->
					<div class="row">
						<div class="col-12 mb-5">
							<!-- <h3 class="mb-0">Hệ thống đại lý lý</h3> -->
							<!-- Card body -->
							<div class="" style="color:mediumvioletred">
								<div class="mb-3">
									<span class=" badge-pill badge-success badge ml-4">Close All</span>
									<span class=" badge-pill badge-success badge">Open All</span>
								</div>
								<Folder expanded={true} agentTreeViews={treeViews} ref_code={null} />
							</div>
						</div>
						<div class="col-lg-6">
							<div class="row">
								<div class="col-lg-4 ">
									<strong>Usename </strong>
								</div>
								<div class="col-lg-8">
									<div class="">
										<BaseInput placeholder="vietthach" bind:value={formData.username} />
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-lg-4 ">
									<strong> Họ và tên đại lý </strong>
								</div>
								<div class="col-lg-8">
									<div class="">
										<BaseInput placeholder="Dương Quỳnh Mai" bind:value={formData.agent_name} />
									</div>
								</div>
							</div>
						</div>

						<div class="col-lg-6">
							<div class="row">
								<div class="col-lg-4 ">
									<strong> Gói đại lý </strong>
								</div>
								<div class="col-lg-8">
									<div class="">
										<BaseInput>
											<select class="form-control" id="exampleFormControlSelect1">
												<option value={1}>Gói 1</option>
												<option value={2}>Gói 2</option>
												<option value={3}>Gói 3</option>
												<option value={4}>Gói 4</option>
												<option value={5}>Gói 5</option>
												<option value={6}>Gói 6</option>
												<option value={7}>Gói 7</option>
												<option value={8}>Gói 8</option>
												<option value={9}>Gói 9</option>
											</select>
										</BaseInput>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-lg-4 ">
									<strong> 2FA </strong>
								</div>
								<div class="col-lg-8">
									<div class="">
										<BaseInput placeholder="208304" bind:value={formData.code_2fa} />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div class="text-left" style="float: left" />
						<div class="text-right" style="float: right">
							<button class="btn btn-success" on:click={onSubmit}>Xuất map</button>
						</div>
					</div>
				</form>
			</Card>
			<!-- Input groups -->
		</div>
	</div>
</div>
<div style="position: relative;">
	<Tabs {tabs} tabSelected={tabs[0]} />
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

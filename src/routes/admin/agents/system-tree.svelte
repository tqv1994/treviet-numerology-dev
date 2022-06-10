<script lang="ts" context="module">
	export const load: Load = async ({ fetch, session, url }) => {
		let treeViews: AgentTreeView[];
		const res = await fetch(`/p/tree-view`);

		if (res.ok) {
			const data = await res.json();
			treeViews = data.results;
		} else {
			const err = await res.json();
			console.error(err);
		}

		return {
			props: {
				treeViews
			}
		};
	};
</script>

<script lang="ts">
	import BaseHeader from '$lib/components/BaseHeader.svelte';
	import Card from '$lib/components/Cards/Card.svelte';
	import { fade } from 'svelte/transition';
	import type { Load } from '@sveltejs/kit';
	import type { AgentTreeView } from '$lib/stores/agent';
	import Folder from '$lib/components/ABS/Global/SystemTree/Folder.svelte';

	export let treeViews: AgentTreeView[];
</script>

<div transition:fade={{ duration: 250 }}>
	<BaseHeader className="pb-6">
		<div class="row align-items-center">
			<div class="col-lg-6 col-7" />
			<div class="col-lg-6 col-5 text-right" />
		</div>
	</BaseHeader>
	<div class="container-fluid mt--6">
		<div class="row">
			<div class="col-lg-12">
				<div class="card-wrapper">
					<!-- Input groups -->
					<Card>
						<!-- Card header -->
						<h6 class="h2 d-inline-block mb-0">Đại lý</h6>
						<nav
							aria-label="breadcrumb"
							class="d-none d-md-inline-block ml-md-4"
							style="color: #2DCE89"
						>
							<span> - Cây hệ thống </span>
						</nav>
						<Folder expanded={true} agentTreeViews={treeViews} ref_code={null} />
						<!-- Card body -->
					</Card>
				</div>
			</div>
		</div>
	</div>
</div>

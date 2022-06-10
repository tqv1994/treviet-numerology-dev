<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { Tab } from './Tabs.svelte';
	const dispatch = createEventDispatcher();
	export let styleTab = "";
	export let tabs: Tab[];
	export let tabSelected: Tab;
	function onClick(value: Tab) {
		dispatch('selectTab', <Tab>value);
	}
</script>

<div class="mb-4">
	<ul class="nav nav-tabs " id="myTab" role="tablist" style="{styleTab}">
		{#each tabs as tab}
			<li
				class="nav-item ml-3 {tabSelected.id == tab.id ? 'text-green' : ''}"
				on:click={() => onClick(tab)}
				href="javascript:void(0);">
				<a class="nav-item-link nav-link active" id="home-tab">{tab.name}</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.nav-tabs {
		border-bottom: transparent;
		z-index: 1;
		margin-left: 38px;
		margin-top: 24px;

	}
	.text-green a {
		color: #2dce89;
	}

	.text-green {
		border-bottom: 2px solid #2dce89;
	}

	.nav-item {
		cursor: pointer;
	}
	.nav-tabs .nav-item.show .nav-link,
	.nav-tabs .nav-link.active {
		background-color: white;
		border-color: white;
	}
	.nav-tabs .nav-link.active,
	.nav-tabs .nav-item.show .nav-link {
		background-color: white;
		border-color: white;
	}
	.nav-tabs {
		border-bottom: 1px solid white;
	}
</style>

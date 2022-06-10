<script lang="ts" context="module">
	import { writable } from 'svelte/store';

	export type Tab = {
		id: number;
		name: string;
		component: any;
		prop?: any;
	};
	export const isReloadTab = writable<boolean>(false);
</script>

<script lang="ts">
	import { afterUpdate } from 'svelte';

	import TabsHeader from './TabsHeader.svelte';

	export let tabs: Tab[] = [];
	export let tabSelected: Tab;
	export let styleTab = '';
	export let isShowHeader: boolean = true;
	let currentTab;

	afterUpdate(async () => {
		if ($isReloadTab) {
			isReloadTab.set(false);
			await currentTab.getData();
		}
	});

	function onChangeTabs(event: CustomEvent<Tab>) {
		tabSelected = event.detail;
	}
</script>

<div class="tabs">
	{#if isShowHeader}
		<TabsHeader {tabs} on:selectTab={onChangeTabs} {tabSelected} {styleTab} />
	{/if}
	{#if tabSelected}
		<svelte:component
			this={tabSelected.component}
			bind:this={currentTab}
			props={tabSelected.prop}
		/>
	{/if}
</div>

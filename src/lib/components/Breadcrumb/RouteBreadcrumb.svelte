<script lang="ts">
	import { onMount } from 'svelte';

	import BreadCrumb from './Breadcrumb.svelte';
	import BreadcCrumbItem from './BreadcrumbItem.svelte';
	export let name = '';
	let pathName = name;
	let path: string[] = [];
	onMount(() => {
		path = window.location.pathname.split('/');
	});
</script>

<BreadCrumb listClasses="breadcrumb-links breadcrumb-dark">
	<BreadcCrumbItem key="home">
		<a href="/">
			<i class="fas fa-home" style="color: #2DCE89"/>
		</a>
	</BreadcCrumbItem>
	{#each path as name, index}
		{#if name !== ''}
			<BreadcCrumbItem
				key={name}
				active={index === path.length - 1 ? true : false}
				style="display: inline-block"
			>
				{#if index < path.length - 1}
					{#if name !== 'dashboard'}
						<a href="/dashboard/{name}" class="text-capitalize">{name}</a>
					{:else}
						<a href="/{name}" class="text-capitalize">{name}</a>
					{/if}
				{:else}
					<span>{pathName}</span>
				{/if}
			</BreadcCrumbItem>
		{/if}
	{/each}
</BreadCrumb>

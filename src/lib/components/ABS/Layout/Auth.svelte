<script lang="ts">
	import Card from '$lib/components/Cards/Card.svelte';
	import { fade, scale } from 'svelte/transition';
	import { onMount } from 'svelte';
	export let title: string = '';
	export let subTitle: string = '';
</script>

<div in:scale={{ y: 200, duration: 500 }} out:scale={{ y: 200, duration: 100 }}>
	<div class="header bg-gradient-green py-7 py-lg-8 pt-lg-9">
		<div class="container container">
			<div class="header-body text-center mb-7">
				<div class="row justify-content-center">
					<div class="px-5 col-md-8 col-lg-6 col-xl-5">
						<h1 class="text-white">{title}</h1>
					</div>
				</div>
			</div>
		</div>
		<div class="separator separator-bottom separator-skew zindex-100">
			<svg
				x="0"
				y="0"
				viewBox="0 0 2560 100"
				preserveAspectRatio="none"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
			>
				<polygon points="2560 0 2560 100 0 100" class="fill-default" />
			</svg>
		</div>
	</div>
	<div class="mt--8 pb-5 container">
		<div class="row justify-content-center">
			<div class="col-md-8 col-lg-6">
				<Card
					noBody
					className="bg-secondary border-0 mb-0 card"
					headerClasses="bg-transparent pb-5"
					bodyClasses="px-lg-5 py-lg-5"
				>
					<div class="card-body px-lg-5 py-lg-5">
						<div class="text-center text-muted mb-4">
							<small>{subTitle}</small>
						</div>
						<slot name="content" />
					</div>
				</Card>
				<slot name="footer" />
			</div>
		</div>
	</div>
</div>

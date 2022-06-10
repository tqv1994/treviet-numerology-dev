<script lang="ts">
	import BaseInput from '$lib/components/Inputs/BaseInput.svelte';
	import type { Agent } from '$lib/stores/agent';
	import { authStore } from '$lib/stores/auth';
	import { pputWithFile } from '$lib/utils/fetch';
	import { getErrorMessage } from '$lib/utils/response';
	import Image from '../../Image.svelte';
	import { getImage } from '$lib/utils/image';

	let citizenIdImg1Files: FileList | undefined;
	let citizenIdImg2Files: FileList | undefined;
	let imageLinksFiles: FileList | undefined;
	let citizenIdImg1Input, citizenIdImg2Input, imageLinksInput;
	export let agent: Agent | undefined = undefined;

	async function handleSubmit() {
		window.openLoading();
		const user = $authStore;
		const formDataInput = new FormData();
		formDataInput.append('phone', user?.user_detail?.phone || '');
		formDataInput.append('address', user?.user_detail?.address || '');
		if (citizenIdImg1Files) {
			let file = citizenIdImg1Files[0];
			formDataInput.append('citizen_id_img_1', file);
		}
		if (citizenIdImg2Files) {
			let file = citizenIdImg2Files[0];
			formDataInput.append('citizen_id_img_2', file);
		}
		if (imageLinksFiles) {
			let file = imageLinksFiles[0];
			formDataInput.append('image_links', file);
		}
		const res = await pputWithFile(`agents/${agent.id}`, formDataInput);
		if (res.ok) {
			const data: { results: Agent } = await res.json();
			window.notice({
				text: 'Gửi thông tin xác minh thành công',
				type: 'success'
			});
			authStore.update((s) => {
				if (s && s.agents && s.agents?.length > 0) {
					agent = s.agents[0] = data.results;
				}
				return s;
			});
			reset();
		} else {
			const error = await res.json();
			window.notice({
				text: getErrorMessage(error.errors),
				type: 'danger'
			});
		}
		window.closeLoading();
	}
	function reset() {
		citizenIdImg1Input.value = '';
		citizenIdImg2Input.value = '';
		imageLinksInput.value = '';
	}
</script>

{#if agent}
	<form action="" on:submit|preventDefault={handleSubmit}>
		<!-- Address -->
		<div class="row">
			<div class="col-md-12">
				<BaseInput appendIcon="" label="Mặt trước CCCD*">
					{#if getImage(agent.citizen_id_img_1)}
						<Image src={getImage(agent.citizen_id_img_1) || ''} width="30%" ratio="30%" />
					{/if}
					<input type="file" accept="image/*" bind:files={citizenIdImg1Files} bind:this={citizenIdImg1Input} />
				</BaseInput>
				<hr class="my-1" />
			</div>

			<div class="col-md-12">
				<BaseInput appendIcon="" label="Mặt sau CCCD*">
					{#if getImage(agent.citizen_id_img_2)}
						<Image src={getImage(agent.citizen_id_img_2) || ''} width="30%" ratio="30%" />
					{/if}
					<input type="file" accept="image/*" bind:files={citizenIdImg2Files} bind:this={citizenIdImg2Input} />
				</BaseInput>
				<hr class="my-1" />
			</div>
			<div class="col-md-12">
				<BaseInput appendIcon="" label="Hình ảnh chụp kèm CCCD*">
					{#if getImage(agent.image_links)}
						<Image src={getImage(agent.image_links) || ''} width="30%" ratio="30%" />
					{/if}
					<input type="file" accept="image/*" bind:files={imageLinksFiles} bind:this={imageLinksInput} />
				</BaseInput>
			</div>
		</div>
		<div class="text-right">
			{#if citizenIdImg1Files || citizenIdImg2Files || imageLinksFiles}
				<button class="btn btn-success">Xác minh</button>
			{:else}
				<button class="btn btn-success" disabled>Xác minh</button>
			{/if}
		</div>
	</form>
{/if}

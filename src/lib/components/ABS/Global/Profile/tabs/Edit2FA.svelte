<script lang="ts">
	import { authStore } from '$lib/stores/auth';
	import { ppost, pget } from '$lib/utils/fetch';
	reset();
	function reset() {}
	async function onSubmit() {
    if(!$authStore?.google2fa_secret){
      window.openLoading();
      const res = await ppost('insert-2fa-code', { email: $authStore?.email || '',id: $authStore?.id });
      if (res.ok) {
        const data = await res.json();
        authStore.update(s=>{
          if(s){
            s.imageQR = data.results[0]['QR-image'];
            s.google2fa_secret = data.results['Secret Code'];
          }
          return s;
        });
      }
      window.closeLoading();
    }
	}
</script>

<div class="pl-lg-4">
	<form on:submit|preventDefault={onSubmit}>
		<!-- Input groups with icon -->
		<div class="row">
			<div class="col-10">
				{#if !$authStore?.imageQR}
					<button class="btn btn-success">Lấy QR code</button>
        {:else}
          {@html $authStore.imageQR}
        {/if}
			</div>
		</div>
	</form>
</div>
<style>
	.password-strength {
		float: right;
		margin-top: -26px;
		padding-bottom: 15px;
	}

	#verify {
		min-height: 2.5rem;
	}

	.form-control-label {
		font-size: 600;
	}
</style>

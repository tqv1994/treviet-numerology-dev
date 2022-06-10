<script lang="ts">
	import { authStore, type ReferralLink } from '$lib/stores/auth';

	import Card from '$lib/components/Cards/Card.svelte';
	import BaseInput from '$lib/components/Inputs/BaseInput.svelte';
	import { getAge, getAvatar, getReferralLink } from '$lib/utils/user';
	import { pget } from '$lib/utils/fetch';
	import Image from '$lib/components/ABS/Image.svelte';
import { STATUS } from '$lib/stores/type';

	// import { navOptions } from  '../../views/Dashboard/Tab/Nav.svelte';	// import application navigation
	// let selected = navOptions[0];	// keep track of the selected 'page' object (default to the about component since we must have local db connection established first)
	let intSelected = 0; // selected page index

	// change the selected component (the event.originalTarget.id is not accessible in Chrome so switched to event.srcElement.id)
	function changeComponent(event) {
		// selected = navOptions[event.srcElement.id];
		intSelected = event.srcElement.id;
	}

	let referralCodeID = 'referralCode';
	function copyCode() {
		/* Get the text field */
		let copyText = document.getElementById('referralCode');
		/* Select the text field */
		copyText.select();
		copyText.setSelectionRange(0, 99999); /* For mobile devices */

		/* Copy the text inside the text field */
		navigator.clipboard.writeText(copyText.value);

		/* Alert the copied text */
		window.notice({
			text: 'Link giới thiệu đã được sao chép',
			type: 'success'
		});
	}

	async function createReferralLink() {
		window.openLoading();
		const res = await pget('create-link');
		if (res.ok) {
			const linkData: { results: ReferralLink } = await res.json();
			authStore.update((s) => {
				if (s) {
					if (Array.isArray(s.create_links)) {
						s.create_links.push(linkData.results);
					} else {
						s.create_links = [linkData.results];
					}
				}
				return s;
			});
		}
		window.closeLoading();
	}

	function getAgentStatusLabel(){
		let result: string = 'Đang chờ xác thực';
		authStore.subscribe((u)=>{
			if(u && u.agents && u.agents.length > 0){
				result = u.agents[0].status.toString();
			}
		});
		return result;
	}

	function getAgentStatusType(){
		let result: 'danger' | 'success' = 'danger';
		if(getAgentStatusLabel() === "Đã duyệt"){
			result = 'success';
		}
		return result;
	}
</script>

<div>
	<Card
		noBody
		className="card-profile"
		imgSrc="../../img/theme/img-1-1000x600.jpg"
		alt="Image Placeholder"
		imgTop
	>
		<div class="row justify-content-center">
			<div class="col-lg-3 order-lg-2">
				<div class="card-profile-image">
					<a href="/">
						<Image src={getAvatar($authStore) || `../../img/theme/team-4.jpg`} class="avatar" />
					</a>
				</div>
			</div>
		</div>
		<div class="card-body pt-0">
			<div class="text-center mt-6">
				<h5 class="h3">
					{$authStore?.user_detail?.first_name || $authStore?.name}
					<span class="font-weight-light">{getAge($authStore)}</span>
				</h5>
				<!-- <div class="h5 font-weight-300">
          <i class="ni location_pin mr-2" />
          Ly Tự Trọng, Minh Khai
        </div>
        <div class="h5 mt-4">
          <i class="ni business_briefcase-24 mr-2" />
          Solution Manager - Creative Tim Officer
        </div> -->
				<div class="user-status">
					<i class="ni education_hat mr-2" />
					Trạng thái tài khoản:
					<p class="user-status-text text-{getAgentStatusType()}"> {getAgentStatusLabel()}</p>
				</div>
			</div>
			<div>
				<div class="row">
					<div class="col-md-12">
						<BaseInput
							type="text"
							label="Link giới thiệu"
							value={getReferralLink($authStore)}
							model=""
							disabled
							inputId="referralCode"
						/>
					</div>
					<div class="col-md-12">
						<div class="d-flex justify-content-center">
							{#if getReferralLink($authStore)}
								<button on:click={copyCode} class="btn btn-success">Sao chép link giới thiệu</button
								>
							{:else}
								<button on:click={createReferralLink} class="btn btn-warning"
									>Tạo link giới thiệu</button
								>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</Card>
</div>

<style>
	.user-status {
		font-size: 0.9em;
		font-weight: bold;
		display: inline-flex;
	}

	.user-status-text {
		font-size: 0.9em;
		font-weight: bold;
	}
	.card-profile-image :global(.avatar) {
		width: 140px !important;
		height: 140px !important;
		border-radius: 0.375rem;
		border: 3px solid #fff;
		transform: translate(-50%, -50%) scale(1);
		position: absolute;
		left: 50%;
		transition: all 0.15s ease;
	}

	.card-profile-image :global(.avatar img) {
		-webkit-transform: none;
		transform: none;
	}
</style>

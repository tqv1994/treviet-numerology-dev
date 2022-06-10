<script lang="ts">
	import Tabs from '$lib/components/ABS/Tab/Tabs.svelte';
	import type { Tab } from '$lib/components/ABS/Tab/Tabs.svelte';
	import Card from '$lib/components/Cards/Card.svelte';
	import ChangePassword from './tabs/ChangePassword.svelte';
	import Edit2Fa from './tabs/Edit2FA.svelte';
	import UpdateInfo from './tabs/UpdateInfo.svelte';
	import UserCardAgent from './UserCardAgent.svelte';
	import VerificationForm from './VerificationForm.svelte';
	import { getMyAgent } from '$lib/utils/user';
	import { authStore } from '$lib/stores/auth';
	let tabs: Tab[] = [
		{ id: 1, name: 'Thông tin', component: UpdateInfo },
		{ id: 2, name: 'Đổi mật khẩu', component: ChangePassword },
		{ id: 3, name: '2FA', component: Edit2Fa }
	];
  const myAgent = getMyAgent($authStore);
</script>

<div>
	<Card>
		<div class="row align-items-center" slot="header">
			<div class="col-8">
				<h3 class="mb-0">Cập nhật tài khoản</h3>
			</div>
			<div class="col-4 text-right" />
		</div>

		<div class="mb-4">
			<Tabs {tabs} tabSelected={tabs[0]} styleTab="margin-top:-48px;" />
		</div>
	</Card>
	<Card>
		<div class="row align-items-center" slot="header">
			<div class="col-8">
				<h3 class="mb-0">Xác minh hồ sơ</h3>
			</div>
			<div class="col-4 text-right" />
		</div>

		<div class="mb-4">
			<VerificationForm agent={myAgent} />
		</div>
	</Card>
</div>

<style>
	.nav-item .active {
		color: #2dce89;
		position: relative;
		border-bottom: 2px solid #2dce89;
		font-weight: bold;
		background-color: transparent;
		background: transparent;
		border-color: transparent;
	}
</style>

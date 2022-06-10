<script lang="ts">
	import Card from '$lib/components/Cards/Card.svelte';
	import BaseInput from '$lib/components/Inputs/BaseInput.svelte';
	import { formatDate } from '$lib/utils/datetime';
	import type { AgentTreeView } from '$lib/stores/agent';
	import { authStore } from '$lib/stores/auth';
	import { packagesStore } from '$lib/stores/package';
	import type { TransferForm } from '$lib/stores/transfer';
	import { ppost } from '$lib/utils/fetch';
	import { getErrorMessage } from '$lib/utils/response';
	import { getMyAgent } from '$lib/utils/user';
	import { isReloadTab } from '$lib/components/ABS/Tab/Tabs.svelte';
	import * as yup from 'yup';
	import { getMsgRequired } from '$lib/utils/message';
	let errors: any = {};
	const schemaValidator = yup.object().shape({
		agent_receive_id: yup
			.number()
			.typeError(getMsgRequired('Đại lý'))
			.required(getMsgRequired('Đại lý')),
		package_id: yup.number().typeError(getMsgRequired('Gói')).required(getMsgRequired('Gói')),
		one_time_password: yup
			.string()
			.typeError(getMsgRequired('Mã 2FA'))
			.required(getMsgRequired('Mã 2FA'))
	});

	let formData: TransferForm = reset();
	export let myChildAgents: AgentTreeView[];
	function reset(): TransferForm {
		return {
			agent_id: getMyAgent($authStore)?.id || undefined,
			package_id: undefined,
			agent_receive_id: undefined,
			one_time_password: '',
			transfer_date: formatDate(new Date(), 'yyyy-mm-dd')
		};
	}

	async function onSubmit() {
		window.openLoading();
		try {
			await schemaValidator.validate({ ...formData }, { abortEarly: false });
			const res = await ppost('transfers', formData);
			if (res.ok) {
				window.notice({
					text: 'Tạo báo cáo thành công',
					type: 'success'
				});
				formData = reset();
				isReloadTab.set(true);
			} else {
				const error = await res.json();
				window.notice({
					text: getErrorMessage(error.errors),
					type: 'danger'
				});
			}
		} catch (err) {
			if (err.inner) {
				errors = err.inner.reduce((acc, err) => {
					return { ...acc, [err.path]: err.message };
				}, {});
			}
		}
		window.closeLoading();
	}
</script>

<Card>
	<!-- Card header -->
	<h3 slot="header" class="mb-0">Tạo mới chuyển map</h3>
	<!-- Card body -->
	<form on:submit|preventDefault={onSubmit}>
		<!-- Input groups with icon -->
		<div class="">
			<div class="row">
				<div class="col-lg-4 ">
					<strong> Đại lý* </strong>
				</div>
				<div class="col-lg-8">
					<div class="">
						<BaseInput error={errors.agent_receive_id}>
							<select class="form-control" bind:value={formData.agent_receive_id}>
								{#each myChildAgents || [] as agent}
									<option value={agent.id}>{agent.agentname}</option>
								{/each}
							</select>
						</BaseInput>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-lg-4 ">
					<strong> Gói đại lý* </strong>
				</div>
				<div class="col-lg-8">
					<div class="">
						<BaseInput error={errors.package_id}>
							<select class="form-control" bind:value={formData.package_id}>
								{#each $packagesStore || [] as item}
									<option value={item.id}>{item.package_name}</option>
								{/each}
							</select>
						</BaseInput>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-lg-4 ">
					<strong> Mã 2FA* </strong>
				</div>
				<div class="col-lg-8">
					<div class="">
						<BaseInput error={errors.one_time_password} placeholder="208304" bind:value={formData.one_time_password} />
					</div>
				</div>
			</div>
			<div class="text-right" style="float: right">
				<button class="btn btn-success">Chuyển map</button>
			</div>
		</div>
	</form>
</Card>

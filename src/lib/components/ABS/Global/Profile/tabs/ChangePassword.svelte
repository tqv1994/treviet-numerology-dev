<script lang="ts" context="module">
	export type PasswordChangeForm = {
		password_old: string;
		password: string;
		password_confirmation: string;
	};
</script>

<script lang="ts">
	import { getMsgRequired } from '$lib/utils/message';
	import BaseInput from '$lib/components/Inputs/BaseInput.svelte';
	import { getPasswordStrengthLabel, getPasswordStrengthType } from '$lib/utils/validations';
	import * as yup from 'yup';
	import { ppost } from '$lib/utils/fetch';
	import { getErrorMessage } from '$lib/utils/response';
	let formData: PasswordChangeForm;
	let errors: any = {};
	reset();
	function reset() {
		formData = {
			password_old: '',
			password: '',
			password_confirmation: ''
		};
	}
	const schemaValidator = yup.object().shape({
		password_old: yup
			.string()
			.typeError(getMsgRequired('Mật khẩu hiện tại'))
			.required(getMsgRequired('Mật khẩu hiện tại')),
		password: yup
			.string()
			.typeError(getMsgRequired('Mật khẩu mới'))
			.required(getMsgRequired('Mật khẩu mới')),
		password_confirmation: yup
			.string()
			.typeError(getMsgRequired('Mật khẩu xác nhận'))
			.required(getMsgRequired('Mật khẩu xác nhận'))
			.oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không trùng khớp')
	});

	async function onSubmit() {
		window.openLoading();
		try {
			await schemaValidator.validate({ ...formData }, { abortEarly: false });
			const res = await ppost('users/password-change', formData);
			if (res.ok) {
				window.notice({
					text: 'Đổi mật khẩu thành công',
					type: 'success'
				});
				reset();
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

<div class="pl-lg-4">
	<form on:submit|preventDefault={onSubmit}>
		<!-- Input groups with icon -->
		<div class="row">
			<div class="col-10">
				<div class="row">
					<div class="col-lg-4">
						<strong class="form-control-label"> Mật khẩu hiện tại* </strong>
					</div>
					<div class="col-lg-8">
						<div class="">
							<BaseInput
								error={errors.password_old}
								placeholder=""
								bind:value={formData.password_old}
								type="password"
							/>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-lg-4 ">
						<strong class="form-control-label"> Mật khẩu mới* </strong>
					</div>
					<div class="col-lg-8">
						<div class="">
							<BaseInput
								error={errors.password}
								placeholder=""
								bind:value={formData.password}
								type="password"
							/>
							{#if formData.password}
								<div class="password-strength">
									<div class="text-muted font-italic">
										<small>
											Độ mạnh mật khẩu:
											<span
												class="text-{getPasswordStrengthType(formData.password)} font-weight-700"
												>{getPasswordStrengthLabel(formData.password)}</span
											>
										</small>
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-lg-4 ">
						<strong class="form-control-label"> Mật khẩu xác nhận*</strong>
					</div>
					<div class="col-lg-8">
						<div class="">
							<BaseInput
								error={errors.password_confirmation}
								placeholder=""
								bind:value={formData.password_confirmation}
								type="password"
							/>
							{#if formData.password_confirmation}
								<div class="password-strength">
									<div class="text-muted font-italic">
										<small>
											Độ mạnh mật khẩu:
											<span
												class="text-{getPasswordStrengthType(
													formData.password_confirmation
												)} font-weight-700"
												>{getPasswordStrengthLabel(formData.password_confirmation)}</span
											>
										</small>
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>

				<div class="text-right" style="float: right">
					<button class="btn btn-success">Đổi mật khẩu</button>
				</div>
			</div>
			<div class="col-2" />
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

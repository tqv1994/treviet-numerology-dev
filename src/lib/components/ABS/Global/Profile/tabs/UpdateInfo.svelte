<script lang="ts">
	import { authStore, type UserDetail, type UserDetailBase } from '$lib/stores/auth';

	import BaseInput from '$lib/components/Inputs/BaseInput.svelte';
	import { onMount } from 'svelte';
	import { ppost, ppostWithFile, pput, pputWithFile } from '$lib/utils/fetch';
	import { getErrorMessage } from '$lib/utils/response';
	import Flatpickr from 'svelte-flatpickr';
	import 'flatpickr/dist/flatpickr.css';
	import 'flatpickr/dist/themes/light.css';
	import * as yup from 'yup';
	import { getMsgRequired } from '$lib/utils/message';
	let errors: any = {};
	let avatarInput: FileList;
	let formData: UserDetailBase;
	const schemaValidator = yup.object().shape({
		first_name: yup.string().typeError(getMsgRequired('Tên')).required(getMsgRequired('Tên')),
		last_name: yup.string().typeError(getMsgRequired('Họ')).required(getMsgRequired('Họ')),
		sex: yup.string().typeError(getMsgRequired('Giới tính')).required(getMsgRequired('Giới tính')),
		dob: yup.string().typeError(getMsgRequired('Ngày sinh')).required(getMsgRequired('Ngày sinh')),
		phone: yup
			.string()
			.typeError(getMsgRequired('Số điện thoại'))
			.required(getMsgRequired('Số điện thoại')),
		address: yup.string().typeError(getMsgRequired('Địa chỉ')).required(getMsgRequired('Địa chỉ'))
	});
	onReset();
	function onReset() {
		if ($authStore?.user_detail) {
			console.log($authStore);
			formData = { ...$authStore.user_detail };
			delete formData.avatar_url;
		} else {
			formData = {
				first_name: '',
				last_name: '',
				dob: '',
				phone: '',
				post_code: '',
				city_name: '',
				province_name: '',
				address: '',
				age: 18,
				user_id: $authStore?.id,
				sex: 'Nam',
				target: '0'
			};
		}
	}
	onMount(() => {});
	async function handleSubmit() {
		errors = {};
		window.openLoading();
		try {
			await schemaValidator.validate({ ...formData }, { abortEarly: false });
			let res;
			const formDataInput = new FormData();
			if (avatarInput) {
				let file = avatarInput[0];
				formDataInput.append('avatar_url', file);
			}
			for (const key in formData) {
				formDataInput.append(key, formData[key]);
			}
			if ($authStore?.user_detail) {
				res = await pputWithFile(`user-detail/${$authStore?.id}`, formDataInput);
			} else {
				res = await ppostWithFile(`user-detail`, formDataInput);
			}
			if (res.ok) {
				const data: { results: UserDetail } = await res.json();
				authStore.update((s) => {
					if (s) {
						s.user_detail = data.results;
					}
					return s;
				});
				window.notice({
					text: 'Cập nhật hồ sơ thành công',
					type: 'success'
				});
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

	const flatpickrOptions = {
		enableTime: false,
		onChange: (selectedDates, dateStr, instance) => {}
	};

	function handleChangeDOB(event: CustomEvent<[Date, string]>) {
		if (event.detail[1]) {
			formData.dob = event.detail[1];
		}
	}
</script>

<form action="" on:submit|preventDefault={handleSubmit}>
	<div class="pl-lg-4">
		<div class="row">
			<div class="col-lg-6">
				<BaseInput
					type="text"
					label="Username"
					placeholder="Username"
					disabled
					value={$authStore?.name || ''}
				/>
			</div>
			<div class="col-lg-6">
				<BaseInput
					type="email"
					label="Email"
					placeholder="mike@email.com"
					disabled
					value={$authStore?.email || ''}
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-6">
				<BaseInput
					type="text"
					error={errors.first_name}
					label="Tên"
					bind:value={formData.first_name}
				/>
			</div>
			<div class="col-lg-6">
				<BaseInput
					type="text"
					label="Họ"
					error={errors.last_name}
					bind:value={formData.last_name}
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-6">
				<BaseInput label="Giới tính *" error={errors.sex}>
					<select class="form-control" bind:value={formData.sex}>
						<option value="Nam">Nam</option>
						<option value="Nữ">Nữ</option>
						<option value="Khác">Khác</option>
					</select>
				</BaseInput>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-6">
				<BaseInput
					type="text"
					label="Ngày sinh*"
					error={errors.dob || ''}
					bind:value={formData.dob}
					required
				>
					<Flatpickr
						options={flatpickrOptions}
						class="form-control datepicker bg-white"
						value={formData.dob}
						dateFormat="d/m/Y"
						placeholder="01/01/2022"
						on:change={handleChangeDOB}
					/>
				</BaseInput>
			</div>
			<div class="col-lg-6">
				<BaseInput
					error={errors.phone || ''}
					type="text"
					label="Số Điện thoại*"
					placeholder="0123456789"
					bind:value={formData.phone}
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-6">
				<BaseInput
					type="text"
					label="Mã bưu điện*"
					error={errors.post_code}
					bind:value={formData.post_code}
				/>
			</div>
			<div class="col-lg-6">
				<BaseInput
					type="text"
					label="Tỉnh/ Thành phố"
					error={errors.city_name}
					bind:value={formData.city_name}
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-6">
				<BaseInput
					type="text"
					label="Quận huyện"
					error={errors.province_name}
					bind:value={formData.province_name}
				/>
			</div>
			<div class="col-lg-6">
				<BaseInput
					error={errors.address}
					type="text"
					label="Địa chỉ*"
					placeholder="22 Lý Tự Trọng"
					bind:value={formData.address}
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-6">
				<BaseInput label="Ảnh đại diện">
					<input type="file" bind:files={avatarInput} />
				</BaseInput>
			</div>
		</div>
	</div>

	<div class="text-right">
		<button class="btn btn-success">Cập nhật thông tin</button>
	</div>
</form>

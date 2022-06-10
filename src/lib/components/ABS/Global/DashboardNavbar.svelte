<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { authStore } from '$lib/stores/auth';
	import { getAvatar, logout } from '$lib/utils/user';
	import { redirect } from '$lib/utils/redirect';
	import { attribute_to_object, onMount } from 'svelte/internal';
	import BaseNav from '$lib/components/Navbar/BaseNav.svelte';
	import BaseDropdown from '$lib/components/BaseDropdown.svelte';
	import { ppost } from '$lib/utils/fetch';
	import { getCookie, setCookie } from '$lib/utils/cookies';
	import Image from '../Image.svelte';
	export let prefixUrl: string = "/agent";
	const dispatch = createEventDispatcher();

	const Clicked = () => {
		dispatch('click');
	};

	export let type = 'default';

	let activeNotifications = false;
	let showMenu = false;
	let searcModalVisible = false;
	let searchQuery = '';
	export let showSidebar = false;

	onMount(() => {
		if (document.body.classList.contains('g-sidenav-hidden')) {
			showSidebar = false;
		} else {
			showSidebar = true;
		}

		window.addEventListener('resize', function () {
			if (document.body.classList.contains('g-sidenav-hidden')) {
				showSidebar = false;
			} else {
				showSidebar = true;
			}
		});
	});

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function toggleNotificationDropDown() {
		activeNotifications = !activeNotifications;
	}

	function closeDropDown() {
		activeNotifications = false;
	}

	function displaySidebar() {
		showSidebar = !showSidebar;
		if (showSidebar === true) {
			if (document.body.classList.contains('g-sidenav-hidden')) {
				document.body.classList = 'g-sidenav-pinned g-sidenav-show';
			}
		} else {
			document.body.classList = 'g-sidenav-hidden';
		}
	}

	function toggleSidebar() {
		displaySidebar();
		Clicked();
	}

	function hideSidebar() {
		showSidebar = false;
	}

	async function onLogout() {
		window.openLoading();
		const res = await ppost('logout', {});
		if (!res.ok) {
			window.notice({
				text: 'Có lỗi xảy ra',
				type: 'danger'
			});
		} else {
			setCookie('token', '', 0);
			// await fetch('/logout.json', {
			// 	method: 'POST',
			// 	body: JSON.stringify({}),
			// 	headers: {
			// 		Authorization: `Bearer ${getCookie('token')}`
			// 	}
			// });
			// redirect('/auth/login');
			window.location.href = '/';
		}

		window.closeLoading();
	}
</script>

<BaseNav
	containerClasses="container-fluid"
	topClasses="navbar-top border-bottom navbar-expand {type === 'default' ? 'navbar-dark' : ''}"
	{type}
	menuClasses="navbar-collapse collapse"
	position="top"
	show={true}
>
	<!-- Search form -->
	<form
		class="navbar-search form-inline mr-sm-3 {type === 'default' ? 'navbar-search-light' : ''}
      {type === 'light' ? 'navbar-search-dark' : ''}"
		id="navbar-search-main"
	>
		<fieldset class="form-group mb-0">
			<div tabindex="-1" role="group" class="bv-no-focus-ring">
				<div
					role="group"
					class="input-group input-group-alternative input-group-merge"
					style="background-color:#333333;color: white"
				>
					<div class="input-group-prepend">
						<span class="input-group-text">
							<i class="fas fa-search" style="color:white" />
						</span>
					</div>
					<input
						type="text"
						placeholder="Tìm kiếm"
						class="form-control"
						style="color: white"
						id="search-input"
					/>
				</div>
			</div>
		</fieldset>
		<button
			type="button"
			class="close"
			data-action="search-close"
			data-target="#navbar-search-main"
			aria-label="Close"
		>
			<span aria-hidden="true">×</span>
		</button>
	</form>
	<!-- Navbar links -->
	<ul class="navbar-nav align-items-center ml-md-auto">
		<!-- This item dont have <b-nav-item> because they add class 'nav-link' which is not needed here -->
		<li class="nav-item d-xl-none">
			<!-- Sidenav toggler -->
			<div
				class="pr-3 sidenav-toggler {type === 'default' ? 'sidenav-toggler-dark' : ''}
          {type === 'light' ? 'sidenav-toggler-light' : ''}
          {showSidebar === true ? 'active' : ''}"
				on:click={toggleSidebar}
			>
				<div class="sidenav-toggler-inner">
					<i class="sidenav-toggler-line" />
					<i class="sidenav-toggler-line" />
					<i class="sidenav-toggler-line" />
				</div>
			</div>
		</li>
		<!-- This item dont have <b-nav-item> because item have data-action/data-target on tag <a>, wich we cant add -->
		<li class="nav-item d-sm-none">
			<a class="nav-link" href="/" data-action="search-show" data-target="#navbar-search-main">
				<i class="ni ni-zoom-split-in" />
			</a>
		</li>
	</ul>
	<ul class="align-items-center ml-auto ml-md-0 navbar-nav">
		<BaseDropdown
			menuOnRight
			tagClasses="nav-item"
			tag="li"
			titleTag="a"
			titleClasses="nav-link pr-0"
			isOpen="false"
		>
			<a href="#!" class="nav-link pr-0" slot="title-container">
				<div class="media align-items-center">
					<span class="avatar avatar-sm rounded-circle">
						<Image src={getAvatar($authStore) || '../../img/theme/team-4.jpg'} />
					</span>
					<div class="media-body ml-2 d-none d-lg-block">
						<span class="mb-0 text-sm font-weight-bold" style="color: #333333;"
							>{$authStore?.user_detail?.first_name || $authStore?.name}</span
						>
					</div>
				</div>
			</a>

			<div class="dropdown-header noti-title">
				<h6 class="text-overflow m-0">Xin chào!</h6>
			</div>
			<a class="dropdown-item" href="{prefixUrl}/profile">
				<i class="ni ni-single-02" />
				<span>Hồ sơ</span>
			</a>
			<div class="dropdown-item" href="#!">
				<i class="ni ni-settings-gear-65" />
				<span>Cấu hình</span>
			</div>
			<div class="dropdown-item" href="#!">
				<i class="ni ni-calendar-grid-58" />
				<span>Hoạt động</span>
			</div>
			<div class="dropdown-item" href="#!">
				<i class="ni ni-support-16" />
				<span>Hỗ trợ</span>
			</div>
			<div class="dropdown-divider" />
			<div class="dropdown-item" on:click={onLogout} href="#!">
				<i class="ni ni-user-run" />
				<span>Đăng xuất</span>
			</div>
		</BaseDropdown>
	</ul>
</BaseNav>

<style>
	input#search-input::placeholder {
		color: #ffffff;
	}
</style>

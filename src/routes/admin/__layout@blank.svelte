<script lang="ts" context="module">
	export const load: Load = async ({ fetch, session, url }) => {
		const myAgent = getMyAgent(session.user);
		if (!session.user || myAgent) {
			redirect('/');
		}
		return {
			props: {
				pathname: url.pathname
			}
		};
	};
</script>

<script lang="ts">
	import DashboardNavbar from '$lib/components/ABS/Global/DashboardNavbar.svelte';
	import Notification from '$lib/components/ABS/Notification.svelte';
	import SideBar from '$lib/components/SidebarPlugin/SideBar.svelte';
	import SideBarItem from '$lib/components/SidebarPlugin/SideBarItem.svelte';
	import Notifications from 'svelte-notifications';
	import CustomNotification from '$lib/components/NotificationPlugin/CustomNotification.svelte';
	import { onMount } from 'svelte';
	import ContentFooter from '$lib/components/ABS/Global/ContentFooter.svelte';
	import type { Load } from '@sveltejs/kit';
	import { redirect } from '$lib/components/redirect.svelte';
	import Loading from '$lib/components/ABS/Loading.svelte';
	import { getMyAgent } from '$lib/utils/user';

	export let type = 'default';

	let toggle = false;
	let sideBarToggle = true;
	export let pathname: string;

	onMount(() => {
		document.body.classList.remove('bg-default');
	});

	function changeToggle() {
		if (document.body.classList.contains('g-sidenav-hidden')) {
			toggle = false;
			sideBarToggle = false;
		} else {
			toggle = true;
			sideBarToggle = true;
			if (window.innerWidth < 1200) {
				let collapse = document.getElementsByClassName('sidebarcollapse');
				for (var i = 0; i < collapse.length; i++) {
					collapse[i].classList.remove('d-none');
				}
			}
		}
	}

	function checkMenuActive(
		path: string,
		currentPath: string,
		isContains: boolean = false
	): boolean {
		if (path === currentPath && !isContains) {
			return true;
		} else if (currentPath.includes(path) && isContains === true) {
			return true;
		}
		return false;
	}
</script>

<Notifications item={CustomNotification}>
	<div class="wrapper">
		<!-- sidebar component  -->
		<SideBar toggle={sideBarToggle} on:click={changeToggle}>
			<ul class="navbar-nav" slot="links" id="navbar-nav">
				<SideBarItem
					link={{
						name: 'Trang chủ',
						icon: 'ni ni-shop',
						path: '/admin',
						isActive: checkMenuActive('/admin', pathname)
					}}
				/>

				<SideBarItem
					link={{
						name: 'Nội dung con số',
						icon: 'ni ni-ui-04',
						isActive: checkMenuActive('/admin/numerology', pathname, true)
					}}
				>
					<SideBarItem
						link={{
							name: 'Danh mục',
							path: '/admin/numerology/categories',
							isActive: checkMenuActive('/admin/numerology/categories', pathname, true)
						}}
					/>
					<SideBarItem
						link={{
							name: 'Con số',
							path: '/admin/numerology/numbers',
							isActive: checkMenuActive('/admin/numerology/numbers', pathname, true)
						}}
					/>
				</SideBarItem>

				<SideBarItem
					link={{
						name: 'Chuyển báo cáo',
						icon: 'ni ni-ungroup',
						path: '/admin/transaction',
						isActive: checkMenuActive('/admin/transaction', pathname, true)
					}}
				/>

				<SideBarItem
					link={{
						name: 'Cáo cáo',
						icon: 'ni ni-ui-04',
						path: '/admin/reports',
						isActive: checkMenuActive('/admin/reports', pathname, true)
					}}
				/>

				<SideBarItem
					link={{
						name: 'Đại lý',
						icon: 'ni ni-align-left-2',
						path: '/admin/agents',
						isActive: checkMenuActive('/admin/agents', pathname, true)
					}}
				/>
				<SideBarItem
					link={{
						name: 'Danh sách gói',
						icon: 'ni ni-single-copy-04',
						path: '/admin/packages',
						isActive: checkMenuActive('/admin/packages', pathname, true)
					}}
				/>
				<SideBarItem
					link={{
						name: 'Lịch sử xuất MAP',
						icon: 'ni ni-folder-17',
						path: '/admin/transaction/map-publishing',
						isActive: checkMenuActive('/admin/transaction/map-publishing', pathname, true)
					}}
				/>
				<SideBarItem
					link={{
						name: 'FAQs',
						icon: 'ni ni-support-16',
						path: '/admin/faqs',
						isActive: checkMenuActive('/admin/faqs', pathname, true)
					}}
				/>
				<SideBarItem
					link={{
						name: 'Hỗ trợ',
						icon: 'ni ni-spaceship',
						path: '/admin/support-information',
						isActive: checkMenuActive('/admin/support-information', pathname, true)
					}}
				/>
				<SideBarItem
					link={{
						name: 'Cài đặt',
						icon: 'ni ni-settings-gear-65',
						path: '/admin/settings',
						isActive: checkMenuActive('/admin/settings', pathname, true)
					}}
				/>
			</ul>
		</SideBar>
		<div class="main-content">
			<DashboardNavbar {type} showSidebar={toggle} on:click={changeToggle} prefixUrl="/admin" />
			<!-- your content here -->
			<slot />
			<ContentFooter />
		</div>
	</div>
	<Notification />
	<Loading />
</Notifications>

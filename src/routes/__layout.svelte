<script lang="ts">
	import BaseNav from '$lib/components/Navbar/BaseNav.svelte';
	import Notification from '$lib/components/ABS/Notification.svelte';
	import { onMount } from 'svelte';

	import Notifications from 'svelte-notifications';
	import CustomNotification from '$lib/components/NotificationPlugin/CustomNotification.svelte';
	import Loading from '$lib/components/ABS/Loading.svelte';
import { appDescription, appName } from '$lib/env';
	// export let backgroundColor = "black";
	let showMenu = false;
	let menuTransitionDuration = 250;
	let pageTransitionDuration = 200;
	let year = new Date().getFullYear();
	export let noBodyBackground;
	export let currentRoute;
	onMount(() => {
		updateBackground();
		window.addEventListener('resize', () => {
			if (window.innerWidth > 992) {
				showMenu = true;
			} else {
				showMenu = false;
			}
		});
	});

	function toggleNavbar() {
		document.body.classList.toggle('nav-open');
		showMenu = !showMenu;
		if (showMenu === true) {
			showMenu = false;
		}
	}

	function closeMenu() {
		document.body.classList.remove('nav-open');
		showMenu = false;
	}

	function setBackgroundColor() {
		document.body.classList.add('bg-default');
	}

	function removeBackgroundColor() {
		document.body.classList.remove('bg-default');
	}

	function updateBackground() {
		// if (noBodyBackground) {
		// 	setBackgroundColor();
		// } else {
		// 	removeBackgroundColor();
		// }
	}
</script>
<svelte:head>
	<title>{appName || ''}</title>
	<meta name="description" content={appDescription || ''} />
</svelte:head>

<Notifications item={CustomNotification}>
	<div>
		<BaseNav
			model="showMenu"
			type="light"
			transparent="true"
			menuClasses="justify-content-end navbar-collapse"
			topClasses="navbar-horizontal navbar-main"
			show={showMenu === false ? false : true}
			expand="lg"
		>
			<div slot="brand" class="navbar-wrapper">
				<a class="navbar-brand" href="/">
					<img src="../img/brand/logo.png" alt="navbar brand" />
				</a>
			</div>

			<div class="navbar-collapse-header">
				<div class="row">
					<div class="col-6 collapse-brand">
						<a href="/">
							<img src="../img/brand/logo.png" alt="image" />
						</a>
					</div>
					<div class="col-6 collapse-close">
						<button type="button" class="navbar-toggler" on:click={() => toggleNavbar()}>
							<span />
							<span />
						</button>
					</div>
				</div>
			</div>
			<hr class="d-lg-none" />
		</BaseNav>

		<div class="main-content">
			<slot />
		</div>

		<footer class="py-5" id="footer-main">
			<div class="container">
				<div class="row align-items-center justify-content-xl-between">
					<div class="col-xl-6">
						<div class="copyright text-center text-xl-left text-muted">
							© {year}
							<a
								href="https://absoltech.vn/"
								class="font-weight-bold ml-1"
								target="_blank"
								style="color:#2DCE89"
							>
								Tre Viet JSC - Hỗ trợ bởi ABSoltech
							</a>
						</div>
					</div>
					<div class="col-xl-6" />
				</div>
			</div>
		</footer>
	</div>
	<Notification />
	<Loading />
</Notifications>

<style lang="scss">
	@keyframes zoomIn8 {
		from {
			opacity: 0;
			transform: scale3d(0.8, 0.8, 0.8);
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes zoomOut8 {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
			transform: scale3d(0.8, 0.8, 0.8);
		}
	}
</style>

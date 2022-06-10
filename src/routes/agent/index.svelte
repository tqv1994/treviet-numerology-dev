<script lang="ts" context="module">
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';

	// Components
	import RouteBreadCrumb from '$lib/components/Breadcrumb/RouteBreadcrumb.svelte';
	import StatsCard from '$lib/components/Cards/StatsCard.svelte';
	import Card from '$lib/components/Cards/Card.svelte';
	import BaseHeader from '$lib/components/BaseHeader.svelte';

	// charts
	// import FusionCharts from 'fusioncharts';
	// import Charts from 'fusioncharts/fusioncharts.charts';
	// import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
	// import CandyTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
	// import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
	export let name = 'Trang chủ';
	import { onMount } from 'svelte';
	import AgentList from '$lib/components/ABS/Agent/AgentList.svelte';
	import type { DataTableAgentList } from '$lib/components/ABS/Agent/AgentList.svelte';
	import AgentLevelTable from '$lib/components/ABS/Agent/AgentLevelTable.svelte';
	import type { DataTableAgenctLevel } from '$lib/components/ABS/Agent/AgentLevelTable.svelte';
	import { appName } from '$lib/env';
	onMount(function () {
		// window.fusionCharts = FusionCharts;
		// window.charts = Charts;
		// window.fusionTheme = FusionTheme;
		// window.candyTheme = CandyTheme;
		// fcRoot(window.fusionCharts, window.charts, window.fusionTheme, window.candyTheme);
		let topmenu = document.getElementsByTagName('nav').item(0);
		topmenu.classList.add('navbar-dark');
		topmenu.classList.remove('navbar-light');
		let search = document.getElementsByTagName('form').item(0);
		search.classList.remove('navbar-search-dark');
		search.classList.add('navbar-search-light');
		window.addEventListener('resize', function () {
			lineChartConfig = {
				type: 'spline',
				width: '100%',
				height: '370',
				renderAt: 'chart-container',
				dataSource: line
			};
			barChartConfig = {
				type: 'column2d',
				width: '100%',
				height: '370',
				renderAt: 'chart-container',
				dataSource: bigLineChart.barData
			};
		});
	});

	let line = '';

	let bigLineChart = {
		activeIndex: 0,
		monthdata: {
			chart: {
				showValues: '0',
				theme: 'candy'
			},
			colorrange: {
				minvalue: '0',
				code: '#5E72E4',
				gradient: '1',
				color: [
					{
						minvalue: '0',
						maxvalue: '70',
						color: '#5E72E4'
					}
				]
			},
			data: [
				{
					label: 'May',
					value: '0'
				},
				{
					label: 'Jun',
					value: '20'
				},
				{
					label: 'Jul',
					value: '10'
				},
				{
					label: 'Aug',
					value: '30'
				},
				{
					label: 'Sep',
					value: '15'
				},
				{
					label: 'Oct',
					value: '40'
				},
				{
					label: 'Nov',
					value: '20'
				},
				{
					label: 'Dec',
					value: '60'
				}
			]
		},
		weekdata: {
			chart: {
				showValues: '0',
				theme: 'candy'
			},
			colorrange: {
				minvalue: '0',
				code: '#5E72E4',
				gradient: '1',
				color: [
					{
						minvalue: '0',
						maxvalue: '70',
						color: '#5E72E4'
					}
				]
			},
			data: [
				{
					label: 'May',
					value: '0'
				},
				{
					label: 'Jun',
					value: '20'
				},
				{
					label: 'Jul',
					value: '5'
				},
				{
					label: 'Aug',
					value: '25'
				},
				{
					label: 'Sep',
					value: '10'
				},
				{
					label: 'Oct',
					value: '30'
				},
				{
					label: 'Nov',
					value: '15'
				},
				{
					label: 'Dec',
					value: '40'
				}
			]
		},
		barData: {
			chart: {
				theme: 'fusion'
			},
			data: [
				{
					label: 'Jul',
					value: '25',
					color: '#FB6340'
				},
				{
					label: 'Aug',
					value: '20',
					color: '#FB6340'
				},
				{
					label: 'Sep',
					value: '30',
					color: '#FB6340'
				},
				{
					label: 'Oct',
					value: '22',
					color: '#FB6340'
				},
				{
					label: 'Nov',
					value: '17',
					color: '#FB6340'
				},
				{
					label: 'Dec',
					value: '19',
					color: '#FB6340'
				}
			]
		}
	};

	line = bigLineChart.monthdata;

	let lineChartConfig = {
		type: 'spline',
		width: '100%',
		height: '370',
		renderAt: 'chart-container',
		dataSource: line
	};

	let barChartConfig = {
		type: 'column2d',
		width: '100%',
		height: '370',
		renderAt: 'chart-container',
		dataSource: bigLineChart.barData
	};

	const updateChart = (index) => {
		if (index === 0) {
			line = bigLineChart.monthdata;
			bigLineChart.activeIndex = 1;
		} else {
			line = bigLineChart.weekdata;
			bigLineChart.activeIndex = 0;
		}

		lineChartConfig = {
			type: 'spline',
			width: '1000',
			height: '370',
			renderAt: 'chart-container',
			dataSource: line
		};
	};

	let agentList: DataTableAgentList[] = [
		{
			name: 'Micheal Ballack',
			image: '../img/theme/team-1.jpg',
			sales: '4,569',
			unique: '340',
			bounceRate: '46,53%',
			bounceRateDirection: 'up',
			progress: 60,
			progressType: 'gradient-danger'
		},
		{
			name: 'Micheal Ballack',
			image: '../img/theme/team-1.jpg',
			sales: '3,985',
			unique: '319',
			bounceRate: '46,53%',
			bounceRateDirection: 'down',
			progress: 30,
			progressType: 'gradient-primary'
		},
		{
			name: 'Micheal Ballack',
			image: '../img/theme/team-1.jpg',
			sales: '3,513',
			unique: '294',
			bounceRate: '36,49%',
			bounceRateDirection: 'down',
			progress: 80,
			progressType: 'gradient-info'
		},
		{
			name: 'Micheal Ballack',
			image: '../img/theme/team-1.jpg',
			sales: '2,050',
			unique: '147',
			bounceRate: '50,87%',
			bounceRateDirection: 'up',
			progress: 40,
			progressType: 'gradient-danger'
		},
		{
			name: 'Micheal Ballack',
			image: '../img/theme/team-1.jpg',
			sales: '1,795',
			unique: '190',
			bounceRate: '46,53%',
			bounceRateDirection: 'down',
			progress: 70,
			progressType: 'gradient-info'
		}
	];

	let agentLevelData: DataTableAgenctLevel[] = [
		{
			name: 'Gói 1',
			report_number: 1,
			expense: 2000000,
			duration: '1 năm',
			color: 'success'
		},
		{
			name: 'Gói 5',
			report_number: 5,
			expense: 5000000,
			duration: '1 năm',
			color: 'warning'
		},
		{
			name: 'Gói 25',
			report_number: 25,
			expense: 12000000,
			duration: '1 năm',
			color: 'danger'
		},
		{
			name: 'Gói 125',
			report_number: 125,
			expense: 32000000,
			duration: '1 năm',
			color: 'primary'
		},
		{
			name: 'Gói 625',
			report_number: 625,
			expense: 79000000,
			duration: '2 năm',
			color: 'default'
		}
	];
</script>

<svelte:head>
	<title>{appName || ''} - Trang chủ</title>
</svelte:head>
<div transition:fade={{ duration: 250 }}>
	<BaseHeader className="pb-6">
		<div class="row align-items-center py-4">
			<div class="col-lg-6 col-7">
				<h6 class="h2 text-black d-inline-block mb-0">Đại lý</h6>
				<nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
					<RouteBreadCrumb {name} />
				</nav>
			</div>
		</div>
		<!-- Card stats -->
		<div class="row">
			<div class="col-xl-3 col-md-6">
				<StatsCard
					title="Cấp độ hiện tại"
					type="gradient-red"
					image="../../img/icons/packages/package-1.png"
					imageClass="ml-6 mb--6"
					bodyClasses="bg-traffic"
				>
					<div slot="footer">
						<span class="text-dank mr-2"> Ngày tham gia </span>
						<div>
							<span class="text-nowrap">14/04/2022</span>
						</div>
					</div>
				</StatsCard>
			</div>
			<div class="col-xl-3 col-md-6">
				<StatsCard
					title="Doanh số cá nhân tháng"
					type="gradient-info"
					subTitle="160"
					icon="ni ni-chart-bar-32"
					bodyClasses="bg-revenue"
				>
					<div slot="footer">
						<span class="text-dank mr-2"> Chi tiết </span>
					</div>
				</StatsCard>
			</div>
			<div class="col-xl-3 col-md-6">
				<StatsCard
					title="Doanh số đại lý tháng"
					type="gradient-info"
					subTitle="50"
					icon="ni ni-chart-bar-32"
					bodyClasses="bg-revenue-agent"
				>
					<div slot="footer">
						<span class="text-dank mr-2"> Chi tiết </span>
					</div>
				</StatsCard>
			</div>
			<div class="col-xl-3 col-md-6">
				<StatsCard
					title="Tổng số đại lý trực thuộc"
					type="gradient-info"
					subTitle="2000"
					icon="ni ni-chart-pie-35"
					bodyClasses="bg-sum-agent"				>
					<div slot="footer">
						<span class="text-dank mr-2"> Chi tiết </span>
					</div>
				</StatsCard>
			</div>
		</div>
	</BaseHeader>

	<!--Charts-->
	<div class="container-fluid mt--6">
		<div class="row">
			<div class="col-xl-6">
				<Card headerClasses="bg-transparent" background="true">
					<div class="row align-items-center" slot="header">
						<div class="col">
							<h6 class="text-light text-uppercase ls-1 mb-1">doanh số</h6>
							<h5 class="h3 text-white mb-0">Đại lý</h5>
						</div>
					</div>
					<!-- <SvelteFC {...lineChartConfig} /> -->
				</Card>
			</div>
			<div class="col-xl-6">
				<Card headerClasses="bg-transparent">
					<div class="row align-items-center" slot="header">
						<div class="col">
							<h6 class="text-uppercase text-muted ls-1 mb-1">Doanh số</h6>
							<h5 class="h3 mb-0">Cá nhân</h5>
						</div>
					</div>
					<!-- <SvelteFC {...barChartConfig} /> -->
				</Card>
			</div>
		</div>
		<!-- End charts-->
		<!--Tables-->
		<div class="row">
			<div class="col-xl-8">
				<AgentList tableData={agentList} />
			</div>
			<div class="col-xl-4">
				<AgentLevelTable tableData={agentLevelData} />
			</div>
		</div>
	</div>
</div>
<style>
	.background-stats{
		background-color: red
	}

	.bg-traffic{
		background-color: red;
	}
</style>
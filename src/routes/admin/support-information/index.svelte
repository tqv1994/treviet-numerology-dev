<script lang="ts" context="module">
	export const load: Load = async ({ fetch, session, url }) => {
		const keyword = url.searchParams.get('keyword') || '';
		const currentPage = url.searchParams.get('page') || 1;
		let faqDatas: DataWithPagination<Faq> | undefined;
		const res = await fetch(`/p/faqs?${objectToQueryString({ keyword, page: currentPage })}`);
		console.log(res);

		if (res.ok) {
			const data = await res.json();
			console.log('data', data);

			faqDatas = data.results.data;
		} else {
			const err = await res.json();
			console.error(err);
		}

		return {
			props: {
				keyword,
				currentPage,
				faqDatas
			}
		};
	};
</script>

<script lang="ts">
	import BaseHeader from '$lib/components/BaseHeader.svelte';
	import Card from '$lib/components/Cards/Card.svelte';
	import { fade } from 'svelte/transition';
	import { objectToQueryString } from '$lib/utils/string';
	import type { DataWithPagination } from '$lib/stores/type';
	import type { Load } from '@sveltejs/kit';
	import type { Faq } from '$lib/stores/faq';

	export let faqDatas: DataWithPagination<Faq>;
	export let keyword: string;
	export let currentPage: number;
	export let name = 'Quản trị';

	let questions = faqDatas;
	let listQuestion = addActiveListFaq(questions);

	function addActiveListFaq(questions) {
		return questions.map((item, index) => {
      let active = false;
      if (index == 0) {
        active = true;
      }
      return { ...item, active: active};
    });
	}

	let digitals = [
		{
			id: 1,
			name: 'Hỗ trợ trực tuyến',
			component: [
				{ name: 'Zalo Oficial Account', image: '/img/icons/social/zalo.png', link: '' },
				{ name: 'Messenger', image: '/img/icons/social/messenger.png', link: '' }
			]
		},

		{
			id: 2,
			name: 'Kênh truyền thông',
			component: [
				{ name: 'Youtube', image: '/img/icons/social/youtube.png', link: '' },
				{ name: 'Facebook', image: '/img/icons/social/facebook.png', link: '' },
				{ name: 'Website', image: '/img/icons/social/website.png', link: '' },
				{ name: 'Telegram', image: '/img/icons/social/telegram.png', link: '' }
			]
		},

		{
			id: 3,
			name: 'Cộng đồng của chúng tôi',
			component: [
				{ name: 'Group Facebook', image: '/img/icons/social/facebook.png', link: '' },
				{ name: 'Group Telegram', image: '/img/icons/social/telegram.png', link: '' }
			]
		}
	];
</script>

<div class="content" transition:fade={{ duration: 250 }}>
	<BaseHeader className="pb-2">
		<div class="row align-items-center py-4">
			<div class="col-7 col-lg-6">
				<h6 class="h2 d-inline-block mb-0">{name}</h6>

				<nav
					aria-label="breadcrumb"
					class="d-none d-md-inline-block ml-md-4"
					style="color: #2DCE89"
				>
					<span> - Thông tin hỗ trợ </span>
				</nav>
			</div>
			<div class="col-5 col-lg-6 text-right" />
		</div>
	</BaseHeader>
	<div class="container-fluid">
		<div class="card-wrapper">
			<Card>
				<!-- Card header -->
				<!-- Card body -->
				<div class="mt--2">
					{#each digitals as digital, i}
						{#if i == 2}
							<div class="text-systerm" id="">
								{digital.name} :
								{#each digital.component as social, j}
									<span class="ml-3"><img src={social.image} alt="" /> {social.name}</span>
								{/each}
							</div>
						{:else}
							<div class="text-systerm border-system" id="">
								{digital.name} :
								{#each digital.component as social, j}
									<span class="ml-3"><img src={social.image} alt="" /> {social.name}</span>
								{/each}
							</div>
						{/if}
					{/each}
				</div>
			</Card>

			<Card>
				<!-- Card header -->
				<h3 slot="header" class="mb-0">Câu hỏi thường gặp</h3>
				<!-- Card body -->
				<div class="mt-3">
					<div class="d-flex justify-content-center">
						<div class="question-card">
							<div class="question-content">
								{#each listQuestion as question}
									<div class="list-question" on:click={() => (question.active = !question.active)}>
										<div class={`question-item ${question.active ? 'active' : ''}`}>
											<div class="text-question-title">
												{question.question}
												{#if question.active}
													<svg
														width="18"
														height="3"
														viewBox="0 0 18 3"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M1.73145 1.23242H16.0025"
															stroke="#2DCE89"
															stroke-width="2"
															stroke-linecap="round"
															stroke-linejoin="round"
														/>
													</svg>
												{:else}
													<svg
														width="17"
														height="18"
														viewBox="0 0 17 18"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M8.73193 1.93042V16.2015"
															stroke="#170F49"
															stroke-width="2"
															stroke-linecap="round"
															stroke-linejoin="round"
														/>
														<path
															d="M1.59619 9.06616H15.8673"
															stroke="#170F49"
															stroke-width="2"
															stroke-linecap="round"
															stroke-linejoin="round"
														/>
													</svg>
												{/if}
											</div>
											<div class="text-question-content">
												{#if question.active}
													{question.answer}
												{/if}
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</Card>
			<!-- Input groups -->
		</div>
	</div>
</div>

<style>
	.text-systerm {
		font-weight: bold;
		padding: 13px;
	}
	.border-system {
		border-bottom: 2px solid rgba(0, 0, 0, 0.05);
	}

	.question-card {
		width: 657px;
	}
	.text-question-title {
		font-weight: bold;
		margin-bottom: 15px;
		cursor: pointer;
		width: 100%;
		display: flex;
		justify-content: space-between;
    align-items: center;
    font-size: 20px;
	}
	.text-question-content {
		font-weight: 400;
		line-height: 28px;
    font-size: 16px;
	}
	.question-item {
		width: 100%;
	}

	.active {
		color: #2dce89;
	}

	.list-question {
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
		padding-top: 25px;
		padding-bottom: 25px;
		font-weight: bold;
		margin-left: 20px;
	}

	.question-content {
		margin-bottom: 70px;
	}
</style>

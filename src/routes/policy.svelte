<script>
import { browser } from '$app/env';

	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
    function onLoad(){
        document.body.classList.add('bg-default');
    }
</script>
<svelte:window on:loadstart={onLoad}/>

<div in:scale={{ y: 200, duration: 500 }} out:scale={{ y: 200, duration: 100 }}>
	<div class="header bg-gradient-green py-7 py-lg-8 pt-lg-9">
		<div class="separator separator-bottom separator-skew zindex-100">
			<svg
				x="0"
				y="0"
				viewBox="0 0 2560 100"
				preserveAspectRatio="none"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
			>
				<polygon points="2560 0 2560 100 0 100" class="fill-default" />
			</svg>
		</div>
	</div>
	<div class="mt--8 pb-5 container">
		<div class="row justify-content-center">
			<div class="p-3 card-policy">
				<strong class="d-flex justify-content-center">ĐIỀU KHOẢN ĐẠI LÝ</strong>
				<br />
				<p>
					The standard Lorem Ipsum passage, used since the 1500s Lorem ipsum dolor sit amet,
					consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
					ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
					sunt in culpa qui officia deserunt mollit anim id est laborum. Section 1.10.32 of "de
					Finibus Bonorum et Malorum", written by Cicero in 45 BC Sed ut perspiciatis unde omnis
					iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
					eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
					explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
					quia consequunturh magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
					quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
					non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
					voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
					laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure
					reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum
					qui dolorem eum fugiat quo voluptas nulla pariatur?
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	.card-policy {
		background: #f7fafc;
		color: black;
		z-index: 0;
	}
</style>

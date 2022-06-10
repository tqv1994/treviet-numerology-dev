<script lang="ts">
	export let src: string;
	export let alt: string = '';
	export let ratio: string = '100%';
	export let width: string = "100%";
    let classNames: string | "" = "";
    export {classNames as class};
</script>

<div class="image {classNames}">
	<div class="image--cover" style="padding-top: {ratio}; width: {width}">
		<img {src} {alt} />
	</div>
</div>

<style lang="scss">
	.image {
        width: 100%;
        height: 100%;
		transition: opacity 0.3s, transform 0.3s, background-color 0.3s;
		display: inline-block;
		&--cover {
			position: relative;
			height: auto;
			overflow: hidden;
			padding-top: 100%;
			background-position: 50% 50%;
			background-size: cover;
			img {
				transition: filter 0.6s, opacity 0.6s, transform 0.6s, box-shadow 0.3s;
				right: 0;
				width: 100%;
				height: 100%;
				bottom: 0;
				left: 0;
				top: 0;
				position: absolute;
				object-position: 50% 50%;
				object-fit: cover;
				font-family: 'object-fit: cover;';
				max-width: 100%;
				margin: 0 auto;
			}
		}
	}
</style>

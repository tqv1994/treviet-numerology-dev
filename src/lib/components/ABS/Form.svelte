<script type="ts">
  let classNames: string | "";
  export let loading: boolean = false;
  export { classNames as class };
  export let role: string;
</script>

<form class="{classNames} {loading ? 'loading' : ''}" on:submit {role}>
  <slot />
</form>

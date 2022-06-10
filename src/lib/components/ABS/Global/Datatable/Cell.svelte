<script lang="ts">
    let classNames: string | undefined;
    let colspan: number;
    let rowspan: number;
    export { classNames as class };
</script>
<td {colspan} {rowspan} class={classNames}>
    <slot/>
</td>
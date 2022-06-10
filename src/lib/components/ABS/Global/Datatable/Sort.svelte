<script lang="ts" context="module">
  export type Sortable = string;
</script>

<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let name: string;
  export let sort: string;
  const dispatch = createEventDispatcher();
  function onClick() {
    if (getSortType() === "DESC") {
      sort = name;
    } else {
      sort = `-${name}`;
    }
    dispatch("sorting", <Sortable>sort);
  }

  function getSortType() {
    if (sort) {
      if (sort.indexOf("-") > -1) {
        return "DESC";
      } else {
        return "ASC";
      }
    }
    return undefined;
  }
  function getSortName(value: string) {
    if (value) {
      return value?.replace("-", "");
    }
    return undefined;
  }
</script>

<span class="caret-wrapper" on:click={onClick}>
  {#if getSortName(sort) == name && getSortType() === "ASC"}
    <i class="sort-caret ascending" />
  {:else if getSortName(sort) == name && getSortType() === "DESC"}
    <i class="sort-caret descending" />
  {:else}
    <i class="sort-caret ascending" />
    <i class="sort-caret descending" />
  {/if}
</span>

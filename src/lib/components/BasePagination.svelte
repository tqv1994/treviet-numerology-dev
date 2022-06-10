<script lang="ts">
import { afterUpdate, createEventDispatcher, onMount } from "svelte";
  export let pageCount: number = 0; //"Pagination page count. This should be specified in combination with perPage"
  export let perPage: number; //"Pagination per page. Should be specified with total or pageCount"
  export let total: number; //"Can be specified instead of pageCount. The page count in this case will be total/perPage"
  export let value: number; //"Pagination value"
  // export let size; //"Pagination size"
  export let align = "start"; // "Pagination alignment (e.g center|start|end)"
  export let currentPage = 1;
  export let pages;
  export let className: string | "" = "";
  let next = false;
  let items = [];
  const dispatch = createEventDispatcher();
  const changeCurrentPage = (page: number) => {
    if (page !== currentPage) {
      dispatch("change", page);
    }
  };
  if (pageCount === 0) {
    items = [];
    for (let i = 0; i < Math.ceil(total / perPage); i++) {
      items.push(i + 1);
    }
    if (value === total / perPage) {
      next = true;
    }
  } else {
    for (let i = 0; i < pages; i++) {
      items.push(i + 1);
    }
    if (value === pages) {
      next = true;
    }
  }

  function nextPage() {
    if (currentPage !== Math.ceil(total / perPage)) {
      changeCurrentPage(currentPage + 1);
    } else {
      currentPage = currentPage;
    }
  }

  function prevPage() {
    if (currentPage !== 1) {
      changeCurrentPage(currentPage - 1);
    } else {
      currentPage = currentPage;
    }
  }
</script>

<ul
  role="menubar"
  aria-disabled="false"
  aria-label="Pagination"
  class="pagination b-pagination {align !== ''
    ? `align-items-${align}`
    : ''} {className}"
>
  <li
    role="presentation"
    class="page-item {currentPage === 1 ? 'disabled' : ''}"
    on:click={() => prevPage()}
  >
    <a href="#!" class="page-link" aria-label="Previous">
      <span aria-hidden="true">
        <i class="fa fa-angle-left" aria-hidden="true" />
      </span>
    </a>
  </li>
  {#each Array(Math.ceil(total / perPage)) as _, item}
    <li
      role="presentation"
      class="page-item {item+1 === currentPage ? 'active' : ''}"
      on:click={() => {
        changeCurrentPage(item+1);
      }}
    >
      <button
        role="menuitemradio"
        type="button"
        aria-label="Go to page {item+1}"
        aria-checked="true"
        aria-posinset="1"
        aria-setsize="5"
        tabindex="0"
        class="page-link"
      >
        {item+1}
      </button>
    </li>
  {/each}
  <li
    role="presentation"
    class="page-item {currentPage === Math.ceil(total / perPage) ? 'disabled' : ''}"
    on:click={() => nextPage()}
  >
    <a href="#!" class="page-link" aria-label="Previous">
      <span aria-hidden="true">
        <i class="fa fa-angle-right" aria-hidden="true" />
      </span>
    </a>
  </li>
</ul>

<script lang="ts" context="module">
  export type TableColumn = {
    type?: "selection" | "text";
    prop?: string;
    label?: string;
    minWidth?: number;
    sortable?: boolean;
    padding?: string; 
    position?: string;
  };
</script>

<script lang="ts">
  import Card from "$lib/components/Cards/Card.svelte";
  import BaseCheckbox from "$lib/components/Inputs/BaseCheckbox.svelte";
  import Swal from "sweetalert2/dist/sweetalert2.js";
  export let name = "Paginated tables";
  import { createEventDispatcher, onMount } from "svelte";
  import { clickOutside } from "$lib/components/clickOutside.js";
  import type { DataWithPagination } from "$lib/stores/type";
  import BasePagination from "$lib/components/BasePagination.svelte";
  import Cell from "./Cell.svelte";
  import type { ReportFormData } from "$lib/stores/report";
  import Sort from "./Sort.svelte";
  import type {Sortable} from "./Sort.svelte";
  let formData: ReportFormData;
  export let search = true;
  export let searchTable = true;
  let suffix = false;
  let lengthMenu = [5, 10, 15, 50];
  let tableElement;
  export let filterHeardClass: string ;
  export let styleFilter: string ;
  export let classButton: string ;
  export let title: string | undefined;
  export let navTab: boolean | undefined;
  export let filterTime: boolean | undefined;
  export let createLabel: string;
  export let keyword: string;
  export let dataWithPagination: DataWithPagination<any> | undefined;
  export let sort: string;
  let perPage: number = dataWithPagination?.per_page || 10;
  let currentPage: number = dataWithPagination?.current_page || 1;
  const dispatch = createEventDispatcher();

  const onCreate = () => {
    dispatch("create");
  };
  export let tableColumns: TableColumn[] = [];
  let selectedRows = [];

  async function paginationChange(event: CustomEvent<number>) {
    dispatch("changeCurrentPage", event.detail);
  }

  function handleClickOutside(event) {
    suffix = false;
  }

  async function onSearch() {
    dispatch("search", keyword);
  }
  async function onSort(event: CustomEvent<Sortable>){
    dispatch("sorting",event.detail);
  }

  async function onChangePerPage(value: number) {
    perPage = value;
    dispatch("changePerPage", value);
  }
</script>

<div class="container-fluid custom-table">
  <div>
    <Card
      className="no-border-card"
      bodyClasses="px-0 pb-1"
      footerClasses="pb-2"
    >
      <div slot="header">
        <div class="row">
          {#if title}
            <div class="col-lg-6">
              <h3 class="mb-0">{title || ""}</h3>
            </div>
          {/if}

          {#if navTab == true}
          <div class="col-lg-6">
            <slot name="navTab"></slot>
          </div>
          {/if}

          {#if createLabel}
            <div class="col-lg-6 text-right {filterHeardClass}" style="{styleFilter}">
              <slot name="filterRadio"></slot>
              <slot name="filterTime"></slot>
              <button class="btn btn-success {classButton}" on:click={onCreate}>{createLabel}</button>
            </div>
          {/if}
          <slot name="header" />
        </div>
      </div>
      <div>
        <div
          class="col-12 d-flex justify-content-center
                justify-content-sm-between flex-wrap px-0">
          {#if searchTable == true}
          <div
            class="el-select select-primary pagination-select"
            use:clickOutside
            on:click_outside={handleClickOutside}
            style="padding-left: 15px;">
            <!---->
            <div
              class="el-input el-input--suffix {suffix === true
                ? 'is-focus'
                : ''}"
            >
              <!---->
              <input
                type="text"
                id="search"
                on:click={() => (suffix = true)}
                readonly="readonly"
                autocomplete="off"
                placeholder={perPage}
                class="el-input__inner text-dark"
                style="width: 76px; background: white;"
              />
              <!---->
              <span class="el-input__suffix">
                <span class="el-input__suffix-inner">
                  <i
                    class="el-select__caret el-input__icon el-icon-arrow-up {suffix ===
                    true
                      ? 'is-reverse'
                      : ''}"
                    style="margin-top: 3px;"
                  />
                  <!---->
                  <!---->
                </span>
                <!---->
              </span>
              <!---->
            </div>
            <div
              class="el-select-dropdown el-popper"
              style="display: {suffix === false ? 'none' : ''}; min-width:
                    210px;">
              <div class="el-scrollbar" style="">
                <div
                  class="el-select-dropdown__wrap el-scrollbar__wrap"
                  style="margin-bottom: -17px; margin-right: -17px;"
                >
                  <ul class="el-scrollbar__view el-select-dropdown__list">
                    <!---->
                    {#each lengthMenu as item}
                      <li
                        class="el-select-dropdown__item select-primary {perPage ===
                        item
                          ? 'selected'
                          : ''}"
                        on:click={()=>onChangePerPage(item)}
                      >
                        <span>{item}</span>
                      </li>
                    {/each}
                  </ul>
                </div>
                <div class="el-scrollbar__bar is-horizontal">
                  <div
                    class="el-scrollbar__thumb"
                    style="transform: translateX(0%);"
                  />
                </div>
                <div class="el-scrollbar__bar is-vertical">
                  <div
                    class="el-scrollbar__thumb"
                    style="transform: translateY(0%);"
                  />
                </div>
              </div>
              <!---->
            </div>
          </div>
          <div style="padding-right: 15px">
            <form on:submit|preventDefault={onSearch} style="display: flex;">
              <slot name="filter-form-content"></slot>
              <span placeholder="Tìm kiếm...">
                <div class="form-group">
                  <!---->
                  <div class="input-group {search == true ? 'focused' : ''}">
                    <slot name="label-search"></slot>
                    <input
                      on:focus={() => (search = true)}
                      on:blur={() => (search = false)}
                      type="text"
                      placeholder="Tìm kiếm..."
                      id="searchTable"
                      class="form-control"
                      valid="true"
                      bind:value={keyword} style="border: 1px solid #dee2e6;"
                    />
                    <!---->
                  </div>
                  <div class="valid-feedback" />
                  <!---->
                </div>
              </span>

            </form>
          </div>
          {/if}
          <table
            bind:this={tableElement}
            class="table table-responsive table-flush align-items-center
                  border-bottom-0 paginatedTable"
            style="width: 100%"
          >
            <thead class="thead-light">
              <tr>
                {#each tableColumns as column, i}
                  {#if column.type === "selection"}
                    <th
                      class="py-0 pr-0 text-left"
                      style="min-width: 48px; width: 5%; padding-left: 1.5rem;"
                    >
                      <BaseCheckbox />
                    </th>
                  {:else}
                    <th
                      class="py-0 {i === 1 ? 'pl-0' : ''}"
                      style="min-width: {column.minWidth}px; width: 10%; padding: {column.padding};{column.position}"
                    >
                      {column.label}
                      {#if column.sortable}
                        <Sort name={column.prop || ""} {sort} on:sorting={onSort}/>
                      {/if}
                    </th>
                  {/if}
                {/each}
              </tr>
            </thead>
            <tbody class="tbodyPaginated">
              {#if dataWithPagination}
                {#each dataWithPagination.data || [] as item, i}
                  <tr class="trPaginated">
                    {#each tableColumns as column}
                      {#if column.prop}
                        <Cell class="tdPaginated">
                          <slot
                            name="cell"
                            row={item}
                            cell={{
                              key: column.prop,
                              value: item[column.prop],
                            }}
                          >
                            {item[column.prop]}
                          </slot>
                        </Cell>
                      {:else if column.type === "selection"}
                        <td
                          colspan="1"
                          rowspan="1"
                          class="tdPaginated pr-0 text-left"
                        >
                          <BaseCheckbox />
                        </td>
                      {/if}
                    {/each}
                  </tr>
                {/each}
              {/if}
            </tbody>
          </table>
        </div>
      </div>
      <div class="table" slot="footer">
        {#if dataWithPagination && dataWithPagination.current_page}
          <BasePagination
            bind:currentPage={dataWithPagination.current_page}
            bind:perPage={dataWithPagination.per_page}
            bind:total={dataWithPagination.total}
            align="end"
            on:change={paginationChange}
          />
        {/if}
      </div>
    </Card>
  </div>
</div>

<style lang="scss">
  div {
    input#searchTable:focus,
    input#searchTable:active,
    input#searchTable:focus:active,
    input#searchTable:active:focus {
      transition: all 0.2s ease-in-out;
    }

    .thead-light {
      background: #f6f9fc;
      color: #8898aa;
      font-size: 0.65rem !important;
      text-transform: uppercase !important;
      letter-spacing: 1px !important;
      border-top: 1px solid #ebeef5;
    }

    tbody tr {
      border-top: 1px solid #ebeef5;
    }

    thead tr td {
      padding-top: 0px;
      padding-bottom: 0px;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      width: auto;
      min-width: auto;
      white-space: nowrap;
    }

    table tbody tr {
      transition: all 0.3s ease-in-out;
    }

    table tbody tr:hover {
      background-color: transparent !important;
      transition: all 0.3s ease-in-out;
    }

    table tbody tr :global(td) {
      width: auto;
      min-width: auto;
      white-space: nowrap;
      box-sizing: border-box;
      white-space: normal;
      line-height: 23px;
      text-align: left;
      color: #525f7f;
      font-size: 0.8125rem;
    }

    table.paginatedTable thead tr {
      border-bottom: 1px solid #ebeef5;
      border-top: 1px solid #ebeef5;
    }

    table.paginatedTable thead tr th,
    table.paginatedTable thead tr td {
      min-height: 40px;
      height: 40px;
      border-bottom: 1px solid #ebeef5;
      border-top: 1px solid #ebeef5;
    }

    table.paginatedTable tbody tr td,
    table.paginatedTable tbody tr th {
      min-height: 40px;
      height: 40px;
    }

    .tdPaginated {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    tbody.tbodyPaginated tr.trPaginated :global(td) {
      border-bottom: 1px solid #ebeef5;
    }

    .search-datetime {
      font-size: 0.9rem;
      color: black;
      font-weight: 500;
      margin-top: 3px;
    }
  }
</style>

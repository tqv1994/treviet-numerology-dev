<script lang="ts" context="module">
	export const load: Load = async ({ fetch, session, url }) => {
		const keyword = url.searchParams.get('keyword') || '';
		const currentPage = url.searchParams.get('page') || 1;
		let tranferDatas: DataWithPagination<Transfer> | undefined;
		const res = await fetch(`/p/transfers?${objectToQueryString({ keyword, page: currentPage })}`);
		if (res.ok) {
			const data = await res.json();
			tranferDatas = data.results;
		} else {
			const err = await res.json();
			console.error(err);
		}

		return {
			props: {
				keyword,
				currentPage,
				tranferDatas
			}
		};
	};
</script>

<script lang="ts">
    import XLSX from "xlsx";
    import {download} from "../../../../src/lib/utilities";
    import { fade } from "svelte/transition";
    import BaseHeader from '$lib/components/BaseHeader.svelte';
    export let name = "Quản trị";
    import { onMount } from "svelte";
    import type { Report } from "$lib/stores/report";
    import { getListReportsService } from "$lib/services/report.service";
    import type { DataWithPagination } from "$lib/stores/type";
    import Table from '$lib/components/ABS/Global/Datatable/Table.svelte';
    import type { TableColumn } from '$lib/components/ABS/Global/Datatable/Table.svelte';
    import BaseInput from '$lib/components/Inputs/BaseInput.svelte';
    import { redirect } from "$lib/utils/redirect";
    import type { Load } from "@sveltejs/kit";
    import { objectToQueryString } from "$lib/utils/string";
    import type { Transfer } from "$lib/stores/transfer";
    import Flatpickr from 'svelte-flatpickr';

    
    //   const urlParams = new URLSearchParams(window.location.search);
      let filterTime = true;

      export let tranferDatas: DataWithPagination<Transfer>;
      export let keyword: string;
      export let currentPage: number;
      onMount(async () => {
        // await getData();
        // let topmenu = document.getElementsByTagName("nav").item(0);
        // topmenu.classList.add("bg-danger");
        // topmenu.classList.add("navbar-dark");
        // topmenu.classList.remove("navbar-light");
        // let search = document.getElementsByTagName("form").item(0);
        // search.classList.remove("navbar-search-dark");
        // search.classList.add("navbar-search-light");
      });
      const flatpickrOptionsRange = {
      mode: 'range',
      enableTime: true,
      onChange: (selectedDates: Date, dateStr: string, instance: []) => {
        let keyConnect = ' to ';
        if (dateStr.includes(keyConnect)) {
          let listDateStr = dateStr.split(' to ');
          let fromDate = listDateStr[0];
          let toDate = listDateStr[1];
          getFilterDateData(fromDate, toDate);
        }
      }
    };


      let dates = {
      simple: new Date(),
      range: '2022-05-22 12:00 to 2022-06-21 12:00'
    };

      async function getFilterDateData(from_date: string, to_date: string) {
      window.openLoading();
      props = await getListFilterDateTransferService(from_date, to_date);
      window.closeLoading();
      }
      let tableColumns: TableColumn[] = [
        {
          type: "selection",
        },
        
        {
          prop: "agent_id",
          label: "Hệ thống",
          minWidth: 220,
          sortable: true,
        },
        {
          prop: "agent_transfer.agentname",
          label: "Đại lý",
          minWidth: 135,
          sortable: true,
        },
        {
          prop: "created_at",
          label: "Ngày",
          minWidth: 160,
          sortable: true,
        },
        {
          prop: "agent_transfer.sex",
          label: "Giới tính",
          minWidth: 160,
          sortable: true,
        },
        {
          prop: "agent_transfer.phone",
          label: "Điện thoại",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "agent_transfer.email",
          label: "Email",
          minWidth: 150,
          sortable: true,
        },
        
      ];
    
      async function paginationChange(event: CustomEvent<number>) {
        currentPage = event.detail;
        await getData();
      }
    
      async function onSearch(event: CustomEvent<string>) {
        keyword = event.detail;
        await getData();
      }

      async function onCreate() {
		    redirect('/dashboad/reports/create');
	    }

    
      async function getData() {
        window.openLoading();
        reportDatas = await getListReportsService({
          keyword,
          page: currentPage,
        });
        window.closeLoading();
      }
    </script>
    
    <div class="content" transition:fade={{ duration: 250 }}>
      <BaseHeader className="pb-2">
        <div class="row align-items-center py-4">
          <div class="col-7 col-lg-6">
            <h6 class="h2 d-inline-block mb-0">{name}</h6>
            <nav
              aria-label="breadcrumb"
              class="d-none d-md-inline-block ml-md-4"
              style="color: #2DCE89">
              <span> - Lịch sử xuất MAP </span>
            </nav>
          </div>
          <div class="col-5 col-lg-6 text-right" />
          
          </div>
      </BaseHeader>
        <Table
          title="Danh sách báo cáo"
          createLabel="Xuất excel"
          filterHeardClass="mt--4 ad-filter" classButton="mt-4"
          dataWithPagination={tranferDatas}
          {tableColumns}
          {keyword}
          {filterTime}
          on:create="{(_) => download(tableColumns, "example" + ".xlsx")}"
          on:changeCurrentPage={paginationChange}
          on:search={onSearch} styleFilter=""
        >
        <!-- <div slot="filterHeard">
  
        </div> -->
       
        
          <div slot="label-search">
            <p class="label-search mt-2 ml-4 mr-4">Search:</p>
          </div>
          <div slot="filter-form-content" class="filter-form-content">
            <div class="row form-group">
              <p class="search-datetime mt-2">Từ:</p>
              <div class="col-md-9 width-date-picker">
                <BaseInput>
                  <Flatpickr
                    options={flatpickrOptionsRange}
                    class="form-control datepicker bg-white"
                    defaultDate={dates.range}
                    placeholder={dates.range}
                    dateFormat="Y-m-d"
                  />
                </BaseInput>
              </div>
            </div>
          </div>
        
        
        <div slot="cell" let:row let:cell>
          {#if cell.key === "agent_id"}
            {row.agent ? row.agent.agentname : ""}
          {:else if cell.key === "agent_transfer.sex"}
            {row.agent_transfer ? row.agent_transfer.sex : ""}
          {:else if cell.key === "agent_transfer.phone"}
            {row.agent_transfer ? row.agent_transfer.phone : ""}
          {:else if cell.key === "agent_transfer.email"}
            {row.agent_transfer ? row.agent_transfer.email : ""}
          {:else if cell.key === "agent_transfer.agentname"}
            {row.agent_transfer ? row.agent_transfer.agentname : ""}
          {:else}
            {cell.value}
          {/if}
        </div>
      </Table>
    </div>
<style>
  .filter-form-content {
  display: flex;
  }

  .width-date-picker {
  min-width: 302px;
  }
  .filter-radio{
  margin-top: 40px;
  margin-right: 50px;
  }
  .custom-radio {
  margin-right: 10px;
  }
  .custom-label-checkbox::before {
  color: white;
  background-color:green;
  }
  .custom-radio:checked {
  color: green;
  background-color: green;
  }

  .search-datetime {
  margin-top:10px
  }
</style>
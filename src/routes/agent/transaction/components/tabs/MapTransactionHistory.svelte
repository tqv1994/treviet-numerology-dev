<script lang="ts">
  import { fade } from "svelte/transition";
  import BaseHeader from '$lib/components/BaseHeader.svelte';
  import { onMount } from "svelte";
  import type { Report } from "$lib/stores/report";
  import { getListReportsService } from "$lib/services/report.service";
  import type { DataWithPagination } from "$lib/stores/type";
  import Table from '$lib/components/ABS/Global/Datatable/Table.svelte';
  import type { TableColumn } from '$lib/components/ABS/Global/Datatable/Table.svelte';
  import { redirect } from "$lib/utils/redirect";

  import type { ReportFormData } from "$lib/stores/report";

  let formData: ReportFormData;
  import Card from "$lib/components/Cards/Card.svelte";
  import BaseInput from "$lib/components/Inputs/BaseInput.svelte";

  // const urlParams = new URLSearchParams(window.location.search);
  export let reportDatas: DataWithPagination<Report>;
  export let keyword: string;
  export let currentPage: number;
  import { createReportService } from "$lib/services/report.service";
  
  reset();
  function reset() {
    formData = {
      name: "",
      dob: "",
      phone: "",
      email: "",
      facode: "",
    };
  }

  let suffix = false;
  export let name = "Tạo báo cáo";

  async function onSubmit() {
    window.openLoading();
    try {
      await createReportService(formData);
      window.notice({
        text: "Tạo báo cáo thành công",
        type: "success",
      });
    } catch (err) {
      window.notice({
        text: err,
        type: "danger",
      });
    }
    window.closeLoading();
  }
  onMount(async () => {
    await getData();
    let topmenu = document.getElementsByTagName("nav").item(0);
    // topmenu.classList.add("bg-danger");
    topmenu.classList.add("navbar-dark");
    topmenu.classList.remove("navbar-light");
    let search = document.getElementsByTagName("form").item(0);
    search.classList.remove("navbar-search-dark");
    search.classList.add("navbar-search-light");
  });
  let tableColumns: TableColumn[] = [
    {
      type: "selection",
    },
    {
      prop: "created_at",
      label: "Ngày",
      minWidth: 160,
      sortable: true,
    },
    {
      prop: "agent_id",
      label: "Đại lý",
      minWidth: 220,
      sortable: true,
    },
    {
      prop: "name",
      label: "Họ và tên",
      minWidth: 135,
      sortable: true,
    },
    {
      prop: "phone",
      label: "Điện thoại",
      minWidth: 100,
      sortable: true,
    },
    {
      prop: "email",
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
  // function handleDelete(index, row) {
  //   Swal.fire({
  //     title: "Bạn có chắc chắn không?",
  //     text: `Bạn sẽ không thể hoàn nguyên điều này!`,
  //     type: "warning",
  //     showCancelButton: true,
  //     confirmButtonClass: "btn btn-success btn-fill",
  //     cancelButtonClass: "btn btn-danger btn-fill",
  //     confirmButtonText: "Vâng, xoá nó!",
  //     buttonsStyling: false,
  //   }).then((result) => {
  //     if (result.value) {
  //       deleteRow(row);
  //       Swal.fire({
  //         title: "Deleted!",
  //         text: `You deleted ${row.name}`,
  //         type: "success",
  //         confirmButtonClass: "btn btn-success btn-fill",
  //         buttonsStyling: false,
  //       });
  //     }
  //   });
  // }
  // function deleteRow(row) {
  //   let indexToDelete = tableData.findIndex(
  //     (tableRow) => tableRow.id === row.id
  //   );
  //   if (indexToDelete >= 0) {
  //     tableData.splice(indexToDelete, 1);
  //   }
  // }

  async function getData() {
    window.openLoading();
    reportDatas = await getListReportsService({
      keyword,
      page: currentPage,
    });
    window.closeLoading();
  }
</script>

<div class="content mt--6" transition:fade={{ duration: 250 }}>
  <Table
      createLabel="Xuất excel"
      dataWithPagination={reportDatas}
      {tableColumns}
      {keyword}
      navTab
      on:create={onCreate}
      on:changeCurrentPage={paginationChange}
      on:search={onSearch}>

      <div slot="label-search">
          <p class="label-search mt-2 ml-4 mr-4">
              Search:
          </p>
      </div>
      <div slot="filter-form-content" class="filter-form-content">
        <div class="row form-group">
          <p class="search-datetime mt-2">
            Từ:
          </p>
          <div class="col-md-9">
            <BaseInput
              type="datetime-local"
              value="2018-11-23T10:30:00"
              id="example-datetime-local-input" inputClasses="form-control datetime-input" styleInput="width:200px" />
          </div>
        </div>

        <div class="row form-group" style="margin-left: 25px">
          <p class="search-datetime mt-2">
            Đến:
          </p>
          <div class="col-md-9">
            <BaseInput
              type="datetime-local"
              value="2018-11-23T10:30:00"
              id="example-datetime-local-input" inputClasses="form-control datetime-input" styleInput="width:200px"/>
          </div>
        </div>
      </div>
      <div slot="cell" let:row let:cell>
          {#if cell.key === "agent_id"}
          {row.agent ? row.agent.agentname : ""}
          {:else}
          {cell.value}
          {/if}
      </div>
  </Table>
</div>
<style lang="scss">
    .text-systerm{
          color: 800000;
          font-size: 12px;
    }
    .filter-form-content{
          display: flex;
    }
    .badge-success {
      background-color: #1aae6f;
      color: white;
    }
  
</style>
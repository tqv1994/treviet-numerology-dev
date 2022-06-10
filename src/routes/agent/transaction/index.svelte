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
    import Tabs from "$lib/components/ABS/Tab/Tabs.svelte";
    import type { Tab } from "$lib/components/ABS/Tab/Tabs.svelte";
  
    import type { ReportFormData } from "$lib/stores/report";
  
    let formData: ReportFormData;
    import Card from "$lib/components/Cards/Card.svelte";
    import BaseInput from "$lib/components/Inputs/BaseInput.svelte";
  
    // const urlParams = new URLSearchParams(window.location.search);
    export let reportDatas: DataWithPagination<Report>;
    export let keyword: string;
    export let currentPage: number;
    import { createReportService } from "$lib/services/report.service";
    import ListMapTransferHistory from "./components/tabs/ListMapTransferHistory.svelte";
    import MapTransactionHistory from "./components/tabs/MapTransactionHistory.svelte";
    import ReceiveMapHistory from "./components/tabs/ReceiveMapHistory.svelte";
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

    let tabs: Tab[] = [
      { id: 1, name: "Lịch sử giao dịch MAP", component: MapTransactionHistory },
      { id: 2, name: "Lịch sử nhận MAP", component: ListMapTransferHistory },
      { id: 3, name: "Lịch sử chuyển MAP", component: ReceiveMapHistory },
    ];
    const flatpickrOptions = {
      enableTime: false,
      onChange: (selectedDates, dateStr, instance) => {},
    };
    function handleChange(selectedDates, dateStr, instance) {}
  
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
    <BaseHeader className="pb-6">
        <div class="row align-items-center py-4">
          <div class="col-7 col-lg-6">
            <h6 class="h2 d-inline-block mb-0">Đại lý</h6>
          </div>
          <div class="col-5 col-lg-6 text-right" />
        </div>
    </BaseHeader>
        <div class="container-fluid mt--6 mb-7">
            <div class="card-wrapper">
                <Card>
                    <!-- Card header -->
                    <h3 slot="header" class="mb-0">REF LINK</h3>
                    <!-- Card body -->
                    <form>
                    <!-- Input groups with icon -->
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="">
                                <BaseInput
                                placeholder="https://tgtholding.com/sign-up/vietthach.html"
                                bind:value={formData.phone}
                                />
                            </div>
                        </div>
                        <div class="col-lg-6">
                        <div class="text-left" style="float: left">
                            <button class="btn btn-success btn saveAsExcel" on:click={(_) => download(sheets, "example" + ".xlsx")}>Xuất map</button>
                        </div>
                        </div>

                    </div>
                    
                    </form>
                </Card>
                <!-- Input groups -->
            </div>
        </div>
        <div class="container-fluid mt--6 mb-7">
            <div class="card-wrapper">
                <Card>
                    <!-- Card header -->
                    <h3 slot="header" class="mb-0">Chuyển map cho đại lý</h3>
                    <!-- Card body -->
                    <form>
                    <!-- Input groups with icon -->
                    <div class="row">
                        <div class="col-lg-6">
    
                        <div class="row">
                            <div class="col-lg-4 ">
                            <strong>Usename </strong>
                            </div>
                            <div class="col-lg-8">
                            <div class="">
                                <BaseInput
                                placeholder="vietthach"
                                bind:value={formData.phone}
                                />
                            </div>
                            </div>
                        </div>
    
                        <div class="row">
                            <div class="col-lg-4 ">
                            <strong> Họ và tên đại lý </strong>
                            </div>
                            <div class="col-lg-8">
                            <div class="">
                                <BaseInput
                                placeholder="Dương Quỳnh Mai"
                                bind:value={formData.name}
                                />
                            </div>
                            </div>
                        </div>
        
                        </div>
    
                        <div class="col-lg-6">
                        
                        <div class="row">
                            <div class="col-lg-4 ">
                            <strong> Gói đại lý </strong>
                            </div>
                            <div class="col-lg-8">
                            <div class="">
                                <BaseInput>
                                    <select class="form-control" id="exampleFormControlSelect1">
                                    <option>Gói 1</option>
                                    <option>Gói 2</option>
                                    <option>Gói 3</option>
                                    <option>Gói 4</option>
                                    <option>Gói 5</option>
                                    </select>
                                </BaseInput>
                            </div>
                            </div>
                        </div>
    
                        <div class="row">
                            <div class="col-lg-4 ">
                            <strong> 2FA </strong>
                            </div>
                            <div class="col-lg-8">
                            <div class="">
                                <BaseInput
                                placeholder="208304"
                                bind:value={formData.facode}
                                />
                            </div>
                            </div>
                        </div>

                        </div>
                    </div>
                    <div>
                        <div class="text-left" style="float: left">
                        </div>
                        <div class="text-right" style="float: right">
                        <button class="btn btn-success">Xuất map</button>
                        </div>
                    </div>
                    </form>
                </Card>
                <!-- Input groups -->
            </div>
        </div>
        <div class="container-fluid mt--6 mb-7">
            <div class="card-wrapper">
                <Card>
                    <!-- Card header -->
                    <h3 slot="header" class="mb-0">Hệ thống đại lý lý
                        <span class=" badge-pill badge-success badge ml-4">Close All</span>
                        <span class=" badge-pill badge-success badge">Open All</span>
                    </h3>
                    <!-- Card body -->
                    <div class="mt-3">
                        <span class="text-systerm">
                            <i class="fa fa-plus" aria-hidden="true"></i> 
                        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.03125 2.23828L6.08594 4.13672L5.03125 6H2.95703L1.9375 4.13672L2.95703 2.23828H5.03125ZM5.69922 0.761719H2.32422C2.16016 0.761719 2.04297 0.820313 1.97266 0.9375L0.320312 3.92578L0.25 4.13672L0.320312 4.34766L1.97266 7.30078C2.04297 7.44141 2.16016 7.51172 2.32422 7.51172H5.69922C5.83984 7.51172 5.94531 7.44141 6.01562 7.30078L7.66797 4.34766L7.73828 4.13672L7.66797 3.92578L6.01562 0.9375C5.94531 0.820313 5.83984 0.761719 5.69922 0.761719ZM11.957 6.38672L13.0117 8.25L11.957 10.1133H9.91797L8.86328 8.25L9.91797 6.38672H11.957ZM12.625 4.875H9.25C9.10938 4.875 9.00391 4.94531 8.93359 5.08594L7.24609 8.03906L7.17578 8.25L7.24609 8.46094L8.93359 11.4141C9.00391 11.5547 9.10938 11.625 9.25 11.625H12.625C12.7656 11.625 12.8711 11.5547 12.9414 11.4141L14.6289 8.46094L14.6992 8.25L14.6289 8.03906L12.9414 5.08594C12.8711 4.94531 12.7656 4.875 12.625 4.875ZM5.03125 10.5L6.08594 12.3633L5.03125 14.2617H2.95703L1.9375 12.3633L2.95703 10.5H5.03125ZM5.69922 8.98828H2.32422C2.16016 8.98828 2.04297 9.05859 1.97266 9.19922L0.320312 12.1523L0.25 12.3633L0.320312 12.5742L1.97266 15.5625C2.04297 15.6797 2.16016 15.7383 2.32422 15.7383H5.69922C5.83984 15.7383 5.94531 15.6797 6.01562 15.5625L7.66797 12.5742L7.73828 12.3633L7.66797 12.1523L6.01562 9.19922C5.94531 9.05859 5.83984 8.98828 5.69922 8.98828Z" fill="#F032E6"/>
                        </svg>
                            vietthach - Nguyễn Viết Thạch - (Gói 3k - Doanh số gói xuất: 1.000 bài - Chuyển MAP: 125 bài)   
                        </span>
                    </div>
                </Card>
                <!-- Input groups -->
            </div>
        </div>   
  </div>
  <div style="position: relative;">
    <Tabs {tabs} tabSelected={tabs[0]} />
  </div>
  <style lang="scss">
      .text-systerm{
          color: #F032E6;
          font-size: 12px;
      }
      .filter-form-content{
      display: flex;
      }
  </style>
<script lang="ts">
    import { fade } from "svelte/transition";
    import BaseHeader from '$lib/components/BaseHeader.svelte';
    import type { ReportFormData } from "$lib/stores/report";
    let formData: ReportFormData;
    import Card from "$lib/components/Cards/Card.svelte";
    import BaseInput from "$lib/components/Inputs/BaseInput.svelte";
  
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
    
        <div class="container-fluid mt--6 mb-4">
            <div class="card-wrapper">
                <Card>
                    <!-- Card header -->
                    <!-- Card body -->
                    <form>          
                    <!-- Input groups with icon -->
                    <div class="row">
                        <div class="col-12 mb-5">
                            <h3 class="mb-0">Các thông số chung</h3>
                            <!-- Card body -->
                        </div>
                        <div class="col-lg-7">
    
                            <div class="row">
                                <div class="col-lg-4">
                                <span class="social-label">MAIL_HOST</span>
                                </div>
                                <div class="col-lg-8">
                                <div class="">
                                    <BaseInput
                                    bind:value={formData.phone}
                                    />
                                </div>
                                </div>
                            </div>
    
                            <div class="row">
                                <div class="col-lg-4 ">
                                <span class="social-label">MAIL_PORT</span>
                                </div>
                                <div class="col-lg-8">
                                <div class="">
                                    <BaseInput
                                    bind:value={formData.name}
                                    />
                                </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-4">
                                <span class="social-label">MAIL_USERNAME</span>
                                </div>
                                <div class="col-lg-8">
                                <div class="">
                                    <BaseInput
                                    bind:value={formData.phone}
                                    />
                                </div>
                                </div>
                            </div>
    
                            <div class="row">
                                <div class="col-lg-4 ">
                                <span class="social-label">MAIL_PASSWORD</span>
                                </div>
                                <div class="col-lg-8">
                                <div class="">
                                    <BaseInput
                                    bind:value={formData.name}
                                    />
                                </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-4 ">
                                    <span class="social-label">MAIL_PASSWORD</span>
                                </div>
                                <div class="col-lg-8">
                                    <div class="">
                                        <BaseInput
                                        bind:value={formData.name}
                                        />
                                    </div>
                                </div>
                            </div>
        
                        </div>
    
                        <div class="col-lg-5">

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 mb-5">
                            <div style="border-top: 1px solid rgba(0, 0, 0, 0.05);margin-top:60px;margin-bottom:30px"></div>
                            <h3 class="mb-0">Các thông tin mạng xã hội</h3>
                            <!-- Card body -->
                            <div class="mt-3" style="color:mediumvioletred">
                                <span class="text-systerm">
                                
                                </span>
                            </div>
                        </div>
                        <div class="col-lg-6">
    
                            <div class="row">
                                <div class="col-lg-2 social-media">
                                    <span class="social-label">Zalo </span>
                                </div>
                                <div class="col-lg-7">
                                    <div class="">
                                        <BaseInput
                                        placeholder="Nhập zalo công ty"
                                        bind:value={formData.phone}
                                        />
                                    </div>
                                </div>
                                <div class="col-lg-3">  
                                </div>
                            </div>
        
                            <div class="row">
                                <div class="col-lg-2 social-media">
                                    <span class="social-label">Messenger</span>
                                </div>
                                <div class="col-lg-7">
                                    <div class="">
                                        <BaseInput
                                        placeholder="Nhập messenger công ty"
                                        bind:value={formData.name}
                                        />
                                    </div>
                                </div>
                                <div class="col-lg-3">  
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-2 social-media">
                                    <span class="social-label">Youtube</span>
                                </div>
                                <div class="col-lg-7">
                                    <div class="">
                                        <BaseInput
                                        placeholder="Nhập youtube công ty"
                                        bind:value={formData.phone}
                                        />
                                    </div>
                                </div>
                                <div class="col-lg-3">  
                                </div>
                            </div>
        
                            <div class="row">
                                <div class="col-lg-2 social-media">
                                    <span class="social-label">Facebook</span>
                                </div>
                                <div class="col-lg-7">
                                    <div class="">
                                        <BaseInput
                                        placeholder="Nhập facebook công ty"
                                        bind:value={formData.name}
                                        />
                                    </div>
                                </div>
                                <div class="col-lg-3">

                                </div>
                            </div>
        
                        </div>
    
                        <div class="col-lg-6">
    
                            <div class="row">
                                <div class="col-lg-2 social-media">
                                    <span class="social-label">Website</span>
                                </div>
                                <div class="col-lg-7">
                                    <div class="">
                                        <BaseInput
                                        placeholder="Nhập website công ty"
                                        bind:value={formData.phone}
                                        />
                                    </div>
                                </div>
                                <div class="col-lg-3">  
                                </div>
                            </div>
        
                            <div class="row">
                                <div class="col-lg-2 social-media">
                                    <span class="social-label">Telegram</span>
                                </div>
                                <div class="col-lg-7">
                                    <div class="">
                                        <BaseInput
                                        placeholder="Nhập telegram công ty"
                                        bind:value={formData.name}
                                        />
                                    </div>
                                </div>
                                <div class="col-lg-3">  
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-2 social-media">
                                    <span class="social-label">Group Facebook</span>
                                </div>
                                <div class="col-lg-7">
                                    <div class="">
                                        <BaseInput
                                        placeholder="Nhập group facebook"
                                        bind:value={formData.phone}
                                        />
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    
                                </div>
                            </div>
        
                            <div class="row">
                                <div class="col-lg-2 social-media">
                                    <span class="social-label">Group Telegram</span>
                                </div>
                                <div class="col-lg-7">
                                    <div class="">
                                        <BaseInput
                                        placeholder="Nhập group telegrame"
                                        bind:value={formData.name}
                                        />
                                    </div>
                                </div>

                                <div class="col-lg-3">
                                    
                                </div>
                            </div>
        
                        </div>
    
                    </div>
                    <div>
                        <div class="text-left" style="float: left">
                            <button class="btn btn-success">Lưu câu hình hệ thống</button>
                        </div>
                        <div class="text-right" style="float: right">
                        
                        </div>
                    </div>
                    </form>
                </Card>
                <!-- Input groups -->

            </div>
        </div>
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

      .social-label{
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 19px;
        /* identical to box height */

        display: flex;
        align-items: center;
      }

      .social-media{
        display: flex;
        align-items: center;
        margin-top: -20px;
      }
      

  </style>
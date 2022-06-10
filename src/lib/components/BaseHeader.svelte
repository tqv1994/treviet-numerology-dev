<script>
  export let className = "";
</script>

<div class="header {className}">
  <div class="container-fluid">
    <div class="header-body">
      <slot></slot>
    </div>
  </div>
</div>
<style>
  .header-body h6{
    color: black;
  }
  .header-body span{
    color: #2DCE89;
  }
</style>
<script>
       export let active = false;
</script>

<li class="breadcrumb-item {active === true ? "active" : ""}" id="breadcrumb-item">
       <slot></slot>
</li>
<style>
       #breadcrumb-item {
              color: #2DCE89
       }

       #breadcrumb-item ::before {
              display: none;
       }
</style>
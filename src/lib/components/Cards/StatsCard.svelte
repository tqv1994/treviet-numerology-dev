<script>
  import Card from "./Card.svelte";
  export let type = "primary";
  export let icon = "";
  export let image = "";
  export let imageClass = "";
  export let title = "";
  export let subTitle = "";
  export let iconClasses = "";
  export let bodyClasses = "";
</script>

<Card className="card-stats" show-footer-line="true" {bodyClasses}>
  <div class="row">
    <div class="col">
      <slot>
        {#if title}
          <h5 class="card-title text-uppercase  mb-0">{title}</h5>
        {/if}
        {#if subTitle}
          <span class="h2 font-weight-bold mb-0">{subTitle}</span>
        {/if}
      </slot>
    </div>
    {#if icon}
      <div class="col-auto">
        <slot name="icon">
          <div
            class="icon icon-shape text-white reounded-circle shadow {`bg-${type}`}
            {iconClasses}">
            <i class={icon} />
          </div>
        </slot>
      </div>
    {/if}

    {#if image}
      <div class="col">
        <slot name="image">
          <div>
            <img src={image} alt="" width="" height="" style="max-height: 76px;" class="{imageClass}" >
          </div>
        </slot>
      </div>
    {/if}
  </div>

  <p class="mt-3 mb-0 text-sm">
    <slot name="footer" />
  </p>
</Card>
<style>
.card-title{
  color:white
  }
.h2{
  color:white
}
</style>
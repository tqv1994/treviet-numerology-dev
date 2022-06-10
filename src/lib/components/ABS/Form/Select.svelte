<script lang="ts">
  import { onMount } from "svelte";
  export let options: any[];
  export let optionValue: string;
  export let optionLabel: string;
  export let autocomplete: "on" | "off" = "on";
  let suffix: boolean = false;
  export let readonly: "readonly" | "" = "readonly";
  export let placeholder: string = "";
  let classNames: string | "" = "";
  export { classNames as class };
  export let value: number | string;
  let itemSelected: string = "";
  function onSelect(option: any) {
    suffix = false;
    itemSelected = option[optionLabel];
    value = option[optionValue];
  }
  onMount(() => {
    handleUpdateSelected();
  });

  function handleUpdateSelected(){
    if (value && options) {
      const selected = options.find((item) => item[optionValue] === value);
      if (selected) {
        itemSelected = selected[optionLabel];
      }
    }
  }
</script>

<div class="form-group">
  <div class="el-input el-input--suffix {suffix === true ? 'is-focus' : ''}">
    <input
      type="text"
      id="search"
      on:click={() => (suffix = true)}
      {readonly}
      {autocomplete}
      {placeholder}
      class="el-input__inner text-dark {classNames}"
      {itemSelected}
      value={itemSelected}
    />
    <!---->
    <span class="el-input__suffix" style="max-height: 43px; top: 40%;">
      <span class="el-input__suffix-inner">
        <i
          class="el-select__caret el-input__icon
        el-icon-arrow-up {suffix === true ? 'is-reverse' : ''}"
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
    style="display: {suffix === false ? 'none' : ''};
  min-width: 96%; z-index: 100000;"
  >
    <div class="el-scrollbar" style="">
      <div
        class="el-select-dropdown__wrap el-scrollbar__wrap"
        style="margin-bottom: -17px; margin-right: -17px;"
      >
        <ul class="el-scrollbar__view el-select-dropdown__list">
          <!---->
          {#each options || [] as option}
            <li
              class="el-select-dropdown__item select-primary {itemSelected ===
              option[optionLabel]
                ? 'selected'
                : ''}"
              on:click={() => onSelect(option)}
            >
              <span>{option[optionLabel]}</span>
            </li>
          {/each}
        </ul>
      </div>
      <div class="el-scrollbar__bar is-horizontal">
        <div class="el-scrollbar__thumb" style="transform: translateX(0%);" />
      </div>
      <div class="el-scrollbar__bar is-vertical">
        <div class="el-scrollbar__thumb" style="transform: translateY(0%);" />
      </div>
    </div>
    <!---->
  </div>
</div>

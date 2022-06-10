<script lang="ts">
    import { onMount } from 'svelte';
    let open = false;
    let text = 'Loading...';
    const handleOpenLoading = (label: string) => {
      text = label ? `${label}...` : text;
      open = true;
    };
  
    const handleCloseLoading = () => {
      open = false;
    };
  
    onMount(() => {
      window.openLoading = handleOpenLoading;
      window.closeLoading = handleCloseLoading;
    });
  </script>
  
  {#if open}
    <div class="wrap">
      <div style="display: flex; justify-content: center">
        <p data-text={text}>{text}</p>
      </div>
    </div>
  {/if}
  
  <style lang="scss">
    .wrap {
      position: fixed;
      z-index: 9999999;
      top: 0;
      left: 0;
      width: 100%;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      background: rgba(0, 0, 0, 0.5);
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      p {
        position: relative;
        color: #333;
        font-size: 4em;
        letter-spacing: 5px;
        border-bottom: 16px solid #333;
        line-height: 1.4;
        font-family: consolas;
        text-transform: uppercase;
        &::before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          color: #fff;
          border-bottom: 16px solid #fff;
          animation: lod 2s linear infinite;
          overflow: hidden;
        }
      }
  
      @keyframes lod {
        0% {
          width: 0;
        }
        100% {
          width: 100%;
        }
      }
    }
  </style>
  
<template>
  <button class="button">
      <slot />
  </button>
</template>

<script>
export default {
  name: "PrimaryButton",
}
</script>

<style>
.button {
    font-size: 1.2rem;
    color: #fff;
    border: 0;
    background-color: #FF4C29;
    padding: 1rem;
    cursor: pointer;
}
</style>
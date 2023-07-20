<template>
  <div class='card'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BaseCard"
}
</script>

<style scoped>
.card {
  border-radius: 12px;

  box-shadow: rgba(184, 196, 128, 0.75);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
</style>
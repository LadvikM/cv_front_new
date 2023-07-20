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
  background-color: rgba(50, 69, 84, 1);
  /*box-shadow: 0 2px 8px rgb(38, 136, 28);*/
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
</style>
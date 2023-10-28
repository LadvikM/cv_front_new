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
  /*background-color: #2f4858;*/
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
</style>
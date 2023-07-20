<template>
<button>
  <slot></slot>
</button>
</template>

<script>
export default {
  name: "BaseButton"
}
</script>

<style scoped>
button,
a {

  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font-family: 'Chakra Petch', sans-serif;
  background-color: rgba(252, 159, 91, 0.85);
  border: 1px solid rgba(252, 159, 91, 0.85);
  color: black;
  font-size: 1.1rem;

  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: rgba(252, 159, 91, 1);
  border-color: black;
}



</style>
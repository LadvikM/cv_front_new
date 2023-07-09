<template>
  <div class="navigation">
    <nav>
      <router-link to="/">Home</router-link>
      <br>
      <router-link to="/about">About</router-link>
      <br>
      <router-link to="/work">Work Experience</router-link>
      <br>
      <router-link to="/education">Education</router-link>
      <br>
      <router-link to="/info">Additional Info</router-link>
      <br>
      <router-link to="/projects">Projects</router-link>
      <br>
      <router-link to="/ontact">Contact</router-link>
      <br>
      <router-link to="/login">Login</router-link>
      <br>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'NavigationMenu'
}
</script>
<style scoped>

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: white;
  font-size: x-large;

}
nav a.router-link-exact-active {
  color: #26ff0c; /*  Active link color*/

}



.navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;

}


</style>
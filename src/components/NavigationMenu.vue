<template>
  <div class="navigation">
    <nav>
      <router-link to="/">Home</router-link>

      <router-link to="/about">About</router-link>

      <router-link to="/work">Work Experience</router-link>

      <router-link to="/education">Education</router-link>

      <router-link to="/info">Additional Info</router-link>

      <router-link to="/projects">Projects</router-link>
      <router-link to="/contact">Contact</router-link>
      <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
      <button v-if="isLoggedIn" @click='logout'>Logout</button>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'NavigationMenu',
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  },
}
</script>
<style scoped>
html {

}
button {
  color: white;
  font-size: x-large;
  background: none!important;
  border: none;
  padding: 0!important;
  /*optional*/

  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}



nav a {
  font-weight: bold;
  color: white;
  font-size: x-large;
  text-decoration: none;
  display: block;


}
nav a:hover {
  color: aquamarine;
}

nav a.router-link-exact-active {
  color: #26ff0c; /*  Active link color*/

}


.navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #42b983;


}


</style>
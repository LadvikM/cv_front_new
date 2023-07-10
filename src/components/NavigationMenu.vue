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
      <router-link to="/contact">Contact</router-link>
      <br>
      <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
      <button v-if="isLoggedIn" @click='logout'>Logout</button>
<!--todo Logout button to same font as router link-->
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
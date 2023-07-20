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
      <a v-if="isLoggedIn" @click='logout'>Logout</a>
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
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap');

html {

}




nav a {
  font-weight: bold;
  color: white;
  font-size: x-large;
  text-decoration: none;
  display: block;
  cursor: pointer;
  padding: 5px;


}
nav a:hover {
  color: #b8c480;
}

nav a.router-link-exact-active {
  color: #fc9f5b; /*  Active link color*/

}


.navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-family: 'Lato', sans-serif;


}


</style>
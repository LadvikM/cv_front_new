<template>
  <div class="container">
    <navigation-menu></navigation-menu>
    <router-view class="router"/>
    <contact-details></contact-details>
  </div>

</template>
<script>
import NavigationMenu from "@/components/NavigationMenu.vue";
import ContactDetails from "@/components/contactdetails/ContactsDetails.vue";

export default {
  components: {ContactDetails, NavigationMenu},
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace({name: 'home-view'});
      }
    }
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    }
  },
  created() {
    this.$store.dispatch('autoLogin')
  }


}
</script>
<style>

#app {

  text-align: center;
  color: white;

}

* {
  margin: 0;
}

.router {
  border: yellow 1px solid;
  width: 100%;


}

.container {
  display: grid;
  grid-template-columns: 25% 55% 20%; /*Column width*/
  /*grid-gap: 10px; !* Add some spacing between columns *!*/
  justify-items: center;
  height: 100vmin;

  background-color: black;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;


}


</style>


<template>
  <div class="container">
    <navigation-menu></navigation-menu>
    <router-view class="router" :key="componentKey" @forceRerender="forceRerender"></router-view>
    <contact-details></contact-details>
    <alert-dialog  :alert="this.alert" @showAlert="this.showAlert"></alert-dialog>

  </div>

</template>
<script>
import NavigationMenu from "@/components/NavigationMenu.vue";
import ContactDetails from "@/components/contactdetails/ContactsDetails.vue";
import AlertDialog from "@/ui/AlertDialog.vue";




export default {
  components: {AlertDialog, ContactDetails, NavigationMenu},
  data() {
    return {
      showModal: false,
      componentKey: 0,
      alert: {
        show: false,
        alertMessage: '',
        isSuccess: null,
      },
    }
  },

  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace({name: 'home-view'});
      }
    },
    showAlert(curValue, oldValue) {
      if (curValue !== oldValue) {
        this.alert = this.$store.getters.getAlert
      }
    },


  },

  computed: {

    showAlert() {

      return this.$store.getters.showAlert;
    },

    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },

  },
  created() {
    this.$store.dispatch('autoLogin')

  },
  methods: {

    forceRerender() {
      this.componentKey += 1;
    }
  },



}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch&display=swap');
#app {

  text-align: center;
  color: white;

}
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}
.router::-webkit-scrollbar {
  display: none; /*  Hide scrollbar, but keep functionality*/
}
.router {

  overflow-y: scroll;
  width: 100%;

}

.container {
  font-family: 'Chakra Petch', sans-serif;
  display: grid;
  grid-template-columns: 20% 60% 20%; /*Column width*/
  /*grid-gap: 10px; !* Add some spacing between columns *!*/
  justify-items: center;
  height: 100vmin;

  background-color: #2f4858;



}


</style>


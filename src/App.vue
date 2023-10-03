<template>
  <div style="position: fixed;"></div> <!--Added to remove bug, that caused sticky element jump from bottom. https://www.stevefenton.co.uk/blog/2022/12/mobile-position-sticky-issue/-->
  <div class="app">

    <font-awesome-icon @click="toggleMenu" class="nav-menu-button" icon="bars"/>
    <mobile-menu :show-menu="this.showMenu" @close-menu="toggleMenu"></mobile-menu>
    <navigation-menu class="nav-menu"></navigation-menu>
    <router-view class="router" :key="componentKey" @forceRerender="forceRerender"></router-view>
    <contact-details class="contact-details"></contact-details>
    <alert-dialog class="alert" :alert="this.alert" @showAlert="this.showAlert"></alert-dialog>

  </div>

</template>
<script>
import NavigationMenu from "@/components/NavigationMenu.vue";
import ContactDetails from "@/components/contactdetails/ContactsDetails.vue";
import AlertDialog from "@/ui/AlertDialog.vue";
import MobileMenu from "@/ui/MobileMenu.vue";


export default {
  components: {MobileMenu, AlertDialog, ContactDetails, NavigationMenu},
  data() {
    return {
      componentKey: 0,
      showMenu: false,
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
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },

    forceRerender() {
      this.componentKey += 1;
    }
  },


}
</script>
<style lang="scss">

@import "src/styles/colors";
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch&display=swap');

* {
  box-sizing: border-box;
}

.app {
  font-family: 'Chakra Petch', sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: $background-color;
  text-align: center;
  color: $font-color;
  justify-content: space-between;
}
.nav-menu-button {
  align-self: flex-start;
  font-size: 2rem;
  margin-top: 1rem;
  margin-left: 1rem;
  position: sticky;
  top: 0;

  background-color: $background-color;
}
.router {
  margin: 0 10%;
}
.contact-details {
  position: sticky;
  bottom: 0;
  background-color: $background-color;
}
body {
  margin: 0;
}

@media (min-width: 40rem) {

  .app {
    flex-direction: row;
    height: 100vh;
  }
  .router {
    justify-content: center;
    width: 60%;
    overflow-y: scroll;
  }
  .router::-webkit-scrollbar {
    display: none; /*  Hide scrollbar, but keep functionality*/
  }
  .contact-details {
    width: 20%;
  }
  .nav-menu {
    width: 20%;
  }
  .nav-menu-button {
    display: none;
  }
}


</style>


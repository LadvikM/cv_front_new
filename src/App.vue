<template>
  <div class="container">
    <NavigationMenu/>
    <router-view class="content"/>
    <ContactDetails/>
  </div>




</template>

<style>
#app {

  text-align: center;
  color: #2c3e50;

}
*{ margin: 0;}




.container {
  display: grid;
  grid-template-columns: 25% 60% 15%; /*Column width*/
  /*grid-gap: 10px; !* Add some spacing between columns *!*/
  justify-items: center;
  height: 100vh;
  border: 1px solid;
  background-image: url("@/assets/DSCF2524-16.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

}
.content {
  border: 1px solid;
  color: white;
}


</style>
<script setup>
import ContactDetails from "@/components/ContactsDetails.vue";
import NavigationMenu from "@/components/NavigationMenu.vue";</script>
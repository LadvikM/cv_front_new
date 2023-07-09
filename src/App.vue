<template>
  <div class="container">
    <navigation-menu></navigation-menu>
    <router-view class="router"/>
    <contact-details></contact-details>
  </div>
</template>

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

<script setup>
import NavigationMenu from "@/components/NavigationMenu.vue";
import ContactDetails from "@/components/contactdetails/ContactsDetails.vue";</script>
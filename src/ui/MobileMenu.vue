<template>
  <div class="modal-backdrop" v-if="showMenu" @click="$emit('close-menu')">
    <div class="modal-dialog">
      <div class="modal-body">
        <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/work">Work Experience</router-link>
        <router-link to="/education">Education</router-link>
        <router-link to="/projects">Projects</router-link>
        <router-link to="/contact">Contact</router-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MobileMenu",
  props: ["showMenu"],

}
</script>

<style scoped lang="scss">
@import "src/styles/colors";
.modal-backdrop {

  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}
.modal-dialog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 60%;
  height: 100vh;
  background-color: $background-color;
}


nav a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  font-weight: bold;

  color: $font-color;
  font-size: 1.5rem;
  text-decoration: none;

  cursor: pointer;
  padding: 5px;


}

.modal-body a:hover {
  color: $link-hover;
}

.modal-body a.router-link-exact-active {
  color: $link-active; /*  Active link color*/

}
</style>
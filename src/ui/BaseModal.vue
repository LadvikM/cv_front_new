<template>
  <div class="modal-backdrop" v-if="showModal">
    <div class="modal-dialog">
      <div class="modal-header">
        <slot name="header">

        </slot>
      </div>
      <div class="modal-body">
        <slot name="body">
          default body
        </slot>
      </div>
      <div class="modal-footer">
        <slot name="footer">
          <base-button class="modal-default-button" @click="$emit('close')">
            OK
          </base-button>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
import BaseButton from "@/ui/BaseButton.vue"

export default {
  name: 'BaseModal',
  components: {BaseButton},
  props: {
    showModal: {}
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap');

.modal-backdrop {
  display: flex;
  align-content: center;
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
  width: 30rem;
  height: auto;
  background-color: #b8c480;
  margin: auto;
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


</style>
<template>
<!--TODO  Add Auto close countdown-->
<!--TODO Add transition-->
<!--TODO Make it pretty-->
    <dialog :class="alert.isSuccess ? 'success' : 'fail'" open v-if="alert.show" >
      <header @click="closeAlert">X</header>
        <p>{{ alert.alertMessage }}</p>
    </dialog>

</template>

<script>
export default {
  name: "AlertDialog",

  props: {
    alert: {
      show: Boolean,
      alertMessage: String,
      isSuccess: Boolean,
    }
  },





  methods: {
    //
    // countdown() {
    //   setTimeout(() => {
    //     this.closeTimer--;
    //     this.countdown();
    //   }, 1000)
    // },

    closeAlert() {
      this.$store.dispatch('closeAlert')
      }
  },


}
</script>

<style scoped>

dialog {
  position: absolute;
  margin-right: 2rem;
  margin-bottom: 2rem;
  right: 0;
  bottom: 0;
  background: green;
  border: none;
  border-radius: 1rem;

}
header {
  right: 0;
}
.success {
  background: green;
}
.fail {
  background: red;
}

</style>
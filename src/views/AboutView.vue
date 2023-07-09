<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="getUserInfo">Get info</button>
  </div>
</template>
<script>


import axios from "axios";

export default {
  name: 'AboutView',
  data: function () {
    return {
      userId: 1,
      userInfo: {
        description: '',
        firstname: '',
        lastname: ''
      }
    }
  },
  methods: {


    getUserInfo: function () {
      axios.get("/about", {params: {userId: this.userId}} )
          .then((response) => {console.log(response)})
          .catch((error) => {console.log(error)})
    },
  },

}
</script>
<style scoped>


</style>
<template>
  <div>
    <p>Found bug? Want to give feedback? Don't like something? Feel free to leave me a message or find my contacts on
      the right. </p>
    <form @submit.prevent="sendMessage">
      <div>
        <laber for="name">Name</laber>
        <input id="name" type="text" placeholder="Can be left empty" v-model="this.name">
      </div>
      <div>
        <laber for="email">E-Mail</laber>
        <input id="email" type="email" placeholder="Can be left empty" v-model="this.email">
      </div>
      <div>
        <laber for="message">Message</laber>
        <textarea id="message" rows="8" v-model="this.message"></textarea>
      </div>
      <base-button>Send</base-button>
    </form>
  </div>
</template>

<script>
import BaseButton from "@/ui/BaseButton.vue";

export default {
  name: "ContactView",
  components: {BaseButton},
  data() {
    return {
      name: '',
      email: '',
      message: '',
    }
  },
  methods: {
    sendMessage() {
      this.$http.post("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/messages.json", {
            name: this.name,
            email: this.email,
            message: this.message,
          }
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },


  },
}
</script>

<style scoped>

</style>
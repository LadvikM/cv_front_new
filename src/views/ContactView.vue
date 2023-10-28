<template>

  <div>
    <p>Found bug? Want to give feedback? Don't like something? Feel free to leave me a message or contact me by e-mail or by phone.</p>
    <base-card>
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
    </base-card>
  </div>
</template>

<script>
import BaseButton from "@/ui/BaseButton.vue";
import BaseCard from "@/ui/BaseCard.vue";

export default {
  name: "ContactView",
  components: {BaseCard, BaseButton},
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
p {
  font-size: 2rem;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}


</style>
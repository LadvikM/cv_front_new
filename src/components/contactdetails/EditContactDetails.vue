<template>

  <form @submit="submitForm">
    <div class="form-control">
      <label for="linkedin">Linked in</label>
      <input type="text" id="linkedin" name="linkedin" v-model="this.enteredData.linkedin" >
    </div>
    <div class="form-control">
      <label for="github">Github</label>
      <input type="text" id="github" name="github" v-model="this.enteredData.github">
    </div>
    <div class="form-control">
      <label for="phone">Phone number</label>
      <input type="text" id="phone" name="phone" v-model="this.enteredData.phone">
    </div>
    <div class="form-control">
      <label for="email">E-Mail</label>
      <input type="email" id="email" name="email" v-model="this.enteredData.email">
    </div>









    <button @click="cancelFormSubmit" type="button">Cancel</button>
    <button type="submit">Submit</button>
  </form>
</template>

<script>



export default {
  name: "EditContactDetails",

  emits: ['cancelFormSubmit'],
  props: {
    contactDetails: {
      linkedin: '',
      github: '',
      phone: '',
      email: '',
    }
  },
  data() {
    return {
      enteredData: {
        linkedin: '',
        github: '',
        phone: '',
        email: '',
      },
    }
  },
  methods: {
    cancelFormSubmit() {
      this.$emit('cancelFormSubmit')
    },
    submitForm: function () {
      this.$http.put("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/contact-details.json", this.enteredData
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
.form-control {
  margin: 0.5rem 0;

}
</style>
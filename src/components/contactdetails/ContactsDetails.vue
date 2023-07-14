<template>
<!--  TODO Make it pretty!-->
<!--  TODO Make icons stay in position when clicked on email or phone-->
  <div class="container">
    <edit-contact-details v-if="isEdit" @cancel-form-submit="cancelSubmit"
                          :linkedin="contactDetails"></edit-contact-details>

    <ul class="contact-items" v-if="!isEdit">
      <li class="contact-item" v-if="isLoggedIn">
        <a @click="toggleEdit">
          <font-awesome-icon icon="fa-solid fa-pen-to-square"/>
        </a>
      </li>
      <li class="contact-item">
        <a :href="'https://www.linkedin.com/in/' + this.contactDetails.linkedin">
          <font-awesome-icon icon="fa-brands fa-linkedin-in"/>
        </a>
      </li>
      <li class="contact-item">
        <a :href="'https://github.com/' + this.contactDetails.github">
          <font-awesome-icon icon="fa-brands fa-github"/>
        </a>
      </li>

      <li class="contact-item">
        <transition name="phone-email">
          <p v-if="showPhone">{{ this.contactDetails.phone }}</p>
        </transition>
        <font-awesome-icon icon="phone" @click="showPhone = !showPhone"/>
      </li>
      <li class="contact-item">
        <transition name="phone-email">
          <p v-if="showEmail">{{ this.contactDetails.email }}</p>
        </transition>
        <font-awesome-icon icon="at" @click="showEmail = !showEmail"/>
      </li>
    </ul>


  </div>
</template>
<script>

import EditContactDetails from "@/components/contactdetails/EditContactDetails.vue";


export default {
  name: 'ContactDetails',
  components: {EditContactDetails},
  data() {
    return {
      isEdit: false,
      showPhone: false,
      showEmail: false,

      contactDetails:
          {
            id: '',
            linkedin: '',
            github: '',
            phone: '',
            email: '',
          },


    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {

    toggleEdit() {
      this.isEdit = !this.isEdit
    },
    cancelSubmit() {
      this.linkedin = '';
      this.github = '';
      this.phone = '';
      this.email = '';
      this.isEdit = false;
    },
    getContactDetails: function () {
      this.$http.get("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/contact-details.json")
          .then(response => {
            this.contactDetails = response.data;
          })
          .catch(error => {
            console.log(error)
          })
    },




  },
  beforeMount() {
    this.getContactDetails()
  }
}
</script>
<style scoped>

.container {
  width: 100%;
  background-color: coral;
  display: flex;
  justify-content: center; /*aligns content horizontally center*/
  align-items: center; /*aligns content vertically center*/


}

ul {
  font-size: 2rem;
  border: aqua solid 1px;

}

ul p {
  font-size: 1.5rem;
}

.phone-email-enter-from,
.phone-email-leave-to {
  opacity: 0;

}

.phone-email-enter-to,
.phone-email-leave-from {
  opacity: 1;
}

.phone-email-enter-active,
.phone-email-leave-active {
  transition: all 1s ease;
}

.contact-item p {
  display: inline-block;
  margin: 0;
}
.contact-item {

}
.contact-items {
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

</style>
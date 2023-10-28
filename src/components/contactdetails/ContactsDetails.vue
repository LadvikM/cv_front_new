<template>

  <div class="container">
    <edit-contact-details v-if="isEdit" @cancel-form-submit="cancelSubmit"
                          :linkedin="contactDetails"></edit-contact-details>
    <div class="contact-items" v-if="!isEdit">

      <div class="contact-item" v-if="isLoggedIn">
        <a @click="toggleEdit">
          <font-awesome-icon icon="fa-solid fa-pen-to-square"/>
        </a>
      </div>

      <div class="contact-item">
        <a :href="'https://www.linkedin.com/in/' + this.contactDetails.linkedin">
          <font-awesome-icon icon="fa-brands fa-linkedin-in"/>
        </a>
      </div>

      <div class="contact-item">
        <a :href="'https://github.com/' + this.contactDetails.github">
          <font-awesome-icon icon="fa-brands fa-github"/>
        </a>
      </div>
      <div class="contact-item">
        <font-awesome-icon icon="phone" @click="showPhone = !showPhone"/>
      </div>
      <div class="contact-item">
        <font-awesome-icon icon="at" @click="showEmail = !showEmail"/>
      </div>

    </div>


    <div class="phone">
      <transition name="phone-email">
        <p v-if="showPhone">{{ this.contactDetails.phone }}</p>
      </transition>
    </div>
    <div class="email">
      <transition name="phone-email">
        <p v-if="showEmail">{{ this.contactDetails.email }}</p>
      </transition>
    </div>
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
<style scoped lang="scss">
@import "src/styles/colors";

.container {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-areas: "phone email"
                       "icons icons";
  align-content: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.75);
  box-shadow: 0 -1rem 10px rgba(0, 0, 0, 0.75);
}

.contact-items {
  font-size: 2rem;
  grid-area: icons;
  justify-content: center;
  display: flex;
}

.phone {
  font-size: 1rem;
  grid-area: phone;
}

.email {
  font-size: 1rem;
  grid-area: email;
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

a:visited {
  color: white;
}





.contact-item {
  cursor: pointer;
  padding: 0.5rem;
}


@media (min-width: 40rem) {
.container {


  grid-template-areas: "phone phone"
                       "email email"
                       "icons icons";
  background: none;
  box-shadow: none;
}
  .contact-items {
    flex-direction: column;
  }
  a:hover,
  .contact-item:hover {
    color: $link-hover;
  }


}
</style>
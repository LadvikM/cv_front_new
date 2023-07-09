<template>
  <div class="container">
    <edit-contact-details v-if="isEdit" @cancel-form-submit="cancelSubmit"
                          :linkedin="contactDetails"></edit-contact-details>
  <ul v-if="!isEdit">
    <li>
      <a @click="toggleEdit">
        <font-awesome-icon icon="fa-solid fa-pen-to-square"/>
      </a>
    </li>
    <li>
      <a :href="'https://www.linkedin.com/in/' + this.contactDetails.linkedin">
        <font-awesome-icon icon="fa-brands fa-linkedin-in"/>
      </a>
    </li>
    <li>
      <a :href="'https://github.com/' + this.contactDetails.github">
        <font-awesome-icon icon="fa-brands fa-github"/>
      </a>
    </li>
    <li>
      <font-awesome-icon icon="phone" @click="showPhone = !showPhone"/>
      <transition name="phone-email">
        <p v-if="showPhone">{{ this.contactDetails.phone }}</p>
      </transition>
    </li>
    <li>
      <font-awesome-icon icon="at" @click="showEmail = !showEmail"/>

      <transition name="phone-email">
        <p v-if="showEmail">{{ this.contactDetails.email }}</p>
      </transition>
    </li>
  </ul>


  </div>
</template>
<script>
import axios from "axios";
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


    getContactDetails() {
      axios.get('https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/contact-details.json',).then((response) => {


        this.contactDetails = response.data;


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

  display: flex;
  justify-content: center; /*aligns content horizontally center*/
  align-items: center; /*aligns content vertically center*/
  border: red dashed 1px;

}
ul {
  font-size: 2rem;
  border: aqua solid 1px;
  list-style-type: none;
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


</style>
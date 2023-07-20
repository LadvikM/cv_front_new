<template>
  <!--  TODO ADD validation-->
  <!-- TODO ADD feedback on successful and unsuccessful responses-->
  <!--  TODO Make it pretty-->

  <div class="home">
    <base-spinner v-if="isLoading"></base-spinner>
    <div class="content" v-if="!isFormView && !isLoading">
      <h1>{{ this.header }}</h1>
      <p v-html="shortDescription"></p>
    </div>

    <div class="content">
      <base-button v-if="this.buttonMode === 'add' && isLoggedIn" @click="toggleView">Add</base-button>
      <base-button v-if="this.buttonMode === 'edit' && isLoggedIn && !isFormView" @click="toggleView">Edit</base-button>
    </div>
    <div class="content" v-if="isFormView">

      <div>
        <label for="header">Header</label>
        <input type="text" id="header" v-model="header">
      </div>

      <div>
        <label for="short-description">Short Description</label>
        <textarea id="short-description" rows="5" v-model="shortDescription"></textarea>
      </div>
      <button @click="toggleView">Cancel</button>
      <button @click="this.submit">Submit</button>


    </div>
  </div>

</template>

<script>

import BaseSpinner from "@/ui/BaseSpinner.vue";
import BaseButton from "@/ui/BaseButton.vue";

export default {
  name: 'HomeView',
  components: {BaseSpinner, BaseButton},

  data() {
    return {
      isLoading: false,
      isFormView: false,
      buttonMode: null,
      header: '',
      shortDescription: '',
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {

    toggleView() {
      this.isFormView = !this.isFormView
    },


    submit: function () {
      this.$http.put("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/home-page.json", {
            header: this.header,
            shortDescription: this.shortDescription,
          }
          // eslint-disable-next-line no-unused-vars
      ).then(response => {
        if (this.buttonMode === 'add') {
          this.$store.dispatch('setAlert', {
            alertMessage: 'Adding was successful',
            isSuccess: true,

          });
        } else if (this.buttonMode === 'edit') {
          this.$store.dispatch('setAlert', {
            alertMessage: 'Edit was successful',
            isSuccess: true,

          });
        }
        this.$emit('showAlert');
        this.toggleView()

      }).catch(error => {
        this.$store.dispatch('setAlert', {
          alertMessage: 'Something went wrong. Try again.',
          isSuccess: false,
        });
        console.log(error)
      })
    },
    getHomepageInfo: function () {

      this.isLoading = true;
      this.$http.get("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/home-page.json")
          .then(response => {
            if (response.data === null) {
              this.buttonMode = 'add'
            } else {
              if (response.data.header === '' && response.data.shortDescription === '') {
                this.buttonMode = 'add'
              } else {
                this.buttonMode = 'edit';
              }
              this.header = response.data.header;
              this.shortDescription = response.data.shortDescription;
            }
            this.isLoading = false;
          })
          .catch(error => {
            this.$store.dispatch('setAlert', {
              alertMessage: 'Retrieving data failed. Please refresh page.',
              isSuccess: false,
            });
            this.isLoading = false;
            console.log(error)
          })

    },

  },

  created() {
    this.getHomepageInfo();

  }
}
</script>
<style scoped>

h1 {
  font-size: 4rem;
  font-family: 'Chakra Petch', sans-serif;
}
p {
  font-family: 'Chakra Petch', sans-serif;
  font-size: 2rem;
}

.home {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
}

</style>

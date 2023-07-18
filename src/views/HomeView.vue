<template>
  <!--  TODO ADD validation-->
  <!-- TODO ADD feedback on successful and unsuccessful responses-->
  <!--  TODO Make it pretty-->

  <div>
    <div v-if="!isFormView">
      <h1>{{ this.header }}</h1>
      <p>{{ this.shortDescription }}</p>
    </div>

    <div>
      <button v-if="this.buttonMode === 'add' && isLoggedIn" @click="toggleView">Add</button>
      <button v-if="this.buttonMode === 'edit' && isLoggedIn" @click="toggleView">Edit</button>
    </div>
    <div v-if="isFormView">

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


export default {
  name: 'HomeView',

  data() {
    return {

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

          })
          .catch(error => {
            this.$store.dispatch('setAlert', {
              alertMessage: 'Retrieving data failed. Please refresh page.',
              isSuccess: false,
            });
            console.log(error)
          })
      this.isLoading = false;
    },

  },

  created() {
    this.getHomepageInfo();

  }
}
</script>

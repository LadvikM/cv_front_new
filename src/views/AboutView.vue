<template>
  <div class="about">
    <div v-if="isFormView">
      <div>
        <label for="header">Header</label>
        <input id="header" type="text" v-model="header">
      </div>
      <div>
        <label for="description">Long Description</label>
        <textarea id="description" rows="5" v-model="longDescription"></textarea>
      </div>
      <base-button @click="toggleView">Cancel</base-button>
      <base-button @click="submitAboutInfo">Submit</base-button>

    </div>



    <div v-if="!isFormView">
      <img src="../assets/DSCF6098.jpg" height="3265" width="4898" alt="Here should be Mihkel's photo"/>
      <h1>{{ this.header }}</h1>
      <p v-html="longDescription"></p>
      <div>
        <base-button v-if="this.buttonMode === 'add' && isLoggedIn" @click="toggleView">Add</base-button>
        <base-button v-if="this.buttonMode === 'edit' && isLoggedIn" @click="toggleView">Edit</base-button>
      </div>
    </div>

  </div>
</template>
<script>


import BaseButton from "@/ui/BaseButton.vue";

export default {
  name: 'AboutView',
  components: {BaseButton},
  data: function () {
    return {
      buttonMode: null,
      isFormView: false,
      image: '',
      header: '',
      longDescription: ''
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
    submitAboutInfo: function () {
      this.$http.put("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/about-view.json", {
            header: this.header,
            longDescription: this.longDescription,
          }
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    getAboutInfo: function () {
      this.$http.get("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/about-view.json")
          .then(response => {
            if (response.data === null || (response.data.header === '' && response.data.shortDescription === '')) {
              this.buttonMode = 'add'
            } else {
              this.buttonMode = 'edit';

            }
            this.header = response.data.header;
            this.longDescription = response.data.longDescription;

          })
          .catch(error => {
            console.log(error)
          })
    },


  },
  created() {
    this.getAboutInfo();
  }

}
</script>
<style scoped lang="scss">
@import "src/styles/fontsizes";
h1 {
  font-size: $h1-small-screen;
}
p {
  text-align: start;
  font-size: $p-small-screen;
}
img {
  margin-top: 2rem;
  width: 70%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 0 0.8rem rgba(33, 28, 28, 0.82);
}
@media (min-width: 40rem) {
  img {

    width: 50%;
    height: auto;
    }
  h1 {
    font-size: $h1-large-screen;
  }
  p {
    text-align: start;
    font-size: $p-large-screen;
  }
}
</style>
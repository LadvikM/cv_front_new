<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError"><p>{{ error }}</p></base-dialog>

    <base-dialog :show="isLoading" title="Please wait. Loading..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <p class="error" v-if="!formIsValid">Forms must not be empty & password length at least 6 characters</p>
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="email">
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password">
        </div>
        <base-button>{{ buttonCaptions.loginButton }}</base-button>
        <base-button type="button" @click="switchMode">{{ this.buttonCaptions.switchButton }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import BaseButton from "@/ui/BaseButton.vue";
import BaseCard from "@/ui/BaseCard.vue";
import BaseDialog from "@/ui/BaseDialog.vue";
import BaseSpinner from "@/ui/BaseSpinner.vue";


export default {
  name: "UserLogin",
  components: {BaseSpinner, BaseDialog, BaseCard, BaseButton},
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
      buttonCaptions: {
        loginButton: 'Login',
        switchButton: 'Switch to register'
      }
    }
  },
  methods: {
    handleError() {
      this.error = null;
    },
    submitForm() {
      if (this.email === '' || this.password.length < 6) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      const payload = {
        email: this.email,
        password: this.password,
      }
      try {
        if (this.mode === 'signup') {
          this.$store.dispatch('signup', payload)

        } else {
          this.$store.dispatch('login', payload)
          this.$router.replace({name: 'home-view'})
        }
      } catch (e) {
        this.error = 'Something went wrong.'
        console.log(e)
      }



      this.isLoading = false;

    },
    switchMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
        this.buttonCaptions.loginButton = 'Register';
        this.buttonCaptions.switchButton = 'Switch to login';

      } else {
        this.mode = 'login'
        this.buttonCaptions.loginButton = 'Login';
        this.buttonCaptions.switchButton = 'Switch to register';
      }
    },
  },
}
</script>

<style scoped>
/*.error {*/
/*  color: red;*/
/*}*/

/*form {*/
/*  margin: 1rem;*/
/*  border: 1px solid #ccc;*/
/*  border-radius: 12px;*/
/*  padding: 1rem;*/
/*}*/

/*.form-control {*/
/*  margin: 0.5rem 0;*/
/*}*/

/*label {*/
/*  font-weight: bold;*/
/*  margin-bottom: 0.5rem;*/
/*  display: block;*/
/*}*/

/*input,*/
/*textarea {*/
/*  display: block;*/
/*  width: 100%;*/
/*  font: inherit;*/
/*  border: 1px solid #ccc;*/
/*  padding: 0.15rem;*/
/*}*/

/*input:focus,*/
/*textarea:focus {*/
/*  border-color: #3d008d;*/
/*  background-color: #faf6ff;*/
/*  outline: none;*/
/*}*/
</style>
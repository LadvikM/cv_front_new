<template>
  <div class="education">

    <h1 class="page-header">"Learning never exhausts the mind." - Leonardo da Vinci</h1>
    <div v-if="errorMessage">
      <h1>{{ errorMessage }}</h1>
    </div>
    <div>
      <base-spinner v-if="!errorMessage && isLoading"></base-spinner>
    </div>
    <div v-if="!errorMessage && !isLoading">
      <div v-if="isLoggedIn">
        <base-button v-if="!isFormView" @click="toggleForm">Add Education</base-button>
        <base-button v-if="isFormView" @click="toggleForm">Cancel</base-button>
      </div>
      <education-form v-if="isFormView"></education-form>
      <div v-if="!isFormView">
        <div class="educations-element" v-for="education in educations" :key="education.key">
          <h1 class="institution">{{ education.institution }}</h1>
          <p class="location">Location: {{ education.location }}</p>
          <div v-for="subject in education.subjects" :key="subject.key">
            <div class="subject-degree">
              <h2 class="subject">{{ subject.subject }}</h2>
              <p>{{ subject.degree }}</p>
            </div>

            <p class="from-to">{{ formatStartDate(subject.startDate) }} - {{ formatEndDate(subject.endDate) }}</p>
            <p class="description">Description: {{ subject.description }}</p>
          </div>
          <div class="button" v-if="isLoggedIn">
            <BaseButton @click="editEducation(education.id)">Edit</BaseButton>
            <BaseButton @click="deleteEducation(education.id)">Delete</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EducationForm from "@/components/education/EducationForm.vue";
import BaseButton from "@/ui/BaseButton.vue";
import moment from "moment/moment";
import {computed} from "vue";
import BaseSpinner from "@/ui/BaseSpinner.vue";


export default {
  name: "EducationView",
  emits: ['forceRerender'],
  components: {BaseSpinner, BaseButton, EducationForm},
  data() {
    return {
      isLoading: false,
      errorMessage: '',
      isEditEducation: false,
      educationKey: '',
      isFormView: false,

      educations: {
        id: '',
        institution: '',
        location: '',
        subjects: [{
          subject: '',
          degree: '',
          startDate: '',
          endDate: '',
          description: '',

        }]
      }
    }

  },

  provide() {
    return {
      educationKey: computed(() => this.educationKey)
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {


    deleteEducation: function (key) {
      this.$http.delete(`https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/education/${key}.json`)
          .then(() => {
            this.$emit('forceRerender')
            this.$store.dispatch('setAlert', {
              alertMessage: 'Entry was successfully deleted',
              isSuccess: true,
            })
          })
          .catch(error => {
            this.$store.dispatch('setAlert', {
              alertMessage: 'Deleting entry failed. Try again.',
              isSuccess: false,
            })
            console.log(error)
          })
    },
    editEducation(key) {
      this.educationKey = key;
      this.isFormView = true;

    },
    formatEndDate(end) {
      if (end === '') {
        return 'Present'
      } else {
        return moment(end).format('MMMM YYYY')
      }
    },

    formatStartDate(start) {
      return moment(start).format('MMMM YYYY')
    },
    toggleForm() {
      this.isFormView = !this.isFormView
    },

    getEducation() {
      this.isLoading = true;
      this.$http.get("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/education.json")
          .then(response => {
            this.educations = response.data
            for (const key in response.data) {
              this.educations[key].id = key;
            }

            this.isLoading = false;
          })
          .catch(error => {
            this.errorMessage = "Something must have gone wrong! I've been to school, I promise!"
            console.log(error)
            this.isLoading = false;
          })
    },


  },
  created() {
    this.getEducation()
  }
}
</script>
<style scoped>
/*.page-header {*/
/*  padding: 2rem*/
/*}*/

/*.education {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*}*/

/*.educations-element {*/
/*  border-bottom: #909cc2 2px solid;*/
/*  background: rgba(255, 255, 255, 0.05);*/
/*}*/

/*.institution {*/
/*  padding-top: 1rem;*/
/*  margin: 1rem;*/
/*  font-size: 2rem;*/
/*  text-align: start;*/
/*}*/

/*.from-to,*/
/*.location {*/
/*  display: flex;*/
/*  align-items: start;*/
/*  margin: 1rem;*/
/*}*/

/*.subject-degree {*/
/*  margin: 1rem;*/
/*  display: flex;*/
/*  flex-direction: row;*/
/*  align-items: baseline;*/
/*}*/

/*.subject {*/
/*  padding-right: 1rem;*/
/*  font-size: 1.5rem;*/
/*  margin: 0;*/
/*}*/

/*.description {*/
/*  */
/*  display: flex;*/
/*  align-items: start;*/
/*  margin: 1rem;*/
/*  text-align: start;*/
/*}*/

/*.button {*/
/*  margin-bottom: 0.5rem;*/
/*}*/
</style>


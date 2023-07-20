<template>
  <div class="education">
    <div v-if="errorMessage">
      <h1>{{ errorMessage }}</h1>
    </div>
    <div>
      <base-spinner v-if="!errorMessage && isLoading"></base-spinner>
    </div>
    <div v-if="!errorMessage && !isLoading">
      <base-button v-if="!isFormView" @click="toggleForm">Add Education</base-button>
      <base-button v-if="isFormView" @click="toggleForm">Cancel</base-button>
      <education-form v-if="isFormView"></education-form>
      <div v-if="!isFormView">
        <div class="educations-element" v-for="education in educations" :key="education.key">
          <p>{{ education.institution }}</p>
          <p>{{ education.location }}</p>
          <div v-for="subject in education.subjects" :key="subject.key">
            <p>{{ subject.subject }}</p>
            <p>{{ subject.degree }}</p>
            <p>{{ formatStartDate(subject.startDate) }} - {{ formatEndDate(subject.endDate) }}</p>
            <p>{{ subject.description }}</p>
          </div>
          <BaseButton @click="editEducation(education.id)">Edit</BaseButton>
          <BaseButton @click="deleteEducation(education.id)">Delete</BaseButton>
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
.education {
  display: flex;
  flex-direction: column;
}
.educations-element {
  border-bottom: #909cc2 2px solid;
}
</style>


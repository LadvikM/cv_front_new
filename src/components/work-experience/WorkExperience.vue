<template>
  <h1 class="page-header">My work experience.</h1>
  <h2 class="error" v-if="error">{{ error }}</h2>
  <base-spinner v-if="isLoading && !error"></base-spinner>
  <div class="work-experience" v-else-if="!isLoading && !error" v-for="workExperience in workExperiences"
       :key="workExperience.id">
    <h1 class="company-name">{{ workExperience.companyName }}</h1>
    <p class="location">Location: {{ workExperience.location }}</p>
    <div v-for="position in workExperience.positions" :key="position.id">
      <div class="position-date">
        <h2 class="position">{{ position.positionName }}</h2>
        <p class="from-to">{{ formatStartDate(position.startDate) }} - {{ formatEndDate(position.endDate) }}</p>
      </div>
      <p class="description"> Work Description: {{ position.description }}</p>
    </div>
    <base-button class="button" @click="editEntry(workExperience.id)" v-if="isLoggedIn">Edit</base-button>
    <base-button class="button" @click="deleteEntry(workExperience.id)" v-if="isLoggedIn">Delete</base-button>
  </div>
</template>

<script>

import moment from 'moment'
import BaseSpinner from "@/ui/BaseSpinner.vue";
import BaseButton from "@/ui/BaseButton.vue";


export default {
  name: "WorkExperience",
  components: {BaseButton, BaseSpinner},
  emits: ['forceRerender', 'editEntry'],

  data() {
    return {
      workExperienceId: '',
      error: null,
      isLoading: false,
      formattedStartDate: '',
      formattedEndDate: '',
      workExperiences:
          {
            id: '',
            companyName: '',
            location: '',
            positions: [{
              id: '',
              positionName: '',
              startDate: '',
              endDate: '',
              description: '',
            }]
          }


    }
  },
  created() {
    this.getWorkExperiences()
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    editEntry(workExperienceId) {
      this.workExperienceId = workExperienceId;
      this.$emit('editEntry', this.workExperienceId);


    },


    deleteEntry: function (key) {
      this.$http.delete(`https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/work-experience/${key}.json`)

          .then(() => {

            this.$store.dispatch('setAlert', {
              alertMessage: 'Work experience deleted successfully.',
              isSuccess: true,
            });
            this.$emit('forceRerender')
          })
          .catch(error => {
            this.$store.dispatch('setAlert', {
              alertMessage: 'Deleting work experience failed.',
              isSuccess: false,
            });

            console.log(error)
          })
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

    getWorkExperiences: function () {
      this.isLoading = true;
      this.$http.get("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/work-experience.json")
          .then(response => {
            if (response.data === null) {
              this.error = 'Oh no! I must have deleted all entries! '
            } else {
              this.workExperiences = response.data;
              for (const key in response.data) {
                this.workExperiences[key].id = key;
              }
            }

            this.isLoading = false;

          }).catch(() => {
        this.error = 'Something went wrong. I have definitely worked before!'
      })
    },


  },
}
</script>

<style scoped>
/*.work-experience {*/
/*  align-content: start;*/
/*  background-color: rgba(255, 255, 255, 0.05);*/
/*  border-bottom: #909cc2 2px solid;*/

/*}*/

/*.location {*/
/*  display: flex;*/
/*  align-items: start;*/
/*  margin: 1rem;*/
/*}*/

/*.company-name {*/
/*  padding-top: 1rem;*/
/*  margin: 1rem;*/
/*  font-size: 2rem;*/
/*  text-align: start;*/
/*}*/

/*.position-date {*/
/*  margin: 1rem;*/
/*  display: flex;*/
/*  flex-direction: row;*/
/*  align-items: baseline;*/
/*}*/


/*.position {*/
/*  padding-right: 1rem;*/
/*  font-size: 1.5rem;*/
/*  margin: 0;*/
/*}*/

/*.error {*/
/*  justify-content: center;*/
/*  align-items: center;*/
/*  display: flex;*/
/*}*/

/*.description {*/
/*  width: 75%;*/
/*  display: flex;*/
/*  align-items: start;*/
/*  margin: 1rem;*/
/*  text-align: start;*/
/*}*/

/*.page-header {*/
/*  padding: 2rem*/
/*}*/
/*.button {*/
/*  margin-bottom: 0.5rem;*/
/*}*/

</style>
<template>
  <h1 class="page-header">My work experience.</h1>
  <h2 class="error" v-if="error">{{ error }}</h2>
  <base-spinner v-if="isLoading && !error"></base-spinner>
  <div class="work-experience" v-else-if="!isLoading && !error" v-for="workExperience in workExperiences"
       :key="workExperience.id">
    <h1 class="company-name">{{ workExperience.companyName }}</h1>
    <p class="location">Location: {{ workExperience.location }}</p>
    <div class="positions-container">
      <div class="positions" v-for="position in workExperience.positions" :key="position.id">
        <h2 class="position-name">{{ position.positionName }}</h2>
        <p class="position-date">{{ formatStartDate(position.startDate) }} - {{ formatEndDate(position.endDate) }}</p>
        <p class="description"> <b>Work Description:</b> {{ position.description }}</p>
      </div>
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

<style scoped lang="scss">
@import "src/styles/fontsizes";
.page-header {
  font-size: $h1-small-screen;
}
.work-experience {

  background-color: rgba(255, 255, 255, 0.05);
  border-bottom: #909cc2 2px solid;
  margin-bottom: 1rem;

  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-areas: "company location"
                      "position position";
  text-align: start;
  justify-items: start;
  align-items: last baseline;

}

.company-name {
  grid-area: company;
  margin: 1rem
}

.location {
  margin: 1rem;
  grid-area: location;

}

.positions-container {
  grid-area: position;
}
.positions {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-areas: "position date"
                    "description description";
  justify-items: start;
  align-items: last baseline;
}

.position-name {
  margin: 1rem;
  grid-area: position;
}

.position-date {
  margin: 1rem;
  grid-area: date;
}

.description {
  margin: 1rem;
  grid-area: description;
  text-align: justify;
}


@media (min-width: 40rem) {
  .page-header {
    font-size: $h1-large-screen;
  }
  .work-experience {
    border-bottom: #909cc2 4px solid;
  }
}


</style>
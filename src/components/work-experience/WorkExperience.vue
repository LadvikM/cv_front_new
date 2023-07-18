<template>
  <!--  TODO Arrange entries by date.-->

  <!--  TODO Make it pretty-->


  <h1>My work experience.</h1>
  <h2 v-if="error">{{ this.error }}</h2>
  <base-spinner v-if="isLoading && !error"></base-spinner>
  <table v-else-if="!isLoading && !error" v-for="workExperience in workExperiences" :key="workExperience.id">

    <thead class="table-header">
    <tr>
      <td class="company-name">
        <h2>{{ workExperience.companyName }} </h2>
      </td>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td class="location">{{ workExperience.location }}</td>
    </tr>

    <table v-for="position in workExperience.positions" :key="position.id">
      <tr>
        <td class="position">{{ position.positionName }}</td>
        <td class="to-from">{{ formatStartDate(position.startDate) }} - {{ formatEndDate(position.endDate) }}</td>
      </tr>
      <tr>
        <td class="description" colspan="2">{{ position.description }}</td>
      </tr>

    </table>

    </tbody>
    <button @click="deleteEntry(workExperience.id)" v-if="isLoggedIn">Delete Entry</button>
    <button @click="editEntry(workExperience.id)" v-if="isLoggedIn">Edit Entry</button>
  </table>


</template>

<script>

import moment from 'moment'
import BaseSpinner from "@/ui/BaseSpinner.vue";


export default {
  name: "WorkExperience",
  components: {BaseSpinner},
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
          // eslint-disable-next-line no-unused-vars
          .then(response => {

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
            // eslint-disable-next-line no-unused-vars
          }).catch(error => {
        this.error = 'Something went wrong. I have definitely worked before!'
      })
    },


  },
}
</script>

<style scoped>
.company-name {
  padding: 1rem;
  border: white 1px solid;
  font-size: 1.5rem;

}

.location {
  border: yellow 1px solid;
}

.table-header {
  column-span: 2;
}

.position {
  border: red 1px solid;
  font-size: 1.3rem;
}

.to-from {
  border: aqua 1px solid;
}

.description {

  border: coral 1px solid;
}

</style>
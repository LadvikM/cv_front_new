<template>
  <!--  TODO - Add some message when work experience is empty or problem with server-->
<!--    TODO - Add feedback on successful and unsuccessful deletes.-->
  <!--  TODO - Add option to EDIT entries-->
  <!--  TODO - Add loading screen-->
<!--    TODO Make it pretty-->
  <table v-for="workExperience in workExperiences" :key="workExperience.id">

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
    <button @click="deleteEntry(workExperience.id)">Delete Entry</button>
    <button>Edit Entry</button>
  </table>


</template>

<script>

import moment from 'moment'

export default {
  name: "WorkExperience",


  data() {
    return {
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
  computed: {},
  methods: {

    deleteEntry: function (key) {
      this.$http.delete(`https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/work-experience/${key}.json`)
          .then(response => {


            console.log(response)
          })
          .catch(error => {

            console.log(error)
          })
    },


    formatEndDate(end) {
      return moment(end).format('MMMM YYYY')
    },

    formatStartDate(start) {
      return moment(start).format('MMMM YYYY')
    },

    getWorkExperiences: function () {
      this.$http.get("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/work-experience.json")
          .then(response => {
          this.workExperiences = response.data;
          for (const key in response.data) {
            this.workExperiences[key].id = key;
          }
          }).catch(error => {
        console.log(error)
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
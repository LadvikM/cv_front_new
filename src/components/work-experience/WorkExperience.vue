<template>

  <div>
    <h1>My previous work experience</h1>
    <div v-for="workExperience in workExperiences" :key="workExperience.id">

      <h2>{{workExperience.companyName}}</h2>
      <h5>{{workExperience.location}}</h5>
      <p>{{formatStartDate}} - {{formatEndDate}}</p>
      <p>{{workExperience.description}}</p>
    </div>




  </div>

</template>

<script>
import axios from "axios";
import moment from 'moment'

export default {
  name: "WorkExperience",


  data() {
    return {
      workExperiences:
          {
            id: '',
            companyName: '',
            location: '',
            position: '',
            startDate: '',
            endDate: '',
            description: '',
          }


    }
  },
  created() {
    this.getWorkExperiences()
  },
  computed: {
    formatStartDate() {
      return moment(this.workExperiences.startDate).format('Do MMMM YYYY')
    },
    formatEndDate() {
      return moment(this.workExperiences.endDate).format('Do MMMM YYYY')
    }
  },
  methods: {


    getWorkExperiences() {
      axios.get('https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/work-experience.json').then((response) => {
        this.workExperiences = response.data;





      }).catch((response) => {
        console.log(response);
      })
    },
  },
}
</script>

<style scoped>

</style>
<template>
<!--todo Add possibility to add different positions in same company-->
<!--  todo Add validation to forms-->
<!--  todo Add feedback on successful and unsuccessful responses-->
<!--  todo Make it pretty-->
  <div>
    <h1>Edit your work experience</h1>
    <form @submit.prevent="submitWorkExperiences">
      <div>
        <label for="company-name">Company name</label>
        <input type="text" id="company-name" v-model="companyName">
      </div>
      <div>
        <label for="location">Location</label>
        <input type="text" id="location" v-model="location">
      </div>


      <div>
        <label for="position">Position</label>
        <input type="text" id="position" v-model="position">
      </div>
      <div>
        <label for="start-date">Start Date</label>
        <input type="date" id="start-date" v-model="startDate">
      </div>
      <div>
        <label for="end-date">End Date</label>
        <input type="date" id="end-date" v-model="endDate">
      </div>
      <div>
        <label for="description">Work Description</label>
        <textarea id="description" rows="5" v-model="description"></textarea>

      </div>
      <button type="submit">Submit</button>
    </form>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "EditWorkExperience",
  props: ['work-experience'],
  data() {
    return {
      companyName: '',
      location: '',
      position:'',
      startDate: '',
      endDate: '',
      description: '',
    }
  },


  methods: {
    submitWorkExperiences() {
      axios.post('https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/work-experience.json', {
        companyName: this.companyName,
        location: this.location,
        position: this.position,
        startDate: this.startDate,
        endDate: this.endDate,
        description: this.description,

      }).then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      })
    }
  },


}


</script>

<style scoped>

</style>
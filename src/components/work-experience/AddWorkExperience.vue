<template>

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

      <div v-for="position in positions" :key="position.id">

        <div>

        </div>
        <div>
          <label for="position">Position name</label>
          <input type="text" id="position" v-model="position.positionName">
        </div>
        <div>
          <label for="start-date">Start Date</label>
          <input type="date" id="start-date" v-model="position.startDate">
        </div>
        <div>
          <label for="end-date">End Date</label>
          <input type="date" id="end-date" v-model="position.endDate">
        </div>
        <div>
          <label for="description">Work Description</label>
          <textarea id="description" rows="5" v-model="position.description"></textarea>
        </div>
      </div>
      <button type="button" @click="addAdditionalPosition">Add additional position</button>
      <button type="submit">Submit</button>
    </form>
  </div>

</template>

<script>


export default {
  name: "EditWorkExperience",
  props: ['work-experience'],
  data() {
    return {
      positionId: 0,
      companyName: '',
      location: '',
      positions: [{
        id: 0,
        positionName: '',
        startDate: '',
        endDate: '',
        description: '',
      }]

    }
  },



  methods: {

    addAdditionalPosition: function () {
      this.positionId++;
      this.positions.push({ id: this.positionId, positionName: '', startDate: '', endDate: '', description: ''

      });

    },
    submitWorkExperiences: function () {
      this.$http.post("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/work-experience.json", {
        companyName: this.companyName,
        location: this.location,
        positions: this.positions,


      }).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },


  },


}


</script>

<style scoped>

</style>
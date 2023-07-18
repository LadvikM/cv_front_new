<template>


  <!--TODO Make it pretty-->
  <div>

    <h1>Add work experience</h1>
    <form @submit.prevent="validateInput">
      <div class="form-control" :class="{invalid: isInvalid.companyName}">
        <label for="company-name">Company name</label>
        <input type="text" id="company-name" v-model.trim="companyName">
        <p v-if="isInvalid.companyName">Field must not be empty! Please enter company name.</p>
      </div>
      <div class="form-control" :class="{invalid: isInvalid.location}">
        <label for="location">Location</label>
        <input type="text" id="location" v-model.trim="location">
        <p v-if="isInvalid.location">Field must not be empty! Please enter your work location.</p>
      </div>

      <div v-for="(position, index) in positions" :key="position.key">
        <div class="form-control" :class="{invalid: isInvalid.positions[index].positionName}">
          <label :for="'position' + index">Position name</label>
          <input type="text" :id="'position' + index" v-model="positions[index].positionName">
          <p v-if="isInvalid.positions[index].position">Field must not be empty. Please enter your position. </p>
        </div>
        <div class="form-control" :class="{invalid: isInvalid.positions[index].startDate}">
          <label :for="'start-date' + index">Start Date</label>
          <input type="date" :id="'start-date' + index" v-model.trim="positions[index].startDate">
          <p v-if="isInvalid.positions[index].startDate">Field can not be empty! Please enter start date.</p>
        </div>
        <div class="form-control" :class="{invalid: isInvalid.positions[index].endDate}">
          <label :for="'end-date' + index">End Date</label>
          <input type="date" :id="'end-date' + index" v-model.trim="positions[index].endDate">
          <p v-if="isInvalid.positions[index].endDate">End date can not be before start date! Please check your
            entries.</p>
        </div>
        <div class="form-control" :class="{invalid: isInvalid.positions[index].description}">
          <label :for="'description' + index">Description</label>
          <textarea rows="5" :id="'description' + index" v-model.trim="positions[index].description"></textarea>
          <p v-if="isInvalid.positions[index].description">Please enter description of your work duties.</p>
        </div>


      </div>

      <button type="button" @click="addAdditionalPosition">Add additional position</button>
      <button v-if="isEdit" type="submit">Submit Edit</button>
      <button v-else type="submit">Submit</button>

    </form>
  </div>

</template>

<script>


export default {
  name: "WorkExperienceForm",

  emits: ['work-experience-submitted'],
  inject: ['editKey', 'edit'],

  data() {

    return {
      key: this.editKey,
      isEdit: this.edit,

      isInvalid: {
        companyName: false,
        location: false,
        positions: [{
          positionName: false,
          startDate: false,
          endDate: false,
          description: false,
        }]
      },

      companyName: '',
      location: '',
      positions: [{

        positionName: '',
        startDate: '',
        endDate: '',
        description: '',
      }]

    }
  },
  created() {
    if (this.isEdit) {
      this.getWorkExperience(this.key)
    }
  },

  methods: {

    submitEdit: function () {
      this.$http.patch(`https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/work-experience/${this.key}.json`, {
            companyName: this.companyName,
            location: this.location,
            positions: this.positions,
          }
          // eslint-disable-next-line no-unused-vars
      ).then(response => {
        this.$store.dispatch('setAlert', {
          alertMessage: 'Work experience was edited successfully',
          isSuccess: true,
        });


        // eslint-disable-next-line no-unused-vars
      }).catch(error => {
        this.$store.dispatch('setAlert', {
          alertMessage: 'Editing work experience failed. Try again.',
          isSuccess: false,
        });
      })
    },


    getWorkExperience: function (key) {
      this.$http.get(`https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/work-experience/${key}.json`)
          .then(response => {
            this.companyName = response.data.companyName;
            this.location = response.data.location
            this.positions = response.data.positions
            this.isInvalid.positions = this.positions.map(() => ({
              positionName: false,
              startDate: false,
              endDate: false,
              description: false,
            }));
          }).catch(error => {
        this.$store.dispatch('setAlert', {
          alertMessage: 'Pre-populating fields failed. Please try again.',
          isSuccess: false,
        });

        console.log(error)
      })
    },

    validateInput() {
      this.isInvalid.companyName = this.companyName === '';
      this.isInvalid.location = this.location === '';


      this.positions.forEach((position, index) => {
            this.isInvalid.positions[index].positionName = position.positionName === '';
            this.isInvalid.positions[index].startDate = position.startDate === '';
            this.isInvalid.positions[index].endDate = position.startDate > position.endDate && position.endDate !== '';
            this.isInvalid.positions[index].description = position.description === '';
          }
      );
      if (this.isInvalid.companyName ||
          this.isInvalid.location ||
          this.isInvalid.positions.some((position) => position.positionName) ||
          this.isInvalid.positions.some((position) => position.startDate) ||
          this.isInvalid.positions.some((position) => position.endDate) ||
          this.isInvalid.positions.some((position) => position.description)) {
        return;

      } else {
        if (this.isEdit) {
          this.submitEdit()
        } else {
          this.submitWorkExperiences()
        }

      }


    },

    addAdditionalPosition: function () {
      this.isInvalid.positions.push({
        positionName: false,
      })
      this.positions.push({
        positionName: '', startDate: '', endDate: '', description: ''

      });

    },
    submitWorkExperiences: function () {
      this.$http.post("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/work-experience.json", {
        companyName: this.companyName,
        location: this.location,
        positions: this.positions,


        // eslint-disable-next-line no-unused-vars
      }).then(response => {
        this.$store.dispatch('setAlert', {
          alertMessage: 'Work experience was added successfully!',
          isSuccess: true,
        });


        // eslint-disable-next-line no-unused-vars
      }).catch(error => {
        this.$store.dispatch('setAlert', {
          alertMessage: 'Submitting work experience failed. Try again.',
          isSuccess: false,
        });
      })
    },


  },


}


</script>

<style scoped>

.form-control {
  margin: 0.5rem 0;
}

.form-control.invalid input {
  border-color: red;
}

.form-control.invalid textarea {
  border-color: red;
}

.form-control.invalid label {
  color: red;
}
</style>
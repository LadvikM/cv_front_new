<template>
  <form @submit.prevent="validateInput">

    <div class="form-element" :class="{invalid: isInvalid.institution}">
      <label for="institution">Institution</label>
      <input id="institution" type="text" v-model.trim="this.educations.institution">
    </div>
    <div class="form-element" :class="{invalid: isInvalid.location}">
      <label for="location">Location</label>
      <input id="location" type="text" v-model.trim="this.educations.location">
    </div>
    <div v-for="(subject, index) in educations.subjects" :key="subject.key">
      <div class="form-element" :class="{invalid: isInvalid.subjects[index].subject}">
        <label for="subject">Subject</label>
        <input id="subject" type="text" v-model.trim="this.educations.subjects[index].subject">
      </div>
      <div class="form-element" :class="{invalid: isInvalid.subjects[index].degree}">
        <label for="degree">Degree</label>
        <input id="degree" type="text" v-model.trim="this.educations.subjects[index].degree">
      </div>
      <div class="form-element" :class="{invalid: isInvalid.subjects[index].startDate}">
        <label for="start-date">Start Date</label>
        <input id="start-date" type="date" v-model.trim="this.educations.subjects[index].startDate">
      </div>
      <div class="form-element" :class="{invalid: isInvalid.subjects[index].endDate}">
        <label for="end-date">End Date</label>
        <input id="end-date" type="date" v-model.trim="this.educations.subjects[index].endDate">
      </div>
      <div class="form-element" :class="{invalid: isInvalid.subjects[index].description}">
        <label for="description">Description</label>
        <textarea id="description" rows="5" v-model.trim="this.educations.subjects[index].description"></textarea>
      </div>
    </div>

    <base-button type="button" @click="addAdditionalSubject">Add additional subject</base-button>
    <base-button v-if="!isEdit" type="submit">Submit</base-button>
    <base-button v-if="isEdit" type="button" @click="validateInput">Submit Edit</base-button>

  </form>
</template>
<script>
import BaseButton from "@/ui/BaseButton.vue"

export default {
  name: 'EducationForm',
  components: {BaseButton},
  inject: ['educationKey'],
  data() {
    return {

      isEdit: false,
      isInvalid: {
        institution: false,
        location: false,
        subjects: [{
          subject: false,
          degree: false,
          startDate: false,
          endDate: false,
          description: false,

        }]
      },
      educations: {
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
  created() {
    if (this.educationKey !== '') {
      this.isEdit = true;
      this.getEducation(this.educationKey)
    }
  },

  methods: {
    validateInput() {
      // Mark field invalid, if empty
      this.isInvalid.institution = this.educations.institution === '';
      this.isInvalid.location = this.educations.location === '';
      this.educations.subjects.forEach((subject, index) => {
        this.isInvalid.subjects[index].subject = subject.subject === '';
        this.isInvalid.subjects[index].degree = subject.degree === '';
        this.isInvalid.subjects[index].startDate = subject.startDate === '';
        this.isInvalid.subjects[index].endDate = subject.startDate > subject.endDate;
        this.isInvalid.subjects[index].description = subject.description === '';
      });
      // Check if any field is invalid
      if (this.isInvalid.institution || this.isInvalid.location ||
          this.isInvalid.subjects.some((subject) => subject.positionName) ||
          this.isInvalid.subjects.some((subject) => subject.degree) ||
          this.isInvalid.subjects.some((subject) => subject.startDate) ||
          this.isInvalid.subjects.some((subject) => subject.endDate) ||
          this.isInvalid.subjects.some((subject) => subject.description)
      ) {
        return
      } else {
        if (this.isEdit) {
          this.editEducation()
        } else {
          this.submitEducation()
        }
      }
    },
    editEducation: function () {
      this.$http.put(`https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/education/${this.educationKey}.json`, this.educations

      ).then(() => {
        this.$store.dispatch('setAlert', {
          alertMessage: 'Editing was successful!',
          isSuccess: true,
        })
      }).catch(error => {
        this.$store.dispatch('setAlert', {
          alertMessage: 'Editing failed. Try again.',
          isSuccess: false,
        })
        console.log(error)
      })
    },

    getEducation: function (key) {
      this.$http.get(`https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/education/${key}.json`)
          .then(response => {
            this.educations = response.data;
            this.isInvalid.subjects = this.educations.subjects.map(() => ({
              subject: false,
              degree: false,
              startDate: false,
              endDate: false,
              description: false,
            }));
          })
          .catch(error => {
            this.$store.dispatch('setAlert', {
              alertMessage: 'Pre-populating fields failed. Try again.',
              isSuccess: false,
            })
            console.log(error)
          })
    },
    submitEducation: function () {
      this.$http.post("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/education.json", this.educations
      ).then(() => {
        this.$store.dispatch('setAlert', {
          alertMessage: 'Education was added successfully!',
          isSuccess: true,
        });
      }).catch(error => {
        this.$store.dispatch('setAlert', {
          alertMessage: 'Adding education failed',
          isSuccess: false,
        });
        console.log(error)
      })
    },
    addAdditionalSubject: function () {
      this.isInvalid.subjects.push({
        subject: false, degree: false, startDate: false, endDate: false, description: false
      })
      this.educations.subjects.push({
        subject: '', degree: '', startDate: '', endDate: '', description: ''

      });

    },

  },
}
</script>
<style scoped>
.form-element.invalid input {
  border-color: red;
}

.form-element.invalid textarea {
  border-color: red;
}

.form-element.invalid label {
  color: red;
}
</style>

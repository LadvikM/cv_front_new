<template>
  <form @submit.prevent="validateEntries">
    <div>
      <label for="project-name">Project Name</label>
      <input id="project-name" type="text" v-model.trim="projects.projectName">
    </div>
    <div>
      <label for="project-link">Project Link</label>
      <input id="project-link" type="url" v-model.trim="projects.projectLink">
    </div>
    <div>
      <label for="project-description">Project Description</label>
      <textarea id="project-description" rows="5" v-model.trim="projects.projectDescription"></textarea>
    </div>
    <base-button v-if="!isEdit" type="submit">Submit</base-button>
    <base-button v-if="isEdit" type="button" @click="validateEntries">Submit Edit</base-button>
  </form>
</template>
<script>
import BaseButton from "@/ui/BaseButton.vue"

export default {
  name: 'ProjectsForm',
  components: {BaseButton},
  inject: ['projectKey'],
  data() {
    return {
      formIsValid: true,
      isEdit: false,
      projects: {
        projectName: '',
        projectLink: '',
        projectDescription: '',
      }
    }
  },
  created() {
    if (this.projectKey !== '') {
      this.isEdit = true;
      this.getProject(this.projectKey);
    }
  },
  methods: {
    validateEntries() {
      if (this.projects.projectName === '' || this.projects.projectLink === '' || this. projects.projectDescription === '') {
        this.formIsValid = false;
        this.$store.dispatch('setAlert', {
          alertMessage: 'All fields must be filled!',
          isSuccess: false,
        })
      } else {
        if (this.isEdit === false) {
          this.postProject();
        } else {
          this.editProject();
        }
      }
    },

    editProject: function () {
      this.$http.put(`https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/projects/${this.projectKey}.json`, this.projects
      ).then(() => {
        this.$store.dispatch('setAlert', {
          alertMessage: 'Edit was successful.',
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

    getProject: function (key) {
      this.$http.get(`https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/projects/${key}.json`)
          .then(response => {
            this.projects = response.data
          })
          .catch(error => {
            this.$store.dispatch('setAlert', {
              alertMessage: 'Pre-populating fields failed. Try again.',
              isSuccess: false,
            })
            console.log(error)
          })
    },
    postProject: function () {
      this.$http.post("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/projects.json", this.projects
      ).then(() => {
        this.$store.dispatch('setAlert', {
          alertMessage: 'Adding project was successful.',
          isSuccess: true,
        })
      }).catch(error => {
        console.log(error)
      })
    },
  }
}
</script>

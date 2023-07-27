<template>
  <div class="projects">

      <base-spinner v-if="isLoading"></base-spinner>

    <div v-if="!isLoading">
      <div v-if="isLoggedIn">
        <base-button  v-if="!isFormView" @click="toggleForm">Add Project</base-button>
        <base-button v-else @click="toggleForm">Cancel</base-button>
      </div>
      <div v-if="isFormView">
        <projects-form></projects-form>
      </div>
      <div class="page-header">
        <h1>Overview of my projects</h1>
      </div>
      <div class="project" v-for="project in projects" :key="project.key">
        <div v-if="!isFormView">
          <h1 class="project-name">{{ project.projectName }}</h1>
          <a :href="project.projectLink"><base-button>See code</base-button></a>
          <p>{{ project.projectDescription }}</p>
          <base-button v-if="isLoggedIn" @click="deleteProject(project.id)">Delete</base-button>
          <base-button v-if="isLoggedIn" @click="editProject(project.id)">Edit</base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/ui/BaseButton.vue";
import ProjectsForm from "@/components/projects/ProjectsForm.vue";
import {computed} from "vue";
import BaseSpinner from "@/ui/BaseSpinner.vue";

export default {
  name: "ProjectsView",
  components: {BaseSpinner, ProjectsForm, BaseButton},
  emits: ['forceRerender'],
  data() {
    return {
      isLoading: false,
      isEdit: false,
      isFormView: false,
      projectKey: '',
      projects: {
        id: '',
        projectName: '',
        projectLink: '',
        projectDescription: '',
      }

    }
  },
  provide() {
    return {
      projectKey: computed(() => this.projectKey)
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    toggleForm() {
      this.isFormView = !this.isFormView
    },

    editProject(key) {
      this.projectKey = key;
      this.isFormView = true;
    },
    getProjects: function () {
      this.isLoading = true;
      this.$http.get("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/projects.json")
          .then(response => {

            this.projects = response.data;
            for (const key in response.data) {
              this.projects[key].id = key
            }
            this.isLoading = false;
          })
          .catch(error => {
            console.log(error)
            this.isLoading = false;
          })
    },
    deleteProject: function (key) {
      this.$http.delete(`https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/projects/${key}.json`)
          .then(() => {
            this.$emit('forceRerender')
            this.$store.dispatch('setAlert', {
              alertMessage: 'Entry was successfully deleted',
              isSuccess: true,
            })
          })
          .catch(error => {
            this.$store.dispatch('setAlert', {
              alertMessage: 'Deleting entry failed.',
              isSuccess: false,
            })
            console.log(error)
          })
    },


  },
  created() {
    this.getProjects()
  }
}
</script>
<style scoped>
.page-header {
  padding: 2rem
}
.project {
  background-color: rgba(255, 255, 255, 0.05);
}
</style>

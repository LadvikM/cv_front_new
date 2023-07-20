<template>


    <div>
      <button class="beautiful-button" @click="toggleForm" v-if="isLoggedIn">Add Work Experience</button>
      <work-experience-form v-if="showForm" @workExperienceSubmitted="toggleForm"></work-experience-form>


      <work-experience v-else :key="componentKey" @force-rerender="forceRerender" @edit-entry="showEdit"></work-experience>


    </div>

</template>

<script>

import WorkExperienceForm from "@/components/work-experience/WorkExperienceForm.vue";
import WorkExperience from "@/components/work-experience/WorkExperience.vue";
import {computed} from "vue";

export default {
  name: "WorkView",
  components: {WorkExperience, WorkExperienceForm},
  data() {
    return {
      showForm: false,
      isEdit: false,
      componentKey: 0,
      editKey: '',
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  provide() {
    return {
      editKey: computed(() => this.editKey),
      edit: computed(() => this.isEdit)
    }
  },
  methods: {

    toggleForm() {
      this.showForm = !this.showForm;

    },
    showEdit(editProps) {
      this.editKey = editProps;
      this.isEdit = true;
      this.toggleForm()

    },
    forceRerender() {
      this.componentKey += 1;

    }
  },


}
</script>

<style scoped>
/* Button Styles */
.beautiful-button {
  display: inline-block;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  color: black;
  background-color: yellow;
  border: none;
  transition: background-color 0.5s ease, color 0.5s ease;
  cursor: pointer;
}

.beautiful-button:hover {
  background-color: #42b983;
  color: white;
}

.beautiful-button:active {
  background-color: #d62849;
}
</style>
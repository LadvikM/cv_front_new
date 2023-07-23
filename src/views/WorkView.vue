<template>
    <div>
      <base-button @click="toggleForm" v-if="isLoggedIn">Add Work Experience</base-button>
      <work-experience-form v-if="showForm" @workExperienceSubmitted="toggleForm"></work-experience-form>
      <work-experience v-else :key="componentKey" @force-rerender="forceRerender" @edit-entry="showEdit"></work-experience>
    </div>
</template>

<script>

import WorkExperienceForm from "@/components/work-experience/WorkExperienceForm.vue";
import WorkExperience from "@/components/work-experience/WorkExperience.vue";
import {computed} from "vue";
import BaseButton from "@/ui/BaseButton.vue";

export default {
  name: "WorkView",
  components: {BaseButton, WorkExperience, WorkExperienceForm},
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

</style>
<template>

  <base-card>
    <div>
      <button @click="toggleForm">Add Work Experience</button>
      <work-experience-form v-if="showForm" @workExperienceSubmitted="toggleForm"></work-experience-form>


      <work-experience v-else :key="componentKey" @force-rerender="forceRerender" @edit-entry="showEdit"></work-experience>


    </div>
  </base-card>
</template>

<script>
import BaseCard from "@/ui/BaseCard.vue";
import WorkExperienceForm from "@/components/work-experience/WorkExperienceForm.vue";
import WorkExperience from "@/components/work-experience/WorkExperience.vue";
import {computed} from "vue";

export default {
  name: "WorkView",
  components: {WorkExperience, WorkExperienceForm, BaseCard},
  data() {
    return {
      showForm: false,
      isEdit: false,
      componentKey: 0,
      editKey: '',
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
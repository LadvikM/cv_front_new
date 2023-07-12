<template>

  <base-card>
    <div>
      <button @click="toggleEdit">Add Work Experience</button>
      <add-work-experience v-if="isEdit" @workExperienceSubmitted="this.isEdit = false"></add-work-experience>
      <work-experience v-else></work-experience>


    </div>
  </base-card>
</template>

<script>
import BaseCard from "@/ui/BaseCard.vue";
import AddWorkExperience from "@/components/work-experience/AddWorkExperience.vue";
import WorkExperience from "@/components/work-experience/WorkExperience.vue";

export default {
  name: "WorkView",
  components: {WorkExperience, AddWorkExperience, BaseCard},
  data() {
    return {
      isEdit: false,
    }
  },
  methods: {
    toggleEdit() {
      this.isEdit = !this.isEdit;
    }
  },


}
</script>

<style scoped>

</style>
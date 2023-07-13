<template>

  <base-card>
    <div>
      <button @click="toggleEdit">Add Work Experience</button>
      <add-work-experience v-if="isAdd" @workExperienceSubmitted="this.isAdd = false"></add-work-experience>
      <work-experience v-else :key="componentKey" @force-rerender="forceRerender"></work-experience>


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
      isAdd: false,
      componentKey: 0,
    }
  },
  methods: {
    toggleEdit() {
      this.isAdd = !this.isAdd;
    },
    forceRerender() {
      this.componentKey += 1;

    }
  },


}
</script>

<style scoped>

</style>
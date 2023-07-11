<template>

  <base-card>
    <div>
      <button @click="toggleEdit">Edit</button>
      <edit-work-experience v-if="isEdit"></edit-work-experience>
      <work-experience v-else></work-experience>


    </div>
  </base-card>
</template>

<script>
import BaseCard from "@/ui/BaseCard.vue";
import EditWorkExperience from "@/components/work-experience/EditWorkExperience.vue";
import WorkExperience from "@/components/work-experience/WorkExperience.vue";

export default {
  name: "WorkView",
  components: {WorkExperience, EditWorkExperience, BaseCard},
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
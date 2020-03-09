<template>
  <ConstructionsList module="photofixations" @choose="chooseConstruction" />
</template>

<script>
import ConstructionsList from "./ConstructionsList";
export default {
  name: "PhotoFixationsNav",
  components: {
    ConstructionsList
  },
  data() {
    return {};
  },
  methods: {
    chooseConstruction(item) {
      this.$store.commit("photofixations/setLoadingStatus", true);
      this.$store
        .dispatch("photofixations/getAllPhotos", {
          projectId: item.id,
          page: 0
        })
        .then(() => {
          this.$store.commit("photofixations/setLoadingStatus", false);
        })
        .catch(error => {
          this.$notify({
            group: "warn",
            type: "error",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: error
          });
        });
      this.$store.dispatch("photofixations/setConstruction", item);
    }
  }
};
</script>

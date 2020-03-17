<template>
  <ConstructionsList
    ref="constructionsList"
    module="photofixations"
    @choose="chooseConstruction"
  />
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
          setTimeout(() => {
            this.$store.commit("photofixations/setLoadingStatus", false);
          }, 500);
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
    },
    changeShowConst() {
      this.$refs.constructionsList.showAddModal = true;
    }
  }
};
</script>

<template>
  <ConstructionsList
    ref="constructionsList"
    module="furniture"
    @choose="chooseConstruction"
  />
</template>

<script>
import ConstructionsList from "./ConstructionsList";
export default {
  name: "FurnitureNav",
  components: {
    ConstructionsList
  },
  data() {
    return {};
  },
  methods: {
    chooseConstruction(item) {
      this.$store.state.furniture.totalSum = {};
      this.$store.commit("furniture/setLoadingStatus", true);
      this.$store
        .dispatch("furniture/getFurniture", { projectId: item.id })
        .then(() => {
          setTimeout(() => {
            this.$store.commit("furniture/setLoadingStatus", false);
          }, 500);
        });
      this.$store.dispatch("furniture/setConstruction", item);
    },
    changeShowConst() {
      this.$refs.constructionsList.showAddModal = true;
    }
  }
};
</script>

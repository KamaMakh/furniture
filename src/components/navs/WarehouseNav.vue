<template>
  <ConstructionsList
    ref="constructionsList"
    module="warehouse"
    @choose="chooseConstruction"
  />
</template>

<script>
import ConstructionsList from "./ConstructionsList";
export default {
  name: "WarehouseNav",
  components: {
    ConstructionsList
  },
  data() {
    return {};
  },
  methods: {
    chooseConstruction(item) {
      // this.$store.state.furniture.totalSum = {};
      this.$store.commit("warehouse/setLoadingStatus", true);
      this.$store
        .dispatch("warehouse/getProjectGroups", {
          projectId: item.id
        })
        .then(() => {
          setTimeout(() => {
            this.$store.commit("warehouse/setLoadingStatus", false);
          }, 500);
        });
      this.$store.dispatch("warehouse/setConstruction", item);
    },
    changeShowConst() {
      this.$refs.constructionsList.showAddModal = true;
    }
  }
};
</script>

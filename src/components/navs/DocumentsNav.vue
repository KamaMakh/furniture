<template>
  <ConstructionsList
    ref="constructionsList"
    module="documents"
    @choose="chooseConstruction"
  />
</template>

<script>
import ConstructionsList from "./ConstructionsList";

export default {
  name: "DocumentsNav",
  components: {
    ConstructionsList
  },
  data() {
    return {};
  },
  methods: {
    chooseConstruction(item) {
      this.$store
        .dispatch("documents/getDocuments", { projectId: item.id })
        .catch(error => {
          this.$notify({
            group: "warn",
            type: "error",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: error
          });
        });
      this.$store.dispatch("documents/setConstruction", item);
    },
    changeShowConst() {
      this.$refs.constructionsList.showAddModal = true;
    }
  }
};
</script>

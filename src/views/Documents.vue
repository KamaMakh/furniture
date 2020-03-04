<template>
  <div class="flex-grow-1 furniture">
    <div class="col col-12 p-0">
      <TableDocuments ref="table" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TableDocuments from "@/components/tables/TableDocuments";
export default {
  name: "Documents",
  components: {
    TableDocuments
  },
  computed: {
    ...mapState({
      modules: state => state.user.modules
    })
  },
  mounted() {
    eslint-disable-next-line
    ym(57324937, "hit", "#/documents", {
      title: "Документы",
      referer: document.referrer
    });
    return new Promise(() => {
      this.$store.dispatch("furniture/getConstructions").then(() => {
        // this.setDefaultData();
      });
    });
    // this.$store.dispatch("projects/requestModule", "Документы");
  }
};
</script>

<style scoped></style>

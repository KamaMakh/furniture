<template>
  <div class="flex-grow-1 furniture">
    <div class="col col-12 p-0">
      <TableDocuments :leftMenuShow="leftMenuShow" ref="table" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TableDocuments from "@/components/tables/TableDocuments";
export default {
  name: "Documents",
  props: ["leftMenuShow"],
  components: {
    TableDocuments
  },
  computed: {
    ...mapState({
      modules: state => state.user.modules
    })
  },
  methods: {
    setDefaultData() {
      if (
        !this.$store.state.documents.documents.length &&
        this.$store.state.furniture.constructions[0]
      ) {
        this.$store.dispatch("documents/getDocuments", {
          projectId: this.$store.state.furniture.constructions[0]["id"]
        });
        if (this.$store.state.documents.construction.id === undefined) {
          this.$store.dispatch(
            "documents/setConstruction",
            this.$store.state.furniture.constructions[0]
          );
        }
      }
    }
  },
  mounted() {
    /* eslint-disable-next-line */
    ym(57324937, "hit", "#/documents", {
      title: "Документы",
      referer: document.referrer
    });
    return new Promise(() => {
      this.$store.dispatch("furniture/getConstructions").then(() => {
        this.setDefaultData();
      });
    });
    // this.$store.dispatch("projects/requestModule", "Документы");
  }
};
</script>

<style scoped></style>

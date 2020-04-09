<template>
  <div class="flex-grow-1 furniture">
    <div class="col col-12 pa-0">
      <h1-component :name="$t('documentsH1')" icon="document" />
      <TableDocuments
        :leftMenuShow="leftMenuShow"
        ref="table"
        @createConstruction="createConstruction"
      />
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
      if (this.$store.state.documents.constructions[0]) {
        this.$store
          .dispatch("documents/getDocuments", {
            projectId: this.$store.state.documents.constructions[0]["id"]
          })
          .then(() => {
            setTimeout(() => {
              this.$store.commit("documents/setLoadingStatus", false);
            }, 500);
          });
        this.$store.dispatch(
          "documents/setConstruction",
          this.$store.state.documents.constructions[0]
        );
        this.$store.state.emptyConstructions = false;
      } else {
        setTimeout(() => {
          this.$store.commit("documents/setLoadingStatus", false);
        }, 500);
        this.$store.state.documents.construction = {};
        this.$store.state.emptyConstructions = true;
      }
    },
    createConstruction() {
      this.$emit("createConstruction");
    }
  },
  mounted() {
    this.$store.state.documents.construction = {};
    this.$store.commit("documents/setLoadingStatus", true);
    /* eslint-disable-next-line */
    ym(57324937, "hit", "#/documents", {
      title: "Документы",
      referer: document.referrer
    });
    return new Promise(() => {
      this.$store.dispatch("documents/getConstructions").then(() => {
        this.setDefaultData();
      });
    });
    // this.$store.dispatch("projects/requestModule", "Документы");
  }
};
</script>

<style scoped></style>

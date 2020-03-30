<template>
  <div>
    <v-row>
      <v-col cols="12" md="5">
        <chantierTable />
      </v-col>
      <v-col cols="12" md="7">
        <storageTable />
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import storageTable from "@/components/warehouse/storageTable";
import chantierTable from "@/components/warehouse/chantierTable";
export default {
  name: "Warehouse",
  props: ["leftMenuShow"],
  components: {
    storageTable,
    chantierTable
  },
  data() {
    return {
      isFirstOpen: true
    };
  },
  mounted() {
    this.$store.state.warehouse.construction = {};
    /* eslint-disable-next-line */
    // ym(57324937, "hit", "#/warehouse", {
    //   title: "Склад",
    //   referer: document.referrer
    // });
    return new Promise(() => {
      this.$store.dispatch("warehouse/getWarehouse");
      this.$store.dispatch("warehouse/getConstructions").then(() => {
        this.setDefaultData();
      });
    });
  },
  methods: {
    setDefaultData() {
      if (this.$store.state.warehouse.constructions[0]) {
        this.$store.commit("warehouse/setLoadingStatus", true);
        this.$store
          .dispatch("warehouse/getProjectGroups", {
            projectId: this.$store.state.warehouse.constructions[0]["id"]
          })
          .then(() => {
            setTimeout(() => {
              this.$store.commit("warehouse/setLoadingStatus", false);
            }, 500);
          });
        this.$store.dispatch(
          "warehouse/setConstruction",
          this.$store.state.warehouse.constructions[0]
        );
        this.$store.state.emptyConstructions = false;
      } else {
        setTimeout(() => {
          this.$store.commit("warehouse/setLoadingStatus", false);
        }, 500);
        this.$store.state.warehouse.construction = {};
        // this.$store.state.emptyConstructions = true;
      }
      this.isFirstOpen = false;
    },
    createConstruction() {
      this.$emit("createConstruction");
    }
  }
};
</script>

<style scoped></style>

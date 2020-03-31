<template>
  <div class="flex-grow-1 statistics">
    <!--<div class="tables-wrap row">-->
    <!--<div class="tables-wrap__left col col-lg-6 col-md-12 col-sm-12">-->
    <!--<TableOperations />-->
    <!--</div>-->
    <!--<div class="tables-wrap__right col col-lg-6 col-md-12 col-sm-12">-->
    <!--<TableAllOperations />-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
/*eslint-disable*/
import { mapState } from "vuex";
// import TableOperations from "@/components/tables/TableOperations";
// import TableAllOperations from "@/components/tables/TableAllOperations";
export default {
  name: "Statistics",
  props: ["leftMenuShow"],
  data() {
    return {
      isFirstOpen: true
    };
  },
  components: {
    // TableOperations,
    // TableAllOperations
  },
  mounted() {
    this.$store.state.warehouse.construction = {};
    /* eslint-disable-next-line */
    ym(57324937, "hit", "#/statistics", {
      title: "Статистика",
      referer: document.referrer
    });
    return new Promise(() => {
      // this.$store.dispatch("statistics/getWarehouse");
      this.$store.dispatch("statistics/getConstructions").then(() => {
        this.setDefaultData();
      });
    });
  },
  methods: {
    setDefaultData() {
      if (this.$store.state.warehouse.constructions[0]) {
        this.$store.commit("statistics/setLoadingStatus", true);
        this.$store
          .dispatch("statistics/getProjectGroups", {
            projectId: this.$store.state.warehouse.constructions[0]["id"]
          })
          .then(() => {
            setTimeout(() => {
              this.$store.commit("statistics/setLoadingStatus", false);
            }, 500);
          });
        this.$store.dispatch(
          "statistics/setConstruction",
          this.$store.state.warehouse.constructions[0]
        );
        this.$store.state.emptyConstructions = false;
      } else {
        setTimeout(() => {
          this.$store.commit("statistics/setLoadingStatus", false);
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

<style scoped lang="scss">
  @media all and(max-width: 480px) {
    .statistics{
      max-width: 100%;
      overflow-x: scroll;
    }
  }
</style>

<template>
  <div class="flex-grow-1 statistics">
    <v-row>
      <v-col>
        <statisticsTable />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import statisticsTable from "@/components/statistics/statisticsTable";
export default {
  name: "Statistics",
  props: ["leftMenuShow"],
  components: {
    statisticsTable
  },
  data() {
    return {
      isFirstOpen: true
    };
  },
  mounted() {
    this.$store.state.statistics.construction = {};
    /* eslint-disable-next-line */
    ym(57324937, "hit", "#/statistics", {
      title: "Статистика",
      referer: document.referrer
    });
    return new Promise(() => {
      this.$store.dispatch("statistics/getConstructions").then(() => {
        this.setDefaultData();
      });
    });
  },
  methods: {
    setDefaultData() {
      if (this.$store.state.statistics.constructions[0]) {
        this.$store.commit("statistics/setLoadingStatus", true);
        this.$store
          .dispatch("statistics/getAllTransfers", {
            projectId: this.$store.state.statistics.constructions[0]["id"],
            page: 0
          })
          .then(() => {
            setTimeout(() => {
              this.$store.commit("statistics/setLoadingStatus", false);
            }, 500);
          });
        this.$store.dispatch(
          "statistics/setConstruction",
          this.$store.state.statistics.constructions[0]
        );
        this.$store.state.emptyConstructions = false;
      } else {
        setTimeout(() => {
          this.$store.commit("statistics/setLoadingStatus", false);
        }, 500);
        this.$store.state.statistics.construction = {};
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
  .statistics {
    max-width: 100%;
    overflow-x: scroll;
  }
}
</style>

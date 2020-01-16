<template>
  <div class="flex-grow-1 statistics">
    <div class="tables-wrap row">
      <div class="tables-wrap__left col col-lg-6 col-md-12 col-sm-12">
        <TableOperations />
      </div>
      <div class="tables-wrap__right col col-lg-6 col-md-12 col-sm-12">
        <TableAllOperations />
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import { mapState } from "vuex";
import TableOperations from "@/components/tables/TableOperations";
import TableAllOperations from "@/components/tables/TableAllOperations";
export default {
  name: "Statistics",
  components: {
    TableOperations,
    TableAllOperations
  },
  computed: {
    ...mapState({
      modules: state => state.user.modules
    })
  },
  mounted() {
    if(this.modules.indexOf(this.$route.name) < 0) {
      this.$router.push("/settings");
      return;
    }
    return new Promise((resolve, reject) => {
      this.$store.dispatch("furniture/getConstructions")
        .then((response) => {
          if(!this.$store.state.furniture.furniture.groups && this.$store.state.furniture.constructions[0]) {
            this.$store.dispatch("furniture/getFurniture", {"projectId":this.$store.state.furniture.constructions[0]["id"]});
            this.$store.dispatch("furniture/setConstruction", {
              "id":this.$store.state.furniture.constructions[0]["id"],
              "name":this.$store.state.furniture.constructions[0]["name"],
            });
          }
        });
    })
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

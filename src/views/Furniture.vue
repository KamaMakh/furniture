<template>
  <div class="flex-grow-1 furniture">
    <div class="col col-12 p-0">
      <TableFurniture/>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import { mapState } from "vuex";
import TableFurniture from '@/components/tables/TableFurniture';
export default {
  name: "Furniture",
  components:{
    TableFurniture
  },
  data(){
      return{}
  },
  mounted() {
    return new Promise((resolve, reject) => {
      this.$store.dispatch("furniture/getConstructions")
        .then((response) => {
          if(!this.$store.state.furniture.furniture.groups && this.$store.state.furniture.constructions[0]) {
            this.$store.dispatch("furniture/getFurniture", {"projectId":this.$store.state.furniture.constructions[0]["id"]});
            this.$store.dispatch("furniture/setConstruction", this.$store.state.furniture.constructions[0]);
          }
        });
    })
  }
}
</script>

<style scoped lang="scss">
.furniture{
  overflow-x: scroll;
}
</style>

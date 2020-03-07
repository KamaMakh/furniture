<template>
  <div class="flex-grow-1 furniture">
    <div class="col col-12 p-0">
      <TableFurniture ref="table" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TableFurniture from "@/components/tables/TableFurniture";
export default {
  name: "Furniture",
  components: {
    TableFurniture
  },
  data() {
    return {
      isFirstOpen: true,
      furnitureFromUri: {}
    };
  },
  computed: {
    ...mapState({
      rows: state => state.furniture.furniture.groups || []
    })
  },
  mounted() {
    /* eslint-disable-next-line */
    ym(57324937, "hit", "#/furniture", {
      title: "Фурнитура",
      referer: document.referrer
    });
    return new Promise(() => {
      this.$store.dispatch("furniture/getConstructions").then(() => {
        this.setDefaultData();
      });
    });
  },
  methods: {
    setDefaultData() {
      if (window.location.href.indexOf("?") > -1 && this.isFirstOpen) {
        let href = window.location.href.split("?")[1].split("&"),
          arr = [];
        href.forEach(item => {
          if (item.indexOf("=") > -1) {
            let localItem = item.split("=");
            arr[localItem[0]] = localItem[1];
          }
        });
        if (arr["constructionId"] !== undefined) {
          if (this.$store.state.furniture.constructions.length) {
            this.$store.state.furniture.constructions.forEach(item => {
              if (item.id && item.id === parseInt(arr["constructionId"])) {
                this.$store
                  .dispatch("furniture/getFurniture", {
                    projectId: parseInt(item.id)
                  })
                  .then(() => {
                    if (arr["groupId"] !== undefined && this.rows.length) {
                      this.rows.forEach(group => {
                        if (group.id && group.id === parseInt(arr["groupId"])) {
                          this.$store
                            .dispatch("furniture/setNomenclature", group)
                            .then(response => {
                              this.$refs.table.enabledGroups[group.id] = true;
                              if (
                                arr["furnitureId"] !== undefined &&
                                response.data.length
                              ) {
                                response.data.forEach(furniture => {
                                  if (
                                    furniture.id &&
                                    furniture.id ===
                                      parseInt(arr["furnitureId"])
                                  ) {
                                    this.$refs.table.showEditNomenclature(
                                      furniture
                                    );
                                  }
                                });
                              }
                            });
                          return;
                        }
                      });
                    }
                  });
                this.$store.dispatch("furniture/setConstruction", item);
                return;
              }
            });
          }
        }
      } else {
        if (this.$store.state.furniture.constructions[0]) {
          this.$store.dispatch("furniture/getFurniture", {
            projectId: this.$store.state.furniture.constructions[0]["id"]
          });
          // if (this.$store.state.furniture.construction.id === undefined) {
          this.$store.dispatch(
            "furniture/setConstruction",
            this.$store.state.furniture.constructions[0]
          );
          // }
        }
      }
      this.isFirstOpen = false;
    }
  }
};
</script>

<style scoped lang="scss">
.furniture {
  /*overflow-x: scroll;*/
}
</style>

<template>
  <div class="flex-grow-1 furniture">
    <div class="col col-12 pa-0">
      <h1-component :name="$t('furnitureH1')" icon="cart" />
      <TableFurniture
        :leftMenuShow="leftMenuShow"
        ref="table"
        @createConstruction="createConstruction"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TableFurniture from "@/components/tables/TableFurniture";
export default {
  name: "Furniture",
  props: ["leftMenuShow"],
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
    this.$store.state.furniture.construction = {};
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
          this.$store.commit("furniture/setLoadingStatus", true);
          this.$store
            .dispatch("furniture/getFurniture", {
              projectId: this.$store.state.furniture.constructions[0]["id"]
            })
            .then(() => {
              setTimeout(() => {
                this.$store.commit("furniture/setLoadingStatus", false);
              }, 500);
            });
          this.$store.dispatch(
            "furniture/setConstruction",
            this.$store.state.furniture.constructions[0]
          );
          this.$store.state.emptyConstructions = false;
        } else {
          setTimeout(() => {
            this.$store.commit("furniture/setLoadingStatus", false);
          }, 500);
          this.$store.state.furniture.construction = {};
          this.$store.state.emptyConstructions = true;
        }
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
.furniture {
  /*overflow-x: scroll;*/
}
</style>

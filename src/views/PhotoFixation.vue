<template>
  <div class="photofixation">
    <h1-component :name="$t('photofixation')" icon="photo" />
    <PhotoFixationsList @createConstruction="createConstruction" />
  </div>
</template>

<script>
import PhotoFixationsList from "@/components/photofixations/PhotoFixationsList";
export default {
  name: "PhotoFixation",
  components: {
    PhotoFixationsList
  },
  methods: {
    setDefaultData() {
      if (this.$store.state.photofixations.constructions[0]) {
        this.$store.commit("photofixations/setLoadingStatus", true);
        this.$store
          .dispatch("photofixations/getAllPhotos", {
            projectId: this.$store.state.photofixations.constructions[0]["id"],
            page: 0
          })
          .then(() => {
            setTimeout(() => {
              this.$store.commit("photofixations/setLoadingStatus", false);
            }, 500);
          });
        if (this.$store.state.photofixations.construction.id === undefined) {
          this.$store.dispatch(
            "photofixations/setConstruction",
            this.$store.state.photofixations.constructions[0]
          );
        }
        this.$store.state.emptyConstructions = false;
      } else {
        this.$store.state.photofixations.construction = {};
        this.$store.state.emptyConstructions = true;
      }
    },
    createConstruction() {
      this.$emit("createConstruction");
    }
  },
  mounted() {
    this.$store.state.photofixations.construction = {};
    this.$store.commit("photofixations/setLoadingStatus", true);
    /* eslint-disable-next-line */
    ym(57324937, "hit", "#/photofixations", {
      title: "Фотофиксации",
      referer: document.referrer
    });
    return new Promise(() => {
      this.$store.dispatch("photofixations/getConstructions").then(() => {
        this.setDefaultData();
      });
    });
    // this.$store.dispatch("projects/requestModule", "Документы");
  }
};
</script>

<style scoped lang="scss"></style>

<template>
  <div class="photofixation">
    <PhotoFixationsList />
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
            this.$store.commit("photofixations/setLoadingStatus", false);
          });
        if (this.$store.state.photofixations.construction.id === undefined) {
          this.$store.dispatch(
            "photofixations/setConstruction",
            this.$store.state.photofixations.constructions[0]
          );
        }
      }
    }
  },
  mounted() {
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

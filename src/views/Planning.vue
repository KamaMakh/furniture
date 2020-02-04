<template>
  <div></div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Planning",
  computed: {
    ...mapState({
      modules: state => state.user.modules
    })
  },
  mounted() {
    // eslint-disable-next-line
    ym(57324937, "hit", "#/planning", {
      title: "Планинг",
      referer: document.referrer
    });
    if (this.modules.indexOf(this.$route.name) < 0) {
      this.$router.push("/settings");
      return;
    }
  }
};
</script>

<style scoped></style>

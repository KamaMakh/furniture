<template>
  <div></div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Users",
  computed: {
    ...mapState({
      modules: state => state.user.modules
    })
  },
  mounted() {
    if (this.modules.indexOf(this.$route.name) < 0) {
      this.$router.push("/settings");
      return;
    }
  }
};
</script>

<style scoped></style>

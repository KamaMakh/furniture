<template>
  <v-app>
    <notifications group="warn" />
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "AppContainer",
  created() {
    this.$i18n.locale = this.$store.state.lang;
    this.$vuetify.lang.current = this.$store.state.lang;
  }
};
</script>

<style lang="scss">
@import "assets/css/styles.css";
</style>

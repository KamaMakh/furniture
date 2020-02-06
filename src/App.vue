<template>
  <div id="app">
    <notifications group="warn" />
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "AppContainer",
  created() {
    this.$i18n.locale = this.$store.state.lang;
  }
};
</script>

<style lang="scss">
@import "assets/css/styles.css";
</style>

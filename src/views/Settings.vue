<template>
  <div class="settings">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Settings",
  mounted() {
    // eslint-disable-next-line
    ym(57324937, "hit", "#/settings", {
      title: "Настройки",
      referer: document.referrer
    });
  }
};
</script>

<style scoped lang="scss">
.settings {
  display: block;
  margin: 0 auto;
}
</style>

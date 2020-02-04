<template>
  <div class="settings">
    <SettingsBlocks />
  </div>
</template>

<script>
import SettingsBlocks from "@/components/SettingsBlocks";
export default {
  name: "Settings",
  components: {
    SettingsBlocks
  },
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
  display: inline-block;
  margin: 0 auto;
}
</style>

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
  }
};
</script>

<style scoped lang="scss">
.settings {
  display: inline-block;
  margin: 0 auto;
}
</style>

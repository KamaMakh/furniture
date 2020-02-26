<template>
  <SettingsBlocks />
</template>

<script>
import SettingsBlocks from "@/components/SettingsBlocks";
export default {
  name: "Finances",
  components: {
    SettingsBlocks
  },
  mounted() {
    // eslint-disable-next-line
    ym(57324937, "hit", "#/settings/finances", {
      title: "Финансы",
      referer: document.referrer
    });
    this.$store.dispatch("projects/requestModule", "Финансы");
  }
};
</script>

<template>
  <div style="height: 100%">
    <AppLeftNav ref="appLeftNav" :navsType="navsType" :showConst="showConst" />
  </div>
</template>

<script>
import AppLeftNav from "@/components/AppLeftNav";
export default {
  name: "AppLeft",
  props: ["navsType"],
  data() {
    return {
      showConst: false
    };
  },
  components: {
    AppLeftNav
  },
  methods: {
    changeShowConst() {
      this.$refs.appLeftNav.changeShowConst();
    }
  }
};
</script>

<style scoped lang="scss"></style>

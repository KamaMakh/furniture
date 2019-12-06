<template>
  <div style="height: 100%">
    <AppLeftNav :navsType="navsType"/>
  </div>
</template>

<script>
import AppLeftNav from "@/components/AppLeftNav"
export default {
  name: "AppLeft",
  props: ["navsType"],
  components: {
    AppLeftNav
  }
}
</script>

<style scoped lang="scss">

</style>

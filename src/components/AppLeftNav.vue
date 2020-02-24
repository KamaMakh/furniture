<template>
  <perfect-scrollbar class="fullHeight navs-wrap">
    <div v-if="navsType === 'Projects'" class="fullHeight">
      <ProjectsNav />
    </div>
    <div v-else-if="navsType === 'Furniture'">
      <FurnitureNav />
    </div>
    <div v-else-if="navsType === 'Statistics'">
      <StatisticsNav />
    </div>
    <div
      v-else-if="['Settings', 'Finances', 'Personal'].indexOf(navsType) > -1"
    >
      <SettingsNav />
    </div>
    <div v-else class="fullHeight">
      <DefaultNav />
    </div>
    <div v-if="['Settings', 'Finances', 'Personal'].indexOf(navsType) > -1" class="app-version mt-auto text-center p-2">
      {{ version }}
    </div>
  </perfect-scrollbar>
</template>

<script>
/*eslint-disable*/
import DefaultNav from "@/components/navs/DefaultNav";
import ProjectsNav from "@/components/navs/ProjectsNav";
import FurnitureNav from "@/components/navs/FurnitureNav";
import StatisticsNav from "@/components/navs/StatisticsNav";
import SettingsNav from "@/components/navs/SettingsNav";
export default {
  name: "AppLeftNav",
  props: ["navsType"],
  components:{
    DefaultNav,
    ProjectsNav,
    FurnitureNav,
    StatisticsNav,
    SettingsNav
  },
  data() {
    return {
      // navsType: null
      version: ""
    }
  },
  mounted() {
    this.version = process.env.VUE_APP_VERSION;
  }
}
</script>

<style scoped lang="scss">
.fullHeight{
  height: 100%;
}
.navs-wrap{
  width: 300px;
  display: flex;
  flex-flow: nowrap column;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding-top: 60px;
  padding-right: 20px;
  background: #DADADA;
  overflow-y: scroll;
  .app-version {
    color: #688e74;
  }
}
</style>

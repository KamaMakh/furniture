<template>
  <perfect-scrollbar class="fullHeight navs-wrap">
    <div v-if="navsType === 'Projects'" class="fullHeight">
      <ProjectsNav ref="nav" />
    </div>
    <div v-else-if="navsType === 'Furniture'">
      <FurnitureNav ref="nav" />
    </div>
    <div v-else-if="navsType === 'Statistics'">
      <StatisticsNav ref="nav" />
    </div>
    <div v-else-if="navsType === 'Documents'">
      <DocumentsNav ref="nav" />
    </div>
    <div v-else-if="navsType === 'PhotoFixations'">
      <PhotoFixationNav ref="nav" />
    </div>
    <div
      v-else-if="
        ['Settings', 'Finances', 'Personal', 'Contacts'].indexOf(navsType) > -1
      "
    >
      <SettingsNav ref="nav" />
    </div>
    <div v-else-if="navsType === 'Warehouse'">
      <WarehouseNav ref="nav" />
    </div>
    <div v-else class="fullHeight">
      <DefaultNav ref="nav" />
    </div>
    <div
      v-if="['Settings', 'Finances', 'Personal'].indexOf(navsType) > -1"
      class="app-version mt-auto text-center p-2"
    >
      {{ version }}
    </div>
  </perfect-scrollbar>
</template>

<script>
import DefaultNav from "@/components/navs/DefaultNav";
import ProjectsNav from "@/components/navs/ProjectsNav";
import FurnitureNav from "@/components/navs/FurnitureNav";
import StatisticsNav from "@/components/navs/StatisticsNav";
import SettingsNav from "@/components/navs/SettingsNav";
import DocumentsNav from "@/components/navs/DocumentsNav";
import PhotoFixationNav from "@/components/navs/PhotoFixationsNav";
import WarehouseNav from "@/components/navs/WarehouseNav";
export default {
  name: "AppLeftNav",
  props: ["navsType", "showConst"],
  components: {
    DefaultNav,
    ProjectsNav,
    FurnitureNav,
    StatisticsNav,
    SettingsNav,
    DocumentsNav,
    PhotoFixationNav,
    WarehouseNav
  },
  data() {
    return {
      // navsType: null
      version: ""
    };
  },
  methods: {
    changeShowConst() {
      this.$refs.nav.changeShowConst();
    }
  },
  mounted() {
    this.version = process.env.VUE_APP_VERSION;
  }
};
</script>

<style scoped lang="scss">
.fullHeight {
  height: 100%;
}
.navs-wrap {
  display: flex;
  flex-flow: nowrap column;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  /*padding-top: 60px;*/
  /*padding-right: 20px;*/
  background: #fff;
  overflow-y: scroll;
  .app-version {
    color: #688e74;
  }
}
</style>

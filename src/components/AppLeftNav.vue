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
    <div v-else class="fullHeight">
      <DefaultNav />
    </div>
  </perfect-scrollbar>
</template>

<script>
/*eslint-disable*/
import DefaultNav from "@/components/navs/DefaultNav";
import ProjectsNav from "@/components/navs/ProjectsNav";
import FurnitureNav from "@/components/navs/FurnitureNav";
import StatisticsNav from "@/components/navs/StatisticsNav";
export default {
  name: "AppLeftNav",
  props: ["navsType"],
  components:{
    DefaultNav,
    ProjectsNav,
    FurnitureNav,
    StatisticsNav
  },
  data() {
    return {
      // navsType: null
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.fullHeight{
  height: 100%;
}
.navs-wrap{
  width: 350px;
  display: flex;
  flex-flow: nowrap column;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding-top: 60px;
  padding-right: 43px;
  background: #DADADA;
  overflow-y: scroll;
}
</style>

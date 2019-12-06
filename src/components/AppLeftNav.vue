<template>
  <div class="fullHeight navs-wrap">
    <div v-if="navsType === 'Projects'" class="fullHeight">
      <ProjectsNav/>
    </div>
    <div v-else class="fullHeight">
      <DefaultNav/>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import DefaultNav from "@/components/navs/DefaultNav";
import ProjectsNav from "@/components/navs/ProjectsNav";
export default {
  name: "AppLeftNav",
  props: ["navsType"],
  components:{
    DefaultNav,
    ProjectsNav
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
}
</style>

<template>
  <div class="index">
    <IndexComponent />
  </div>
</template>

<script>
import IndexComponent from "@/components/IndexComponent/IndexComponent";
export default {
  name: "Index",
  components: {
    IndexComponent
  },
  mounted() {
    // eslint-disable-next-line
    ym(57324937, "hit", "#/index", {
      title: "landing",
      referer: document.referrer
    });
    let scriptTag = document.createElement("script");
    scriptTag.src = "//code.jivosite.com/widget/tczsqwowIJ";
    scriptTag.id = "my-datatable";
    scriptTag.setAttribute("async", true);
    document.getElementsByTagName("head")[0].appendChild(scriptTag);
  }
};
</script>

<style scoped lang="scss">
.index {
  background: url("../components/IndexComponent/assets/bg-1.png") 106% top
      no-repeat,
    url("../components/IndexComponent/assets/furniture-bg.png") -56px 1479px no-repeat,
    url("../components/IndexComponent/assets/orders-bg.png") 106% 2959px
      no-repeat,
    url("../components/IndexComponent/assets/documents-bg.png") -59px 4300px no-repeat;
  padding: 46px 15px 0;
  @media all and(max-width: 1149px) {
    background: url("../components/IndexComponent/assets/bg-1.png") 106% top
        no-repeat,
      url("../components/IndexComponent/assets/furniture-bg.png") -56px 1100px no-repeat,
      url("../components/IndexComponent/assets/orders-bg.png") 106% 2070px
        no-repeat,
      url("../components/IndexComponent/assets/documents-bg.png") -59px 2750px no-repeat;
    -webkit-background-size: 50%;
    background-size: 50%;
  }
  @media all and(max-width: 840px) {
    background: url("../components/IndexComponent/assets/bg-1.png") 106% top
        no-repeat,
      url("../components/IndexComponent/assets/furniture-bg.png") -56px 990px no-repeat,
      url("../components/IndexComponent/assets/orders-bg.png") 106% 1915px
        no-repeat,
      url("../components/IndexComponent/assets/documents-bg.png") -59px 2860px no-repeat;
    -webkit-background-size: 50%;
    background-size: 50%;
  }
  @media all and(max-width: 640px) {
    padding: 20px 15px 0;
  }
  @media all and(max-width: 480px) {
    background: url("../components/IndexComponent/assets/bg-1.png") 106% top
      no-repeat;
    -webkit-background-size: 50%;
    background-size: 50%;
  }
}
</style>

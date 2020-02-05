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
    url("../components/IndexComponent/assets/documents-bg.png") -59px 3908px no-repeat;
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
      url("../components/IndexComponent/assets/furniture-bg.png") -56px 1100px no-repeat,
      url("../components/IndexComponent/assets/orders-bg.png") 106% 2000px
        no-repeat,
      url("../components/IndexComponent/assets/documents-bg.png") -59px 2620px no-repeat;
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

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
}
</style>

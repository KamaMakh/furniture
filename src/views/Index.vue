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
  background: url("../components/IndexComponent/assets/bg-1.png") top right
      no-repeat,
    url("../components/IndexComponent/assets/furniture-bg.png") 0 1560px
      no-repeat,
    url("../components/IndexComponent/assets/orders-bg.png") right 2955px
      no-repeat,
    url("../components/IndexComponent/assets/documents-bg.png") 0 3900px
      no-repeat;
  padding: 57px 15px;
}
</style>

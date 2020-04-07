<template>
  <span class="h1-component">
    <span class="h1-component__icon d-flex align-center">
      <IconStatistics width="30" height="23" />
    </span>
    <h1>
      {{ name }}
    </h1>
  </span>
</template>

<script>
import IconStatistics from "@/components/common/icons/IconStatistics";
export default {
  props: ["name"],
  name: "h1Component",
  components: {
    IconStatistics
  }
};
</script>

<style scoped lang="scss">
.h1-component {
  width: 221px;
  min-height: 42px;
  display: flex;
  align-items: center;
  padding: 5px 32px;
  text-align: left;
  background: #f25a33;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 0px 5px 5px 0px;
  margin-left: -20px;
  margin-top: 10px;
  margin-bottom: 4px;
  h1 {
    font-size: 20px;
    line-height: 23px;
    color: #fff;
    font-weight: normal;
  }
  &__icon {
    margin-right: 10px;
  }
}
</style>

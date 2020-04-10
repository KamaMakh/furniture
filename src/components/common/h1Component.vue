<template>
  <div class="text-left">
    <span class="h1-component">
      <span class="h1-component__icon d-flex align-center">
        <IconStatistics v-if="icon === 'statistics'" width="30" height="23" />
        <IconPhoto v-else-if="icon === 'photo'" width="30" height="23" />
        <IconDocuments v-else-if="icon === 'document'" width="30" height="23" />
        <IconCart v-else-if="icon === 'cart'" width="30" height="23" />
        <IconWarehouse
          v-else-if="icon === 'warehouse'"
          width="30"
          height="23"
        />
      </span>
      <h1>
        {{ name }}
      </h1>
    </span>
  </div>
</template>

<script>
import IconStatistics from "@/components/common/icons/IconStatistics";
import IconPhoto from "@/components/common/icons/IconPhoto";
import IconDocuments from "@/components/common/icons/IconDocuments";
import IconCart from "@/components/common/icons/IconCart";
import IconWarehouse from "@/components/common/icons/IconWarehouse";
export default {
  props: ["name", "icon"],
  name: "h1Component",
  components: {
    IconStatistics,
    IconPhoto,
    IconDocuments,
    IconCart,
    IconWarehouse
  }
};
</script>

<style scoped lang="scss">
.h1-component {
  width: auto;
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  padding: 5px 24px;
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

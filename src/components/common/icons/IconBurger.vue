<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 35 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M35 24.5547H0V28.3325H35V24.5547Z"
      :fill="active ? activeColor : fill || '#fff'"
    />
    <path
      d="M35 15.1113H0V18.8891H35V15.1113Z"
      :fill="active ? activeColor : fill || '#fff'"
    />
    <path
      d="M35 5.66602H0V9.44382H35V5.66602Z"
      :fill="active ? activeColor : fill || '#fff'"
    />
  </svg>
</template>

<script>
import icon_config from "@/mixins/icon_config";
export default {
  name: "IconBurger",
  mixins: [icon_config]
};
</script>

<style scoped></style>

<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 22 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 10.491L10.5882 0.961548L21.1765 10.491H18V18.9615H11.6471V12.6086H9.52941V18.9615H3.17647V10.491H0ZM15.8824 8.57443L10.5882 3.80972L5.29412 8.57443V16.8438H7.41177V10.4909H13.7647V16.8438H15.8824V8.57443Z"
      :fill="active ? activeColor : fill || '#D6E8CE'"
    />
  </svg>
</template>

<script>
import icon_config from "@/mixins/icon_config";
export default {
  name: "IconHome",
  mixins: [icon_config]
};
</script>

<style scoped></style>

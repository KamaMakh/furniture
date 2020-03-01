<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 20 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18 2.96155H14.83L13 0.961548H7L5.17 2.96155H2C0.9 2.96155 0 3.86155 0 4.96155V16.9615C0 18.0615 0.9 18.9615 2 18.9615H18C19.1 18.9615 20 18.0615 20 16.9615V4.96155C20 3.86155 19.1 2.96155 18 2.96155ZM7.88 2.96155H12.12L13.95 4.96155H18V16.9615H2V4.96155H6.05L7.88 2.96155ZM7 9.96155H13V7.46155L16.5 10.9615L13 14.4615V11.9615H7V14.4615L3.5 10.9615L7 7.46155V9.96155Z"
      :fill="active ? activeColor : fill || '#D6E8CE'"
    />
  </svg>
</template>

<script>
import icon_config from "@/mixins/icon_config";
export default {
  name: "IconDocuments",
  mixins: [icon_config]
};
</script>

<style scoped></style>

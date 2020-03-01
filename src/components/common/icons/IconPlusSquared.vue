<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16.8889 0H2.11111C0.939444 0 0 0.95 0 2.11111V16.8889C0 18.05 0.939444 19 2.11111 19H16.8889C18.05 19 19 18.05 19 16.8889V2.11111C19 0.95 18.05 0 16.8889 0ZM16.8891 16.8889H2.11133V2.11111H16.8891V16.8889ZM10.5555 14.7778H8.44439V10.5556H4.22217V8.44444H8.44439V4.22222H10.5555V8.44444H14.7777V10.5556H10.5555V14.7778Z"
      :fill="active ? activeColor : fill || '#7A7A7A'"
    />
  </svg>
</template>

<script>
import icon_config from "@/mixins/icon_config";
export default {
  name: "IconPlusSquared",
  mixins: [icon_config]
};
</script>

<style scoped></style>

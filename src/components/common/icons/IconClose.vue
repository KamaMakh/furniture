<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M-6.10352e-05 31.8198L31.8197 1.69125e-05L32.5269 0.707124L0.707046 32.5269L-6.10352e-05 31.8198Z"
      :fill="active ? activeColor : fill || '#e0e0e0'"
    />
    <path
      d="M0.707031 0L32.5268 31.8198L31.8197 32.5269L-7.55191e-05 0.707107L0.707031 0Z"
      :fill="active ? activeColor : fill || '#e0e0e0'"
    />
  </svg>
</template>

<script>
import icon_config from "@/mixins/icon_config";
export default {
  name: "IconClose",
  mixins: [icon_config]
};
</script>

<style scoped></style>

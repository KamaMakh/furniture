<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0)">
      <path
        d="M8.15234 0V13.6956H22.5002V0H8.15234ZM19.2393 5.86957H11.4133V3.91307H19.2393V5.86957Z"
        :fill="active ? activeColor : fill || '#fff'"
      />
      <path
        d="M0.326172 15.6523V30.0002H14.0218V15.6523H0.326172ZM10.761 21.5219H3.58703V19.5654H10.761V21.5219Z"
        :fill="active ? activeColor : fill || '#fff'"
      />
      <path
        d="M15.978 15.6523V30.0002H29.6737V15.6523H15.978ZM26.4128 21.5219H19.2389V19.5654H26.4128V21.5219Z"
        :fill="active ? activeColor : fill || '#fff'"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="30" height="30" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>

<script>
import icon_config from "@/mixins/icon_config";
export default {
  name: "IconWarehouse",
  mixins: [icon_config]
};
</script>

<style scoped></style>

<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0)">
      <path
        d="M0 19.6341H20V6.23047H0V19.6341ZM14.8281 8.1848H16.8972V10.2538H14.8281V8.1848ZM14.8281 11.7024H16.8972V13.7714H14.8281V11.7024ZM14.8281 15.22H16.8972V17.289H14.8281V15.22ZM10.9197 8.1848H12.9887V10.2538H10.9197V8.1848ZM10.9197 11.7024H12.9887V13.7714H10.9197V11.7024ZM10.9197 15.22H12.9887V17.289H10.9197V15.22ZM7.01121 8.1848H9.08029V10.2538H7.01121V8.1848ZM7.01121 11.7024H9.08029V13.7714H7.01121V11.7024ZM7.01121 15.22H9.08029V17.289H7.01121V15.22ZM3.10283 8.1848H5.17186V10.2538H3.10283V8.1848ZM3.10283 11.7024H5.17186V13.7714H3.10283V11.7024ZM5.17186 15.22V17.289H3.10283V15.22H5.17186Z"
        fill="#C4C4C4"
      />
      <path
        d="M20 1.53906H16.4824V3.88409H15.3099V1.53906H4.69006V3.88409H3.5176V1.53906H0V5.05663H20V1.53906Z"
        fill="#C4C4C4"
      />
      <path
        d="M4.69004 0.367188H3.51758V1.53964H4.69004V0.367188Z"
        :fill="active ? activeColor : fill || '#C4C4C4'"
      />
      <path
        d="M16.4825 0.367188H15.3101V1.53964H16.4825V0.367188Z"
        :fill="active ? activeColor : fill || '#C4C4C4'"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>

<script>
import icon_config from "@/mixins/icon_config";
export default {
  name: "IconCalendar",
  mixins: [icon_config]
};
</script>

<style scoped></style>

<template>
  <div class="locale-changer" :class="{ 'app-top': parentClass === 'app-top' }">
    <v-select
      v-model="currLang"
      :items="langs"
      hide-details
      single-line
      dark
      solo
      :background-color="bgColor || 'transparent'"
      flat
      style="border-radius: 0;"
      item-text="text"
      item-value="value"
    ></v-select>
  </div>
</template>

<script>
import "vue-select/dist/vue-select.css";
export default {
  name: "LocaleChanger",
  props: ["parentClass", "bgColor"],
  data() {
    return {
      langs: [
        { value: "en", text: "Eng" },
        { value: "fr", text: "Fra" },
        { value: "ru", text: "Рус" },
        { value: "de", text: "Deu" }
      ],
      currLang:
        this.$cookies.get("lang") || navigator.language.split("-")[0] || "en"
    };
  },
  methods: {
    setLang() {
      this.$cookies.set("lang", this.$i18n.locale);
      this.$vuetify.lang.current = this.$i18n.locale;
    }
  },
  watch: {
    currLang(val) {
      if (!val) {
        val = "en";
      }
      this.$i18n.locale = val;
      this.$cookies.set("lang", val);
      this.$store.commit("setLang", val);
      this.$vuetify.lang.current = val;
      this.$store.dispatch("user/getUser");
    }
  }
};
</script>

<style lang="scss">
.locale-changer {
  width: 85px;
  margin-left: 1px;
  select {
    border: none;
    font-family: "Roboto", sans-serif;
    font-size: 21px;
    color: #fff;
    text-transform: uppercase;
    background: transparent;
    option {
      background-color: transparent !important;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      border: none;
      color: #333;
    }
  }
}
.auth-locale {
  cursor: pointer;
  .vs__clear,
  .vs__search {
    display: none !important;
  }
  .vs__selected,
  .vs__actions,
  .vs__selected-options {
    cursor: pointer;
    user-select: none;
  }
  .vs__selected {
    position: initial !important;
    opacity: 1 !important;
  }
  .vs__dropdown-toggle {
    border: 1px solid #fff;
  }
  .vs__selected {
    color: #fff;
  }
  .vs__open-indicator {
    fill: #fff;
  }
}
.app-top {
  cursor: pointer;
  height: 100%;
  background: none;
  align-items: center;
  justify-content: center;
  text-align: center;
  display: flex;
  &:hover {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.15) 51.06%,
      rgba(255, 255, 255, 0) 100%
    ) !important;
  }
  @media all and(max-width: 1280px) {
    width: 45px;
  }
  .v-input__slot {
    padding: 0 !important;
  }
  .v-select__selections {
    text-align: center;
    justify-content: center;
    input {
      display: none;
    }
  }
  .vs__clear,
  .vs__search {
    display: none !important;
  }
  .vs__selected,
  .vs__actions,
  .vs__selected-options {
    cursor: pointer;
    user-select: none;
  }
  .vs__selected {
    position: initial !important;
    opacity: 1 !important;
  }
  .vs__dropdown-toggle {
    border: none;
    border-radius: 0;
    height: 100%;
  }
  .vs__selected {
    color: #fff;
  }
  .vs__open-indicator {
    fill: #fff;
  }
  .vs__dropdown-menu {
    left: auto;
    right: 0;
  }
  &.locale-changer {
    flex: 1 0 auto;
    select {
      border: none;
      font-family: "Roboto", sans-serif;
      font-size: 21px;
      color: #fff;
      text-transform: uppercase;
      background: transparent;
      option {
        background-color: transparent !important;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        border: none;
        color: #333;
      }
    }
    .v-text-field.v-text-field--solo .v-input__append-inner,
    .v-text-field.v-text-field--solo .v-input__prepend-inner {
      display: none;
    }
    .v-select__selection--comma {
      margin-right: 0;
    }
  }
  .v-select__selection--comma {
    font-weight: 300;
    font-size: 16px;
    line-height: 19px;
    position: relative;
    overflow: visible;
    &:before {
      content: "";
      display: block;
      position: absolute;
      width: 6px;
      height: 4px;
      top: 50%;
      right: -8px;
      background: url("data:image/svg+xml,%3Csvg width='6' height='5' viewBox='0 0 6 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.253 4.10306L5.96117 0.347064C6.072 0.192813 5.93226 0 5.71059 0L0.289426 0C0.0677605 0 -0.0719852 0.192813 0.0388474 0.347064L2.74702 4.10306C2.86272 4.25731 3.14216 4.25731 3.253 4.10306Z' fill='white'/%3E%3C/svg%3E%0A")
        0 0 no-repeat;
      background-size: contain;
    }
  }
}
.v-menu__content .v-list .v-list-item--active {
  color: #000 !important;
}
</style>

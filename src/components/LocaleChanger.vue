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
      langs: ["en", "fr", "ru", "de"],
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
  height: 45px;
  background: #688e74;
  margin-left: 1px;
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
}
</style>

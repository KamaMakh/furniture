<template>
  <div class="locale-changer">
    <v-select
      :class="parentClass"
      :placeholder="'en'"
      :options="langs"
      v-model.trim="currLang"
    >
    </v-select>
  </div>
</template>

<script>
/* eslint-disable */
import dropdown from 'vue-dropdowns';
import "vue-select/dist/vue-select.css";
export default {
  name: "LocaleChanger",
  props: ["parentClass"],
  components:{
    "dropdown": dropdown
  },
  data() {
    return {
      langs: ["en", "fr", "ru"],
      currLang: "en"
    }
  },
  methods: {
    setLang() {
      this.$cookies.set("lang", this.$i18n.locale);
    }
  },
  watch: {
    currLang(val) {
      if(!val) {
        val = "en";
      }
      this.$i18n.locale = val;
      this.$cookies.set("lang", val);
    }
  }
}
</script>

<style lang="scss">
.locale-changer {
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
.auth {
  cursor: pointer;
  .vs__clear, .vs__search{
    display: none !important;
  }
  .vs__selected, .vs__actions, .vs__selected-options{
    cursor: pointer;
    user-select: none;
  }
  .vs__selected{
    position: initial !important;
    opacity: 1 !important;
  }
  .vs__dropdown-toggle{
    border: 1px solid #fff;
  }
  .vs__selected{
    color: #fff;
  }
  .vs__open-indicator{
    fill: #fff;
  }
}
.app-top{
  cursor: pointer;
  height: 45px;
  background: #688E74;
  margin-left: 1px;
  .vs__clear, .vs__search{
    display: none !important;
  }
  .vs__selected, .vs__actions, .vs__selected-options{
    cursor: pointer;
    user-select: none;
  }
  .vs__selected{
    position: initial !important;
    opacity: 1 !important;
  }
  .vs__dropdown-toggle{
    border: none;
    border-radius: 0;
    height: 100%;
  }
  .vs__selected{
    color: #fff;
  }
  .vs__open-indicator{
    fill: #fff;
  }
  .vs__dropdown-menu{
    left: auto;
    right: 0;
  }

}
</style>

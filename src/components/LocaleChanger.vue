<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale" @change="setLang">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "LocaleChanger",
  data() {
    return { langs: ["en", "fr", "ru"] }
  },
  methods: {
    setLang() {
      this.$cookies.set("lang", this.$i18n.locale);
    }
  }
}
</script>

<style scoped lang="scss">
.locale-changer {
  select {
    border: none;
    font-family: "Tharlon", sans-serif;
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
</style>

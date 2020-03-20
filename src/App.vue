<template>
  <v-app>
    <notifications group="warn" />
    <router-view />
    <v-snackbar
      v-model="snackBar.value"
      :color="snackBar.color"
      :timeout="2000"
      top
      right
    >
      {{ snackBar.text }}
      <v-btn color="#fff" text @click="snackBar.value = false">
        {{ snackBar.button_text }}
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppContainer",
  created() {
    this.$i18n.locale = this.$store.state.lang;
    this.$vuetify.lang.current = this.$store.state.lang;
  },
  computed: {
    ...mapState({
      snackBar: state => state.snackBar
    })
  }
};
</script>

<style lang="scss">
@import "assets/css/styles.css";
</style>

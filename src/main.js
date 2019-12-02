import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Meta from "vue-meta";
import i18n from "./i18n"
import vSelect from "vue-select"
import Notifications from "vue-notification"

Vue.component("v-select", vSelect)
Vue.use(Meta)
Vue.use(Notifications)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Meta from "vue-meta";
import i18n from "./i18n";
import vSelect from "vue-select";
import Notifications from "vue-notification";
import VueCookies from "vue-cookies";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import api from "./shared/api";
/* eslint-disable */
Vue.component("v-select", vSelect);
Vue.use(Meta);
Vue.use(Notifications);
Vue.use(VueCookies);

Vue.config.productionTip = false;

router.beforeEach(async function(to, from, next) {
  if (["Registration", "Login"].indexOf(to.name) > -1) {
    if (VueCookies.get("token")) {
      router.push({name: "Furniture"});
    } else {
      next();
    }
  } else {
    try {
      // if (!store.state.user) {
      // let res = await api.get('/me');
      // store.commit('user', res.data);
      // }
      if (!VueCookies.get("token")) {
        router.push({name: "Login"});
      } else {
        next();
      }
    } catch (e) {
      router.push("/auth");
    }
  }
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");

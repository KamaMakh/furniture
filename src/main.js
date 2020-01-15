import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Meta from "vue-meta";
import i18n from "./i18n";
import vSelect from "vue-select";
import Notifications from "vue-notification";
import VueCookies from "vue-cookies";
// import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import { getMe } from "@/store/urls";
import api from "./shared/api";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

Vue.use(PerfectScrollbar);

Vue.component("v-select", vSelect);
Vue.use(Meta);
Vue.use(Notifications);
Vue.use(VueCookies);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

router.beforeEach(async function(to, from, next) {
  if (["Registration", "Login"].indexOf(to.name) > -1) {
    if (VueCookies.get("token")) {
      router.push({ name: "Furniture" });
    } else {
      next();
    }
  } else {
    try {
      // console.log(store.state);
      // store.dispatch('user/checkUser')
      if (!store.state.user.user.id) {
        let res = await api.get(getMe);
        store.commit("user/setUser", res.data);
      }
      if (!VueCookies.get("token")) {
        router.push({ name: "Login" });
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

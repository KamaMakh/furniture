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
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const VueScrollTo = require("vue-scrollto");

library.add(faPlus);

Vue.component("fa-icon", FontAwesomeIcon);
Vue.use(Viewer);
Vue.use(PerfectScrollbar);

Vue.component("v-select", vSelect);
Vue.use(Meta);
Vue.use(Notifications);
Vue.use(VueCookies);
Vue.use(BootstrapVue);
Vue.use(VueScrollTo, {
  duration: 800
});

Vue.config.productionTip = false;

router.beforeEach(async function(to, from, next) {
  if (["Registration", "Login", "Index"].indexOf(to.name) > -1) {
    if (VueCookies.get("token") && to.name !== "Index") {
      router.push({ name: "Furniture" });
    } else {
      next();
    }
  } else {
    try {
      if (!store.state.user.user.id) {
        let res = await api.get(getMe);
        store.commit("user/setUser", res.data);
        store.commit("user/setEnableModules");
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

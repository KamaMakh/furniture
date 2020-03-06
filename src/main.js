import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Meta from "vue-meta";
import i18n from "./i18n";
import Notifications from "vue-notification";
import VueCookies from "vue-cookies";
import { getMe } from "@/store/urls";
import api from "./shared/api";
import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueWindowSize from "vue-window-size";
const VueScrollTo = require("vue-scrollto");
import Validations from "vuelidate";
import VueMask from "v-mask";
import vueDebounce from "vue-debounce";
import vuetify from "./plugins/vuetify";

library.add(faPlus);
library.add(faUserPlus);

Vue.use(VueWindowSize);
Vue.component("fa-icon", FontAwesomeIcon);
Vue.use(Viewer);
Vue.use(PerfectScrollbar);

Vue.use(Meta);
Vue.use(Notifications);
Vue.use(VueCookies);
Vue.use(Validations);
Vue.use(VueScrollTo, {
  duration: 1000
});
Vue.use(VueMask);
Vue.use(vueDebounce);

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

Vue.filter("truncate", function(value) {
  if (!value) return "";
  if (value.length > 30) {
    value = value.substring(0, 30) + "...";
  }
  return value;
});

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount("#app");

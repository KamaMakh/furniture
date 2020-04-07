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
import h1Component from "@/components/common/h1Component";
import VueWindowSize from "vue-window-size";
const VueScrollTo = require("vue-scrollto");
import Validations from "vuelidate";
import VueMask from "v-mask";
import vueDebounce from "vue-debounce";
import vuetify from "./plugins/vuetify";

library.add(faPlus);
library.add(faUserPlus);

Vue.component("h1-component", h1Component);
Vue.component("fa-icon", FontAwesomeIcon);
Vue.use(VueWindowSize);
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
        if (localStorage.getItem("alreadyOpen")) {
          router.push({ name: "Login" });
        } else {
          router.push({ name: "Registration" });
        }
      } else {
        next();
      }
    } catch (e) {
      // router.push("/auth");
    }
  }
});

Vue.filter("truncate", function(value, length) {
  if (!length) length = 30;
  if (!value) return "";
  if (value.length > length) {
    value = value.substring(0, length) + "...";
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

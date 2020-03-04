import Vue from "vue";
import Vuex from "vuex";
import VueCookies from "vue-cookies";

import user from "./user";
import projects from "./projects";
import furniture from "./furniture";
import documents from "./documents";

Vue.use(VueCookies);
Vue.use(Vuex);

VueCookies.config("40d");

// export default function () {
export default new Vuex.Store({
  modules: {
    user,
    projects,
    furniture,
    documents
  },
  state: {
    lang: VueCookies.get("lang") || navigator.language.split("-")[0] || "en"
  },
  getters: {
    loggedIn(state) {
      return Boolean(state.user.user.id);
    },
    isAdmin(state) {
      return Boolean(state.user.user.isAdmin);
    }
  },
  mutations: {
    setLang(state, lang) {
      VueCookies.set("lang", lang);
      state.lang = lang;
    }
  }
});
// return Store;
// }

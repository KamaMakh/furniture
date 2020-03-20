import Vue from "vue";
import Vuex from "vuex";
import VueCookies from "vue-cookies";

import user from "./user";
import projects from "./projects";
import furniture from "./furniture";
import documents from "./documents";
import photofixations from "./photofixations";
import constructions from "./constructions";

Vue.use(VueCookies);
Vue.use(Vuex);

VueCookies.config("40d");

// export default function () {
export default new Vuex.Store({
  modules: {
    user,
    projects,
    furniture,
    documents,
    photofixations,
    constructions
  },
  state: {
    lang: VueCookies.get("lang") || navigator.language.split("-")[0] || "en",
    emptyConstructions: false,
    snackBar: {
      value: false,
      color: "success",
      text: "Внимание!",
      button_text: "Ok"
    }
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

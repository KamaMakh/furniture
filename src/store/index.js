import Vue from "vue";
import Vuex from "vuex";
import VueCookies from "vue-cookies"

import user from "./user";

Vue.use(VueCookies)
Vue.use(Vuex);

VueCookies.config("40d")

export default function () {
  const Store = new Vuex.Store({
    modules: {
      user
    },
    state: {
      lang: VueCookies.get("lang") || "en",
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
  })
  return Store;
}

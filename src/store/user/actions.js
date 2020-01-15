/* eslint-disable */
import api from "@/shared/api";
import { registerUrl, loginUrl, getMe, getCurrenciesUrl } from "@/store/urls";
import onError from "@/store/onError";
import Vue from "vue";
import router from "@/router";
import VueCookies from "vue-cookies";

function register({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.post(registerUrl, data)
      .then((response) => {
        if (response.data.error) {
          Vue.notify({
            group: 'warn',
            type: 'error',
            text: response.data.message
          });
          if (response.data.status === 400) {
            router.push("/auth");
          }
        } else if (response.data.accessToken) {
          let token = response.data.accessToken
          VueCookies.set("token",token,"40D");
          resolve();
        } else {
          reject();
        }
        // commit("setUser", response.data.data);
      })
      .catch(error => onError(error, reject));
  });
}

function login({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.post(loginUrl, data)
      .then((response) => {
        if (response.data.error) {
          Vue.notify({
            group: 'warn',
            type: 'error',
            text: response.data.message
          });
        } else if (response.data.accessToken) {
          let token = response.data.accessToken
          VueCookies.set("token",token,"40D");
          resolve();
        } else {
          reject();
        }
        // commit("setUser", response.data.data);

        // resolve();
      })
      .catch(error => onError(error, reject));
  });
}

function logout({ commit }) {
  VueCookies.remove("token");
  router.push("/auth");
  commit('resetUser');
}

function checkUser({ commit }) {
  return new Promise((resolve, reject) => {
    api.post(getMe)
      .then((response) => {
        const user = response.data.data;

        if (user) {
          commit('setUser', user);
        } else {
          commit('resetUser');
        }

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

function setCurrencies({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.get(getCurrenciesUrl)
      .then((response) => {
        if(response.status === 200) {
          commit("setCurrencies", response.data);
          resolve();
        } else {
          reject(response.data.message)
        }
      })
      .catch(error => {
        if(error.response && error.response.status === 200) {
          commit("setCurrencies", error.response.data);
          // resolve();
        } else {
          reject();
        }
      });
  });
}

export {
  register,
  login,
  logout,
  setCurrencies
}

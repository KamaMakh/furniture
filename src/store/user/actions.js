/* eslint-disable */
import api from "@/shared/api";
import {
  registerUrl,
  loginUrl,
  getMe,
  getCurrenciesUrl,
  getCodeUrl,
  sendCodeUrl,
  sendNewPasswordUrl,
  uploadAvatarUrl,
  userUrls
} from "@/store/urls";
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
      })
      .catch(error => onError(error, reject));
  });
}

function getCode({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.post(getCodeUrl, data)
      .then((response) => {
        if (response.data.error) {
          Vue.notify({
            group: 'warn',
            type: 'error',
            text: response.data.error
          });
        } else if (response.data.status === "OK") {
          resolve();
        } else {
          reject(error.response);
        }
      })
      .catch(error => {
        reject(error.response)
      });
  });
}

function getVerifyCode({ commit }) {
  return new Promise((resolve, reject) => {
    api.post(userUrls.getVerifyCodeUrl)
      .then((response) => {
        if (response.data.error) {
          Vue.notify({
            group: 'warn',
            type: 'error',
            text: response.data.error
          });
        } else if (response.data.status === "OK") {
          resolve();
        } else {
          reject(error.response);
        }
      })
      .catch(error => {
        reject(error.response)
      });
  });
}

function sendCode({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.post(sendCodeUrl, data)
      .then((response) => {
        if (response.data.error) {
          Vue.notify({
            group: 'warn',
            type: 'error',
            text: response.data.error
          });
        } else if (response.data.status === "OK") {
          resolve();
        } else {
          reject(error.response);
        }
      })
      .catch(error => {
        reject(error.response)
      });
  });
}

function sendNewPassword({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.post(sendNewPasswordUrl, data)
      .then((response) => {
        if (response.data.error) {
          Vue.notify({
            group: 'warn',
            type: 'error',
            text: response.data.error
          });
        } else if (response.data.accessToken) {
          let token = response.data.accessToken
          VueCookies.set("token",token,"40D");
          resolve();
        } else {
          reject(error.response);
        }
      })
      .catch(error => {
        reject(error.response)
      });
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

function uploadAvatar({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(uploadAvatarUrl, data)
      .then(response => {
        if (response.status === 200) {
          commit("setAvatar", response.data);
          resolve(response.data);
        } else {
          reject(response.data);
        }
      })
      .catch(error => {
        reject(error.response);
      });
  });
}

function sendVerifyCode({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.post(userUrls.sendVerifyCodeUrl, data)
      .then((response) => {
        if (response.data.error) {
          Vue.notify({
            group: 'warn',
            type: 'error',
            text: response.data.error
          });
        } else if (response.status === 200 && response.data.isEmailAccepted) {
          commit("updateVerifyStatus");
          resolve();
        } else {
          reject(error.response);
        }
      })
      .catch(error => {
        reject(error.response)
      });
  });
}

function getCountries({ commit }, countryName) {
  return new Promise((resolve, reject) => {
    api.get(userUrls.getCountriesUrl, { params: countryName })
      .then((response) => {
        if (response.status === 200) {
          commit("setCountries", response.data);
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function getCities({ commit }, countryName) {
  return new Promise((resolve, reject) => {
    api.get(userUrls.getCitiesUrl, { params: countryName })
      .then((response) => {
        if (response.status === 200) {
          commit("setCities", response.data);
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function updateProfile({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.post(userUrls.updateProfileUrl, data)
      .then((response) => {
        if (response.status === 200) {
          commit("setUser", response.data);
          resolve();
        } else {
          reject(error.response);
        }
      })
      .catch(error => {
        reject(error.response)
      });
  });
}

export {
  register,
  login,
  logout,
  setCurrencies,
  getCode,
  sendCode,
  sendNewPassword,
  uploadAvatar,
  sendVerifyCode,
  getVerifyCode,
  getCountries,
  getCities,
  updateProfile
}

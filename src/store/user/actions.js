/* eslint-disable */
import { axios } from "@/boot/axios";
import api from "@/shared/api";
import {
  registerUrl,
  loginUrl,
} from "@/store/urls";
import onError from "@/store/onError";

function register({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.post(registerUrl, data, {method: 'post'})
      .then((response) => {
        console.log(response);
        // commit("setUser", response.data.data);

        // resolve();
      })
      .catch(error => onError(error, reject));
  });
}

function login({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.post(loginUrl, data)
      .then((response) => {
        commit("setUser", response.data.data);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

export {
  register,
  login
}

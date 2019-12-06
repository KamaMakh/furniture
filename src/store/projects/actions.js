/* eslint-disable */
import Vue from "vue";
import VueCookies from "vue-cookies";
import api from "@/shared/api";
import onError from "@/store/onError";

function addConstruction({ commit }, data) {
  console.log(111);
  return new Promise((resolve, reject) => {
    // api.post(loginUrl, data)
    //   .then((response) => {
    //     if (response.data.error) {
    //       Vue.notify({
    //         group: 'warn',
    //         type: 'error',
    //         text: response.data.message
    //       });
    //     } else if (response.data.accessToken) {
    //       let token = response.data.accessToken
    //       VueCookies.set("token",token,"40D");
    //       resolve();
    //     } else {
    //       reject();
    //     }
    //     commit("setConstruct", data);
    //     resolve();
    //   })
    //   .catch(error => onError(error, reject));
    commit("addConstruction", data);
    resolve();
  });
}

function updateConstruction({ commit }, data) {
  console.log(222);
  return new Promise((resolve, reject) => {
    commit("updateConstruction", data);
    resolve();
  });
}

function getConstruction({ commit }, id) {
  return new Promise((resolve, reject) => {
    // let current = {};
    // console.log(state.constructions);
    //
    // console.log(current);
    // commit("setConstruction", current);
    resolve();
  });
}

function setConstruction({ commit }, data) {
  commit("setConstruction", data);
}


function setConstructions({ commit }, data) {
  commit("setConstructions", data);
}

function setWarehouse({ commit }, data) {
  commit("setWarehouse", data);
}

export {
  addConstruction,
  setConstruction,
  setConstructions,
  getConstruction,
  updateConstruction,
  setWarehouse
}

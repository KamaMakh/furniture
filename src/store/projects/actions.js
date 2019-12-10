/* eslint-disable */
import Vue from "vue";
import VueCookies from "vue-cookies";
import api from "@/shared/api";
import onError from "@/store/onError";
import {furnitureConstructsUrl, createConstructUrl} from "@/store/urls"

function addConstruction({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.post(createConstructUrl, data)
      .then((response) => {
        commit("addConstruction", response.data);
        resolve();
      })
      .catch(error => {
        if(error.response && error.response.status === 200) {
          commit("addConstruction", error.response.data);
          resolve();
        }
        if(error.response) {
          console.log(error.response);
        }
      });
  });
}

function updateConstruction({ commit }, data) {
  console.log(222);
  return new Promise((resolve, reject) => {
    commit("updateConstruction", data);
    resolve();
  });
}

function getConstructions({ commit }) {
  return new Promise((resolve, reject) => {
    api.get(furnitureConstructsUrl)
      .then((response) => {
        commit("setConstructions", response.data);
        // resolve();
      })
      .catch(error => {
        if(error.response && error.response.status === 200) {
          commit("setConstructions", error.response.data);
          // resolve();
        } else {
          reject();
        }
      });
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
  getConstructions,
  updateConstruction,
  setWarehouse
}

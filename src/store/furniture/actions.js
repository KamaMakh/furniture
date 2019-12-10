/* eslint-disable */
import Vue from "vue";
import VueCookies from "vue-cookies";
import api from "@/shared/api";
import onError from "@/store/onError";
import {furnitureConstructsUrl, createConstructUrl, createFurnitureGroup, getFurniture as furnitureUrl} from "@/store/urls";

function addConstruction({ commit }, data) {
  console.log("start111");
  return new Promise((resolve, reject) => {
    console.log("start222");
    api.post(createConstructUrl, data)
      .then((response) => {
        console.log("start333");
        console.log(response.data);
        commit("addConstruction", response.data);
        resolve();
      })
      .catch(error => {
        if(error.response && error.response.status === 200) {
          commit("addConstruction", error.response.data);
          resolve();
        } else {
          reject();
        }
      });
  });
}

function setConstruction({ commit }, data) {
  commit("setConstruction", data);
}

function updateConstruction({ commit }, data) {
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
        resolve(response);
      })
      .catch(error => {
        if(error.response && error.response.status === 200) {
          commit("setConstructions", error.response.data);
          resolve();
        } else {
          reject();
        }
      });
  });
}

function addGroup({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.post(createFurnitureGroup, data)
      .then((response) => {
        commit("addGroup", response.data);
        resolve();
      })
      .catch(error => {
        if(error.response && error.response.status === 200) {
          commit("addGroup", error.response.data);
          resolve();
        }
        if(error.response) {
          console.log(error.response);
        }
      });
  });
}

function getFurniture({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.get(furnitureUrl, {params: data})
      .then((response) => {
        commit("setFurniture", response.data);
        // resolve();
      })
      .catch(error => {
        if(error.response && error.response.status === 200) {
          commit("setFurniture", error.response.data);
          // resolve();
        } else {
          reject();
        }
      });
  });
}

export {
  addConstruction,
  getConstructions,
  updateConstruction,
  addGroup,
  setConstruction,
  getFurniture
}

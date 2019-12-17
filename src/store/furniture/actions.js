/* eslint-disable */
import Vue from "vue";
import VueCookies from "vue-cookies";
import api from "@/shared/api";
import onError from "@/store/onError";
import {furnitureConstructsUrl, createConstructUrl, createFurnitureGroup, updateFurnitureGroup, getFurniture as furnitureUrl, getUnitsUrl, createNomenclatureUrl, getNomenclatureUrl, statusConfirmUrl} from "@/store/urls";

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
        } else {
          reject(error.response)
        }
      });
  });
}

function updateGroup({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.post(updateFurnitureGroup, data)
      .then((response) => {
        // commit("addGroup", response.data);
        resolve();
      })
      .catch(error => {
        if(error.response && error.response.status === 200) {
          // commit("addGroup", error.response.data);
          resolve();
        } else {
          reject(error.response)
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

function setUnits({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.get(getUnitsUrl)
      .then((response) => {
        commit("setUnits", response.data);
        // resolve();
      })
      .catch(error => {
        if(error.response && error.response.status === 200) {
          commit("setUnits", error.response.data);
          // resolve();
        } else {
          reject();
        }
      });
  });
}

function setNomenclature({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.get(getNomenclatureUrl, {params: {groupId: data.id}})
      .then((response) => {
        commit("setNomenclatures", {response: response.data, group: data});
        // resolve();
      })
      .catch(error => {
        if(error.response && error.response.status === 200) {
          commit("setNomenclatures", error.response.data);
          // resolve();
        } else {
          reject();
        }
      });
  });
}

function addNomenclature({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.post(createNomenclatureUrl, data.data)
      .then((response) => {
        commit("setNomenclature", {response: response.data, group: data.group});
        resolve(response.data);
      })
      .catch(error => {
        if(error.response && error.response.status === 200) {
          commit("setNomenclature", {response: error.response.data, group: data.group});
          resolve(error.response);
        } else {
          reject(error);
        }
      });
  });
}

function statusConfirm({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.post(statusConfirmUrl, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        if(error.response && error.response.status === 200) {
          resolve(error.response);
        } else {
          reject(error);
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
  getFurniture,
  setUnits,
  addNomenclature,
  setNomenclature,
  statusConfirm,
  updateGroup
}

import api from "@/shared/api";
import {
  furnitureConstructsUrl,
  createConstructUrl,
  createFurnitureGroup,
  updateFurnitureGroup,
  getFurniture as furnitureUrl,
  getUnitsUrl,
  createNomenclatureUrl,
  getNomenclatureUrl,
  statusConfirmUrl,
  deleteNomenclatureUrl,
  updateNomenclatureUrl,
  deletePhotoUrl,
  addPhotoUrl,
  updateConstructUrl,
  getSubscribesListUrl,
  createOrderUrl
} from "@/store/urls";

function addConstruction({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(createConstructUrl, data)
      .then(response => {
        if (response.status === 200) {
          if (response.data.subscribeError) {
            reject({ subscribeError: true });
          } else {
            commit("addConstruction", response.data);
            resolve();
          }
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 200) {
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
    api
      .post(updateConstructUrl, data)
      .then(response => {
        if (response.status === 200) {
          commit("updateConstruction", response.data);
          resolve();
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 200) {
          commit("updateConstruction", error.response.data);
          resolve(error);
        } else {
          reject(error.response.data.message);
        }
      });
  });
}

function getConstructions({ commit }) {
  return new Promise((resolve, reject) => {
    api
      .get(furnitureConstructsUrl)
      .then(response => {
        if (response.status === 200) {
          commit("setConstructions", response.data);
          resolve(response);
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 200) {
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
    api
      .post(createFurnitureGroup, data)
      .then(response => {
        if (response.status === 200) {
          commit("addGroup", response.data);
          resolve();
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 200) {
          commit("addGroup", error.response.data);
          resolve();
        } else {
          reject(error.response);
        }
      });
  });
}

function updateGroup({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(updateFurnitureGroup, data.data)
      .then(response => {
        if (response.status === 200) {
          commit("updateGroup", { response: response.data, group: data.group });
          resolve();
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 200) {
          commit("updateGroup", {
            response: error.response.data,
            group: data.group
          });
          resolve();
        } else {
          reject(error.response.message);
        }
      });
  });
}

function getFurniture({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .get(furnitureUrl, { params: data })
      .then(response => {
        if (response.status === 200) {
          commit("setFurniture", response.data);
          resolve();
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 200) {
          commit("setFurniture", error.response.data);
          resolve();
        } else {
          reject();
        }
      });
  });
}

function setUnits({ commit }) {
  return new Promise((resolve, reject) => {
    api
      .get(getUnitsUrl)
      .then(response => {
        if (response.status === 200) {
          commit("setUnits", response.data);
          resolve();
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 200) {
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
    api
      .get(getNomenclatureUrl, { params: { groupId: data.id } })
      .then(response => {
        if (response.status === 200) {
          commit("setNomenclatures", { response: response.data, group: data });
          resolve(response);
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 200) {
          commit("setNomenclatures", error.response.data);
          // resolve();
        } else {
          reject(error.response.message);
        }
      });
  });
}

function addNomenclature({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(createNomenclatureUrl, data.data)
      .then(response => {
        if (response.status === 200) {
          if (data.onlyOne) {
            commit("setNomenclature", {
              response: response.data,
              group: data.group
            });
          }
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 200) {
          if (data.onlyOne) {
            commit("setNomenclature", {
              response: error.response.data,
              group: data.group
            });
          }
          resolve(error.response);
        } else {
          reject(error);
        }
      });
  });
}

function updateNomenclature({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(updateNomenclatureUrl, data.data)
      .then(response => {
        if (response.status === 200) {
          commit("updateNomenclature", {
            response: response.data,
            nomenclature: data.nomenclature
          });
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 200) {
          commit("updateNomenclature", { response: error.response.data });
          resolve(error.response.message);
        } else {
          reject(error.response.message);
        }
      });
  });
}

function deleteNomenclature({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .delete(`${deleteNomenclatureUrl}?nomenclatureId=${data.id}`)
      .then(response => {
        if (response.status === 200) {
          commit("deleteNomenclatures", {
            response: response.data,
            nomenclature: data
          });
          resolve();
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function hideNomenclatures({ commit }, data) {
  if (data && data.children === 0) {
    return;
  }
  commit("hideNomenclatures", { group: data });
}

function statusConfirm({ commit }, data) {
  commit("ignore");
  return new Promise((resolve, reject) => {
    api
      .post(statusConfirmUrl, data)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 200) {
          resolve(error.response);
        } else {
          reject(error.response.message);
        }
      });
  });
}

function deleteNomenclaturePhoto({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .delete(`${deletePhotoUrl}?photoId=${data.photoId}`)
      .then(response => {
        if (response.status === 200) {
          commit("updateNomenclaturePhoto", {
            response: response.data,
            nomenclature: data.nomenclature
          });
          resolve();
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        reject(error.response.message);
      });
  });
}

function addNomenclaturePhoto({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(addPhotoUrl, data.data)
      .then(response => {
        if (response.status === 200) {
          commit("updateNomenclaturePhoto", {
            response: response.data,
            nomenclature: data.nomenclature
          });
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 200) {
          commit("updateNomenclaturePhoto", {
            response: error.response.data,
            nomenclature: data.nomenclature
          });
          resolve(error.response);
        } else {
          reject(error.response.message);
        }
      });
  });
}

function getSubscribesList({ commit }) {
  return new Promise((resolve, reject) => {
    api
      .get(getSubscribesListUrl)
      .then(response => {
        if (response.status === 200) {
          commit("setSubscribes", response.data);
          resolve(response);
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 200) {
          commit("setSubscribes", error.response.data);
          resolve();
        } else {
          reject();
        }
      });
  });
}

function createOrder({ commit }, data) {
  commit("ignore");
  return new Promise((resolve, reject) => {
    api
      .post(createOrderUrl, data)
      .then(response => {
        if (response.status === 200) {
          /* eslint-disable */
          resolve(response.data);
        } else {
          reject(response.data);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 200) {
          resolve(error.response);
        } else {
          reject(error.response);
        }
      });
  });
}

function editEnabledGroups({ commit }, data) {
  commit("editEnabledGroups", data);
}

function clearState({ commit }, data) {
  commit("clearState", data);
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
  updateGroup,
  deleteNomenclature,
  updateNomenclature,
  deleteNomenclaturePhoto,
  addNomenclaturePhoto,
  clearState,
  hideNomenclatures,
  getSubscribesList,
  createOrder,
  editEnabledGroups
};

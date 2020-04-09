import api from "@/shared/api";
import {
  furnitureConstructsUrl,
  createConstructUrl,
  // getFurniture as furnitureUrl,
  // getUnitsUrl,
  // createNomenclatureUrl,
  // getNomenclatureUrl,
  statusConfirmUrl,
  // deleteNomenclatureUrl,
  // updateNomenclatureUrl,
  deletePhotoUrl,
  addPhotoUrl,
  updateConstructUrl,
  getSubscribesListUrl,
  createOrderUrl,
  // buyNomenclatureUrl,
  getConstructionUrl,
  furnitureUrls
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
            resolve(response.data);
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
          if (data.get("active") !== null) {
            commit("closeConstruction", response.data);
            resolve();
          } else {
            commit("updateConstruction", response.data);
            resolve(response.data);
          }
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
      .post(furnitureUrls.createGroupUrl, data)
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
      .post(furnitureUrls.updateGroupUrl, data.data)
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
      .get(furnitureUrls.getFurnitureUrl, { params: data })
      .then(response => {
        if (response.status === 200) {
          commit("setFurniture", response.data);
          getAllSum({ commit }, { furnitureId: response.data.id });
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

function getConstruction({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .get(getConstructionUrl, { params: { projectId: data.id } })
      .then(response => {
        if (response.status === 200) {
          commit("setConstruction", response.data);
          resolve();
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 200) {
          commit("setConstruction", error.response.data);
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
      .get(furnitureUrls.getUnitsUrl)
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
      .get(furnitureUrls.getNomenclatureUrl, { params: { groupId: data.id } })
      .then(response => {
        if (response.status === 200) {
          getGroupSum({ commit }, { groupId: data.id }).then(response2 => {
            commit("setNomenclatures", {
              response: response.data,
              group: data,
              totalSum: response2.data
            });
            resolve(response);
          });
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
      .post(furnitureUrls.createNomenclatureUrl, data.data)
      .then(response => {
        if (response.status === 200) {
          if (data.onlyOne) {
            getGroupSum({ commit }, { groupId: data.group.id }).then(
              response2 => {
                commit("setNomenclature", {
                  response: response.data,
                  group: data.group,
                  totalSum: response2.data
                });
              }
            );
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
      .post(furnitureUrls.updateNomenclatureUrl, data.data)
      .then(response => {
        if (response.status === 200) {
          getGroupSum({ commit }, { groupId: data.nomenclature.group.id }).then(
            response2 => {
              commit("updateNomenclature", {
                response: response.data,
                nomenclature: data.nomenclature,
                totalSum: response2.data
              });
            }
          );
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        reject(error.response.message);
      });
  });
}

function buyNomenclature({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(furnitureUrls.buyNomenclatureUrl, data.data)
      .then(response => {
        if (response.status === 200) {
          getGroupSum({ commit }, { groupId: data.nomenclature.group.id }).then(
            response2 => {
              commit("updateNomenclature", {
                response: response.data,
                nomenclature: data.nomenclature,
                totalSum: response2.data
              });
            }
          );
          resolve(response.data);
        } else {
          reject(response);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function deleteNomenclature({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .delete(
        `${furnitureUrls.deleteNomenclatureUrl}?nomenclatureId=${data.id}`
      )
      .then(response => {
        if (response.status === 200) {
          getGroupSum({ commit }, { groupId: data.group.id }).then(
            response2 => {
              commit("deleteNomenclatures", {
                response: response.data,
                nomenclature: data,
                totalSum: response2.data
              });
            }
          );
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

function getAllSum({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .get(furnitureUrls.getAllSumUrl, { params: data })
      .then(response => {
        if (response.status === 200) {
          commit("setTotalSum", response.data);
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(error => {
        reject(error.response.message);
      });
  });
}

function getGroupSum({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .get(furnitureUrls.getGroupSumUrl, { params: data })
      .then(response => {
        if (response.status === 200) {
          commit("ignore");
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(error => {
        reject(error.response.message);
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
  buyNomenclature,
  deleteNomenclaturePhoto,
  addNomenclaturePhoto,
  clearState,
  hideNomenclatures,
  getSubscribesList,
  createOrder,
  editEnabledGroups,
  getConstruction,
  getAllSum,
  getGroupSum
};

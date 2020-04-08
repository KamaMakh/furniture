import api from "@/shared/api";
import {
  warehouseUrls,
  getConstructionUrl,
  updateConstructUrl,
  createConstructUrl
} from "@/store/urls";

function getConstructions({ commit }) {
  return new Promise((resolve, reject) => {
    api
      .get(warehouseUrls.getConstructionsUrl)
      .then(response => {
        if (response.status === 200) {
          commit("setConstructions", response.data);
          resolve(response);
        }
      })
      .catch(error => {
        reject(error);
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

function getWarehouse({ commit }) {
  return new Promise((resolve, reject) => {
    api
      .get(warehouseUrls.getAll)
      .then(response => {
        if (response.data[0]) {
          getAllSum({ commit }, { storageId: response.data[0].id });
        }
        commit("setWarehouse", response.data);
        commit("setAccess", true);
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function updateWarehouse({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(warehouseUrls.update, data)
      .then(response => {
        commit("setWarehouse", [response.data]);
      })
      .catch(error => {
        reject(error);
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
        if (data.get("active") !== null) {
          commit("closeConstruction", response.data);
          resolve();
        } else {
          commit("updateConstruction", response.data);
          resolve(response.data);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

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
        reject(error);
      });
  });
}

function addGroup({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(`${warehouseUrls.createGroup}`, data)
      .then(response => {
        commit("addGroup", response.data);
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
}

function updateGroup({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(warehouseUrls.updateGroup, data.data)
      .then(response => {
        getGroupSum({ commit }, { storageGroupId: data.group.id }).then(
          response2 => {
            data.group["totalSum"] = response2.data;
            commit("updateGroup", {
              response: response.data,
              group: data.group
            });
            resolve();
          }
        );
      })
      .catch(error => {
        reject(error);
      });
  });
}

function addNomenclature({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(warehouseUrls.createNomenclature, data.data)
      .then(response => {
        if (data.nomenclature.groupOpened) {
          getGroupSum({ commit }, { storageGroupId: data.group.id }).then(
            response2 => {
              commit("setNomenclature", {
                response: response.data,
                group: data.group,
                totalSum: response2.data
              });
            }
          );
        } else {
          getNomenclatures(
            { commit },
            { group: data.group, data: { storageGroupId: data.group.id } }
          );
        }
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function updateNomenclature({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(warehouseUrls.updateNomenclature, data.data)
      .then(response => {
        getGroupSum({ commit }, { storageGroupId: data.group.id }).then(
          response2 => {
            commit("updateNomenclature", {
              response: response.data,
              nomenclature: data.nomenclature,
              totalSum: response2.data
            });
          }
        );
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function getNomenclatures({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .get(warehouseUrls.getGroupNomenclatures, { params: data.data })
      .then(response => {
        getGroupSum({ commit }, { storageGroupId: data.group.id }).then(
          response2 => {
            if (response.data.length) {
              data.group["totalSum"] = response2.data;
            }
            commit("setNomenclatures", {
              response: response.data,
              group: data.group
            });
          }
        );
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function getProjectNomenclatures({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .get(warehouseUrls.getProjectGroupNomenclatures, { params: data.data })
      .then(response => {
        // getGroupSum({ commit }, { storageGroupId: data.group.id }).then(
        //   response2 => {
        //     data.group["totalSum"] = response2.data;
        //
        //   }
        // );
        commit("setProjectNomenclatures", {
          response: response.data,
          group: data.group
        });
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function deleteNomenclaturePhoto({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .delete(`${warehouseUrls.deletePhoto}?photoId=${data.photoId}`)
      .then(response => {
        commit("updateNomenclaturePhoto", {
          response: response.data,
          nomenclature: data.nomenclature
        });
        resolve();
      })
      .catch(error => {
        reject(error.response.message);
      });
  });
}

function addNomenclaturePhoto({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(
        `${warehouseUrls.addphoto}?nomenclatureId=${data.nomenclature.id}`,
        data.data
      )
      .then(response => {
        commit("updateNomenclaturePhoto", {
          response: response.data,
          nomenclature: data.nomenclature
        });
        resolve(response);
      })
      .catch(error => {
        reject(error.response.message);
      });
  });
}

function getAllSum({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .get(warehouseUrls.getAllSum, { params: data })
      .then(response => {
        commit("setTotalSum", response.data);
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function getGroupSum({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .get(warehouseUrls.getGroupSum, { params: data })
      .then(response => {
        commit("ignore");
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function transferFromStorage({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(`${warehouseUrls.storageToProject}`, data.data)
      .then(response => {
        commit("ignore");
        getProjectGroups({ commit }, { projectId: data.projectId });
        getProjectNomenclatures(
          { commit },
          { data: { projectGroupId: response.data.projectGroupId, page: 0 } }
        );
        resolve(response);
      })
      .catch(error => {
        reject(error.response.message);
      });
  });
}

function transferFromProject({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(`${warehouseUrls.projectToStorage}`, data.data)
      .then(response => {
        commit("ignore");
        getProjectGroups({ commit }, { projectId: data.projectId });
        getProjectNomenclatures(
          { commit },
          { data: { projectGroupId: response.data.projectGroupId, page: 0 } }
        );

        getNomenclatures(
          { commit },
          {
            data: { storageGroupId: response.data.storageGroupId },
            group: { id: response.data.storageGroupId, name: data.group.name }
          }
        );
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function toStorage({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(`${warehouseUrls.toStorage}`, data.data)
      .then(response => {
        getGroupSum(
          { commit },
          { storageGroupId: response.data.storageGroupId }
        ).then(response2 => {
          commit("setNomenclatureAfterTransfer", {
            response: response.data,
            group: data.group,
            totalSum: response2.data
          });
        });
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function fromStorage({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(`${warehouseUrls.fromStorage}`, data.data)
      .then(response => {
        getGroupSum(
          { commit },
          { storageGroupId: response.data.storageGroupId }
        ).then(response2 => {
          commit("setNomenclatureAfterTransfer", {
            response: response.data,
            group: data.group,
            totalSum: response2.data
          });
        });
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function getProjectGroups({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .get(warehouseUrls.getProjectGroups, { params: data })
      .then(response => {
        commit("setProjectGroups", response.data);
        // getAllSum({ commit }, { furnitureId: response.data.id });
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
}

export {
  getWarehouse,
  updateWarehouse,
  setConstruction,
  updateConstruction,
  getConstruction,
  getConstructions,
  addConstruction,
  addGroup,
  updateGroup,
  addNomenclature,
  updateNomenclature,
  getNomenclatures,
  deleteNomenclaturePhoto,
  addNomenclaturePhoto,
  getAllSum,
  getGroupSum,
  transferFromStorage,
  transferFromProject,
  toStorage,
  fromStorage,
  getProjectGroups,
  getProjectNomenclatures
};

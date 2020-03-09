/* eslint-disable */
import api from "@/shared/api";
import { galleryUrls, getConstructionUrl, updateConstructUrl, createConstructUrl } from "@/store/urls"

function getConstructions({ commit }) {
  return new Promise((resolve, reject) => {
    api
      .get(galleryUrls.getConstructionsUrl)
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

function getAllPhotos({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .get(galleryUrls.getAllPhotosUrl, { params: data })
      .then(response => {
        if (response.status === 200) {
          commit("setFixations", response.data);
          resolve();
        } else {
          commit("setFixations", []);
          reject(response.data.message);
        }
      })
      .catch(error => {
        reject();
      });
  });
}

function addFixation({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(galleryUrls.addFixationUrl, data)
      .then(response => {
        if (response.status === 200) {
          commit("addOneFixation", response.data );
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function updateFixation({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(galleryUrls.updateFixationUrl, data)
      .then(response => {
        if (response.status === 200) {
          commit("updateOneFixation", response.data );
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function addPhoto({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(galleryUrls.addPhotoUrl, data)
      .then(response => {
        if (response.status === 200) {
          commit("updateOneFixation", response.data );
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function deletePhoto({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(galleryUrls.deletePhotoUrl, data.data)
      .then(response => {
        if (response.status === 200) {
          commit("updateOneFixationPhotos", { photos: response.data, fixation: data.fixation } );
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
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
        if (response.status === 200) {
          if (data.get("active") !== null) {
            commit("closeConstruction", response.data);
            resolve();
          } else {
            commit("updateConstruction", response.data);
            resolve();
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

export {
  getConstructions,
  getAllPhotos,
  addFixation,
  updateFixation,
  setConstruction,
  deletePhoto,
  addPhoto,
  updateConstruction,
  getConstruction,
  addConstruction
}

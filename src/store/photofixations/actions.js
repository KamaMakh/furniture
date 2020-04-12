import api from "@/shared/api";
import onError from "../onError";
import {
  galleryUrls,
  getConstructionUrl,
  updateConstructUrl,
  createConstructUrl
} from "@/store/urls";

function getConstructions({ commit }) {
  return new Promise((resolve, reject) => {
    api
      .get(galleryUrls.getConstructionsUrl)
      .then(response => {
        commit("setConstructions", response.data);
        resolve(response);
      })
      .catch(error => {
        onError(error, reject);
      });
  });
}

function getConstruction({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .get(getConstructionUrl, { params: { projectId: data.id } })
      .then(response => {
        commit("setConstruction", response.data);
        resolve();
      })
      .catch(error => {
        onError(error, reject);
      });
  });
}

function getAllPhotos({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .get(galleryUrls.getAllPhotosUrl, { params: data })
      .then(response => {
        commit("setFixations", response.data);
        resolve();
      })
      .catch(error => {
        onError(error, reject);
      });
  });
}

function addFixation({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(galleryUrls.addFixationUrl, data)
      .then(response => {
        commit("addOneFixation", response.data);
        resolve(response.data);
      })
      .catch(error => {
        onError(error, reject);
      });
  });
}

function updateFixation({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(galleryUrls.updateFixationUrl, data)
      .then(response => {
        commit("updateOneFixation", response.data);
        resolve(response.data);
      })
      .catch(error => {
        onError(error, reject);
      });
  });
}

function addPhoto({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(galleryUrls.addPhotoUrl, data)
      .then(response => {
        commit("updateOneFixation", response.data);
        resolve(response.data);
      })
      .catch(error => {
        onError(error, reject);
      });
  });
}

function deletePhoto({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(galleryUrls.deletePhotoUrl, data.data)
      .then(response => {
        commit("updateOneFixationPhotos", {
          photos: response.data,
          fixation: data.fixation
        });
        resolve(response.data);
      })
      .catch(error => {
        onError(error, reject);
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
        onError(error, reject);
      });
  });
}

function addConstruction({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(createConstructUrl, data)
      .then(response => {
        if (response.data.subscribeError) {
          reject({ subscribeError: true });
        } else {
          commit("addConstruction", response.data);
          resolve(response.data);
        }
      })
      .catch(error => {
        onError(error, reject);
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
};

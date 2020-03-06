/* eslint-disable */
import api from "@/shared/api";
import { galleryUrls } from "@/store/urls"

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

// function changePhotoComment({ commit }, data) {
//   return new Promise((resolve, reject) => {
//     api
//       .post(galleryUrls, data)
//       .then(response => {
//         if (response.status === 200) {
//           commit("updateDocumentStatus", response.data);
//           resolve(response.data);
//         } else {
//           reject(response.data.message);
//         }
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }

export {
  getConstructions,
  getAllPhotos,
  addFixation,
  updateFixation,
  setConstruction,
  deletePhoto,
  addPhoto
}

/* eslint-disable */
import api from "@/shared/api";
import { documentsUrls, getConstructionUrl, updateConstructUrl, createConstructUrl } from "@/store/urls";

function getConstructions({ commit }) {
  return new Promise((resolve, reject) => {
    api
      .get(documentsUrls.getConstructionsUrl)
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

function getDocuments({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .get(documentsUrls.getAllDocsUrl, { params: data })
      .then(response => {
        if (response.status === 200) {
          commit("setDocuments", response.data);
          commit("setAccess", true);
          resolve();
        } else {
          commit("setDocuments", []);
          commit("setAccess", false);
          reject(response.data.message);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 200) {
          commit("setDocuments", error.response.data);
          resolve();
        } else {
          reject();
        }
      });
  });
}

function addDocument({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(documentsUrls.addDocUrl, data)
      .then(response => {
        if (response.status === 200) {
          commit("setDocument", { response: response.data });
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

function downloadFile({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .get(documentsUrls.getOneDocUrl, { params: data, responseType: "blob" })
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        reject(error.response.data.message);
      });
  });
}

function setConstruction({ commit }, data) {
  commit("setConstruction", data);
}

function changeDocStatus({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(documentsUrls.changeDocStatusUrl, data)
      .then(response => {
        if (response.status === 200) {
          commit("updateDocumentStatus", response.data);
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
  getDocuments,
  addDocument,
  setConstruction,
  updateConstruction,
  getConstruction,
  downloadFile,
  changeDocStatus,
  getConstructions,
  addConstruction
}

/* eslint-disable */
import api from "@/shared/api";
import { documentsUrls } from "@/store/urls"

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

export {
  getDocuments,
  addDocument,
  setConstruction,
  downloadFile,
  changeDocStatus
}

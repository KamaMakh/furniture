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
        if (error.response && error.response.status === 200) {
          if (data.onlyOne) {
            commit("setDocument", {
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

export {
  getDocuments,
  addDocument
}

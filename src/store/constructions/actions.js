import api from "@/shared/api";
import { constructionUrls } from "@/store/urls";

function inviteUser({ commit }, data) {
  commit("ignore");
  return new Promise((resolve, reject) => {
    api
      .post(constructionUrls.inviteUserUrl, data)
      .then(response => {
        if (
          response.data.status &&
          response.data.status === "OK" &&
          response.status === 200
        ) {
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

function inviteMultipartUser({ commit }, data) {
  commit("ignore");
  return new Promise((resolve, reject) => {
    api
      .post(constructionUrls.invitemultipartUrl, data)
      .then(response => {
        if (
          response.data.status &&
          response.data.status === "OK" &&
          response.status === 200
        ) {
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

function removeUser({ commit }, data) {
  commit("ignore");
  return new Promise((resolve, reject) => {
    api
      .post(constructionUrls.removeUserUrl, data)
      .then(response => {
        if (
          response.data.status &&
          response.data.status === "OK" &&
          response.status === 200
        ) {
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

export { inviteUser, inviteMultipartUser, removeUser };

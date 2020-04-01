import api from "@/shared/api";
import {
  statisticsUrls,
  getConstructionUrl,
  updateConstructUrl,
  createConstructUrl
} from "@/store/urls";

function getConstructions({ commit }) {
  return new Promise((resolve, reject) => {
    api
      .get(statisticsUrls.getConstructionsUrl)
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

function getAllTransfers({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .get(statisticsUrls.allTransfers, { params: data })
      .then(response => {
        commit("setTransfers", response.data);
        commit("ignore");
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function getAllTransfersByDate({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .get(statisticsUrls.searchTransfer, { params: data })
      .then(response => {
        commit("setTransfers", response.data);
        commit("ignore");
        resolve(response);
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

export {
  getAllTransfers,
  setConstruction,
  updateConstruction,
  getConstruction,
  getConstructions,
  addConstruction,
  getAllTransfersByDate
};

import store from "../index";

function setTransfers(state, transfers) {
  if (!transfers.data) {
    state.transfers = [];
    state.totalTransfersCount = 0;
  }
  state.transfers = transfers.data.transfers;
  state.totalTransfersCount = transfers.data.totalTransfersCount;
  state.datesInfo = transfers.date;
}

function clearDates(state) {
  state.datesInfo = null;
}

function setConstruction(state, construction) {
  state.documents = [];
  state.construction = construction;
}

function setConstructions(state, constructions) {
  let userId = store.state.user.user.id;
  state.constructions = constructions.sort((a, b) => {
    if (a.creatorId === userId && b.creatorId !== userId) {
      return -1;
    } else if (a.creatorId !== userId && b.creatorId === userId) {
      return 1;
    } else {
      return 0;
    }
  });
}

function updateConstruction(state, construction) {
  state.constructions.forEach((item, key) => {
    if (item.id === construction.id) {
      state.constructions[key] = construction;
    }
  });
}

function closeConstruction(state, construction) {
  state.constructions.forEach((item, key) => {
    if (item.id === construction.id) {
      state.constructions.splice(key, 1);
      if (state.construction.id === construction.id) {
        state.construction = {};
      }
    }
  });
}

function addConstruction(state, construction) {
  state.constructions.unshift(construction);
  setConstruction(state, construction);
}

function setLoadingStatus(state, data) {
  state.tableLoading = data;
}

function ignore() {
  return "ignored";
}

export {
  setTransfers,
  setConstruction,
  setConstructions,
  updateConstruction,
  closeConstruction,
  ignore,
  addConstruction,
  setLoadingStatus,
  clearDates
};

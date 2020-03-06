function setFixations(state, photos) {
  if (!photos) {
    photos = [];
  }
  state.photoList = photos;
}

function addOneFixation(state, data) {
  state.photoList.push(data);
}

function updateOneFixation(state, data) {
  if (state.photoList.length && state.photoList.indexOf(data) > -1) {
    state.photoList[state.photoList.indexOf(data)] = data;
  } else if (state.photoList.length) {
    state.photoList.forEach((item, key) => {
      if (item.id === data.id) {
        state.photoList[key] = data;
      }
    });
  }
}

function updateOneFixationPhotos(state, data) {
  if (state.photoList.length) {
    state.photoList.forEach((item, key) => {
      if (item.id === data.fixation.id) {
        state.photoList[key]["photos"] = data.photos;
      }
    });
  }
}

function setLoadingStatus(state, data) {
  state.listLoading = data;
}

function setConstruction(state, construction) {
  state.construction = construction;
}

function setConstructions(state, constructions) {
  state.constructions = constructions;
}

export {
  setFixations,
  addOneFixation,
  updateOneFixation,
  updateOneFixationPhotos,
  setLoadingStatus,
  setConstruction,
  setConstructions
};

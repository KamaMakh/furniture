function setFixations(state, photos) {
  if (!photos.photofixations) {
    photos.photofixations = [];
  }
  if (!photos.totalPhotofixationsCount) {
    photos.totalPhotofixationsCount = 1;
  }
  state.photoList = photos.photofixations;
  state.total = photos.totalPhotofixationsCount;
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

function setConstructions(state, constructions) {
  state.constructions = constructions;
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

function ignore() {
  return "ignored";
}

function setLoadingStatus(state, data) {
  state.listLoading = data;
}

function setConstruction(state, construction) {
  state.photoList = [];
  state.construction = construction;
}

export {
  setFixations,
  addOneFixation,
  updateOneFixation,
  updateOneFixationPhotos,
  setLoadingStatus,
  setConstruction,
  setConstructions,
  updateConstruction,
  closeConstruction,
  ignore,
  addConstruction
};

/* eslint-disable */
function setFurniture(state, furniture) {
  if (!furniture) {
    furniture = {};
  }
  state.furniture = furniture;
}

function setConstructions(state, constructions) {
  state.constructions = constructions;
}

function setConstruction(state, construction) {
  state.construction = construction;
}

function addConstruction(state, construction) {
  state.constructions.unshift(construction)
}

function setUnits(state, units) {
  state.units = units
}

function updateConstruction(state, construction) {
  state.constructions.forEach((item, key) => {
    if (item.id === construction.id) {
      state.constructions[key] = item;
    }
  });
}

function addGroup(state, group) {
  state.furniture.groups.unshift(group);
}

function setNomenclatures(state, data) {
  state.furniture.groups[state.furniture.groups.indexOf(data.group)]["children"] = data.response.length;
  state.furniture.groups.splice(state.furniture.groups.indexOf(data.group)+1, 0, ...data.response);
}

function setNomenclature(state, data) {
  state.furniture.groups.splice(state.furniture.groups.indexOf(data.group)+1, 0, data.response)
}

function deleteNomenclatures(state, data) {
  if (state.furniture.groups.indexOf(data.nomenclature) !== -1) {
    state.furniture.groups.splice(state.furniture.groups.indexOf(data.nomenclature), 1);
  }
}

function updateNomenclaturePhoto(state, data) {
  if(state.furniture.groups.indexOf(data.nomenclature) > -1) {
    state.furniture.groups[state.furniture.groups.indexOf(data.nomenclature)]["photos"] = data.response;
  }
}

export {
  setFurniture,
  setConstructions,
  setConstruction,
  addConstruction,
  updateConstruction,
  addGroup,
  setUnits,
  setNomenclatures,
  setNomenclature,
  deleteNomenclatures,
  updateNomenclaturePhoto
};

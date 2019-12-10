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
  console.log("commit111");
  state.constructions.unshift(construction)
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

export {
  setFurniture,
  setConstructions,
  setConstruction,
  addConstruction,
  updateConstruction,
  addGroup
};

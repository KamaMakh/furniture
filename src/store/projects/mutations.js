function setConstruction(state, construction) {
  state.construction = construction;
}

function setConstructions(state, constructions) {
  state.constructions = constructions;
}

function addConstruction(state, construction) {
  state.constructions.push(construction)
}

function updateConstruction(state, construction) {
  state.constructions.forEach((item, key) => {
    if (item.id === construction.id) {
      state.constructions[key] = item;
    }
  });
}

function setWarehouse(state, warehouse) {
  state.warehouse = warehouse;
}

export {
  setConstruction,
  setConstructions,
  addConstruction,
  updateConstruction,
  setWarehouse
};

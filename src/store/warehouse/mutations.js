function setWarehouse(state, warehouse) {
  if (!warehouse) {
    warehouse = {};
  }
  state.warehouse = warehouse;
}

function setAccess(state, data) {
  state.access = data;
}

function setConstruction(state, construction) {
  state.documents = [];
  state.construction = construction;
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

function addGroup(state, group) {
  state.warehouse[0].groups.push(group);
}

function updateGroup(state, data) {
  if (state.warehouse[0].groups) {
    state.warehouse[0].groups.forEach((item, key) => {
      if (item.id === data.group.id) {
        state.warehouse[0].groups.splice(key, 1, data.group);
      }
    });
  }
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

function setNomenclature(state, data) {
  data.response["groupId"] = data.group.id;
  state.warehouseNomenclatures.push(data.response);
  if (state.warehouse[0].groups) {
    state.warehouse[0].groups.forEach((item, key) => {
      if (item.id === data.group.id) {
        state.warehouse[0].groups[key]["totalSum"] = data.totalSum;
      }
    });
  }
}

function setNomenclatures(state, data) {
  if (data.response) {
    data.response.forEach((item, key) => {
      data.response[key]["groupId"] = data.group.id;
    });
    state.warehouseNomenclatures.push(...data.response);
  }
}

function updateNomenclature(state, data) {
  state.warehouseNomenclatures.forEach((item, key) => {
    if (
      item["storageNomenclatureId"] === data.nomenclature.storageNomenclatureId
    ) {
      data.response["groupId"] = data.nomenclature.groupId;
      state.warehouseNomenclatures[key] = data.response;
    }
    state.warehouseNomenclatures.unshift("trigger");
    state.warehouseNomenclatures.shift();
  });
  if (state.warehouse[0].groups) {
    state.warehouse[0].groups.forEach((item, key) => {
      if (item.id === data.nomenclature.groupId) {
        state.warehouse[0].groups[key]["totalSum"] = data.totalSum;
      }
    });
  }
}

function updateNomenclaturePhoto(state, data) {
  state.warehouseNomenclatures.forEach((item, key) => {
    if (
      item["storageNomenclatureId"] === data.nomenclature.storageNomenclatureId
    ) {
      state.warehouseNomenclatures[key]["photos"] = data.response;
    }
  });
}

function setTotalSum(state, data) {
  state.totalSum = data;
}

function ignore() {
  return "ignored";
}

export {
  setWarehouse,
  setAccess,
  setConstruction,
  setConstructions,
  updateConstruction,
  closeConstruction,
  ignore,
  addConstruction,
  setLoadingStatus,
  addGroup,
  updateGroup,
  setNomenclature,
  updateNomenclature,
  setNomenclatures,
  updateNomenclaturePhoto,
  setTotalSum
};

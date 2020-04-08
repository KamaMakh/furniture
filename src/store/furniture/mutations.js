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
  state.groups = [];
  state.furniture = {};
  state.construction = construction;
}

function addConstruction(state, construction) {
  state.constructions.unshift(construction);
  setConstruction(state, construction);
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

function setUnits(state, units) {
  state.units = units;
}

function updateConstruction(state, construction) {
  state.constructions.forEach((item, key) => {
    if (item.id === construction.id) {
      state.constructions[key] = construction;
    }
  });
}

function addGroup(state, group) {
  state.furniture.groups.push(group);
}

function updateGroup(state, data) {
  let start = state.furniture.groups.indexOf(data.group),
    children = state.furniture.groups.slice(
      start + 1,
      data.group.children + start + 1
    );

  if (children.length) {
    children.forEach(item => {
      item["group"] = data.group;
    });
  }

  state.furniture.groups.splice(start + 1, children.length, ...children);
}

function setNomenclatures(state, data) {
  state.furniture.groups[state.furniture.groups.indexOf(data.group)][
    "children"
  ] = data.response.length + 1;
  state.furniture.groups[state.furniture.groups.indexOf(data.group)][
    "totalSum"
  ] = data.totalSum;
  data.response.forEach((item, key) => {
    data.response[key]["group"] = data.group;
  });

  data.totalSum["group"] = data.group;
  data.totalSum["isTotal"] = true;
  data.response.push(data.totalSum);

  state.furniture.groups.splice(
    state.furniture.groups.indexOf(data.group) + 1,
    0,
    ...data.response
  );
}

function setNomenclature(state, data) {
  state.furniture.groups[state.furniture.groups.indexOf(data.group)][
    "children"
  ] += 1;
  data.response["group"] = data.group;
  state.furniture.groups.splice(
    state.furniture.groups.indexOf(data.group) + 1,
    0,
    data.response
  );
  data.totalSum["isTotal"] = true;
  data.totalSum["group"] = data.group;
  state.furniture.groups.splice(data.group["children"], 1, data.totalSum);
}

function deleteNomenclatures(state, data) {
  if (state.furniture.groups.indexOf(data.nomenclature) !== -1) {
    state.furniture.groups.splice(
      state.furniture.groups.indexOf(data.nomenclature),
      1
    );
    if (
      state.furniture.groups[
        state.furniture.groups.indexOf(data.nomenclature.group)
      ] &&
      state.furniture.groups[
        state.furniture.groups.indexOf(data.nomenclature.group)
      ].hasOwnProperty("children")
    ) {
      state.furniture.groups[
        state.furniture.groups.indexOf(data.nomenclature.group)
      ]["children"] -= 1;
      data.totalSum["isTotal"] = true;
      data.totalSum["group"] = data.nomenclature.group;
      state.furniture.groups.splice(
        data.nomenclature.group["children"],
        1,
        data.totalSum
      );
    }
  }
}

function hideNomenclatures(state, data) {
  if (state.furniture.groups.indexOf(data.group) !== -1) {
    if (
      state.furniture.groups[state.furniture.groups.indexOf(data.group)] &&
      state.furniture.groups[
        state.furniture.groups.indexOf(data.group)
      ].hasOwnProperty("children")
    ) {
      state.furniture.groups.splice(
        state.furniture.groups.indexOf(data.group) + 1,
        data.group.children
      );
      state.furniture.groups[state.furniture.groups.indexOf(data.group)][
        "children"
      ] = 0;
    }
  }
}
function updateNomenclature(state, data) {
  if (state.furniture.groups.indexOf(data.nomenclature) > -1) {
    data.response["group"] = data.nomenclature["group"];
    data.totalSum["group"] = data.nomenclature["group"];
    data.totalSum["isTotal"] = true;
    state.furniture.groups.splice(
      data.nomenclature["group"]["children"],
      1,
      data.totalSum
    );
    state.furniture.groups[state.furniture.groups.indexOf(data.nomenclature)] =
      data.response;
  } else {
    state.furniture.groups.forEach((item, key) => {
      if (
        item["id"] === data.nomenclature.id &&
        item["count"] === data.nomenclature.count
      ) {
        state.furniture.groups[key] = data.response;
      }
    });
  }
}

function updateNomenclaturePhoto(state, data) {
  if (state.furniture.groups.indexOf(data.nomenclature) > -1) {
    state.furniture.groups[state.furniture.groups.indexOf(data.nomenclature)][
      "photos"
    ] = data.response;
  } else {
    state.furniture.groups.forEach((item, key) => {
      if (
        item["id"] === data.nomenclature.id &&
        item["count"] === data.nomenclature.count
      ) {
        state.furniture.groups[key]["photos"] = data.response;
      }
    });
  }
}

function editEnabledGroups(state, data) {
  if (data.id !== null) {
    state.enabledGroups[data.id] = data.value;
  } else {
    state.enabledGroups = [];
  }
}

function setSubscribes(state, data) {
  state.subscribes = data;
}

function ignore() {
  return "ignored";
}

function setLoadingStatus(state, data) {
  state.tableLoading = data;
}

function setTotalSum(state, data) {
  state.totalSum = data;
}

function setGroupSum(state, data) {
  state.groupSum = data;
}

function clearState(state) {
  state.furniture = {};
  state.construction = {};
  state.constructions = [];
  state.units = [];
}

export {
  setFurniture,
  setConstructions,
  setConstruction,
  addConstruction,
  updateConstruction,
  addGroup,
  updateGroup,
  setUnits,
  setNomenclatures,
  setNomenclature,
  deleteNomenclatures,
  updateNomenclaturePhoto,
  updateNomenclature,
  clearState,
  hideNomenclatures,
  ignore,
  setSubscribes,
  editEnabledGroups,
  closeConstruction,
  setLoadingStatus,
  setTotalSum,
  setGroupSum
};

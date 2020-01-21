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
  state.constructions.unshift(construction);
}

function setUnits(state, units) {
  state.units = units;
}

function updateConstruction(state, construction) {
  state.constructions.forEach((item, key) => {
    if (item.id === construction.id) {
      state.constructions[key] = item;
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
  ] = data.response.length;
  data.response.forEach((item, key) => {
    data.response[key]["group"] = data.group;
  });
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
    state.furniture.groups[state.furniture.groups.indexOf(data.nomenclature)] =
      data.response;
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

function ignore() {
  return "ignored";
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
  ignore
};

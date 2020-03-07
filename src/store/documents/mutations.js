function setDocuments(state, documents) {
  if (!documents) {
    documents = [];
  }
  state.documents = documents;
}

function setDocument(state, data) {
  state.documents.splice(
    state.documents.indexOf(data.group) + 1,
    0,
    data.response
  );
}

function setAccess(state, data) {
  state.access = data;
}

function setConstruction(state, construction) {
  state.construction = construction;
}

function updateDocumentStatus(state, data) {
  if (state.documents.length) {
    state.documents.forEach((item, key) => {
      if (item.id === data.id) {
        state.documents[key]["status"] = data["status"];
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
}

function ignore() {
  return "ignored";
}

export {
  setDocuments,
  setDocument,
  setAccess,
  setConstruction,
  updateDocumentStatus,
  setConstructions,
  updateConstruction,
  closeConstruction,
  ignore,
  addConstruction
};

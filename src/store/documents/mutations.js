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

export {
  setDocuments,
  setDocument,
  setAccess,
  setConstruction,
  updateDocumentStatus
};

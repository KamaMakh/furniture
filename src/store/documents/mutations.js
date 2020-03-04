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

export { setDocuments, setDocument, setAccess, setConstruction };

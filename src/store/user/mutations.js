function setUser(state, user) {
  state.user = user;
}

function resetUser(state) {
  state.user = {};
}

function setUsers(state, data) {
  state.users = data.users;
}

export {
  setUser,
  resetUser,
  setUsers,
};

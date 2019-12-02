function setUser(state, user) {
  state.user = user;
}

function resetUser(state) {
  state.user = {};
}

function setUsers(state, data) {
  state.usersTotal = parseInt(data.total, 10);
  state.users = data.users;
}

export {
  setUser,
  resetUser,
  setUsers,
};

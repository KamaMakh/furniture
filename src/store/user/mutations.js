/*eslint-disable*/
function setUser(state, user) {
  state.user = user;
  if (user.userRoleList) {
    let rolesArray = [];
    user.userRoleList.forEach(item => {
      rolesArray.push(item.authorities);
    });
    setRoles(state, rolesArray);
  }
}

function setCurrencies(state, currencies) {
  state.currencies = currencies;
}

function resetUser(state) {
  state.user = {};
  state.roles = {};
}

function setUsers(state, data) {
  state.users = data.users;
}

function setRoles(state, data) {
  state.roles = data
}

export {
  setUser,
  resetUser,
  setUsers,
  setRoles,
  setCurrencies
};

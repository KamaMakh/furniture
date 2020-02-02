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

function setAvatar(state, data) {
  state.user.avatar = data;
}

function setEnableModules(state) {
  if(state.roles[0] === "ROLE_CLIENT") {
    state.modules = [
      "Furniture"
    ];
  } else if(state.roles[0] === "ROLE_SUPERVISOR" || state.roles[0] === "ROLE_ARCHITECT" || state.roles[0] === "ROLE_MAGAZINE") {
    state.modules = [
      "Furniture",
      "Documents",
      "Projects",
      "Users",
      "Statistics",
      "Planning"
    ];
  }
}

export {
  setUser,
  resetUser,
  setUsers,
  setRoles,
  setCurrencies,
  setEnableModules,
  setAvatar
};

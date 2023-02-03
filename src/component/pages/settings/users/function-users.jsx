// get role id admin
export const getRoleIdAdmin = (role) => {
  let roleId = -1;
  if (role.length > 0) {
    const result = role.filter((item) => item.role_is_admin === 1);
    roleId = result.length ? result[0].role_aid : -1;
  }
  return roleId;
};

// get role id admin
export const getRoleIdDev = (role) => {
  let roleId = -1;
  if (role.length > 0) {
    const result = role.filter((item) => item.role_is_developer === 1);
    roleId = result.length ? result[0].role_aid : -1;
  }
  return roleId;
};

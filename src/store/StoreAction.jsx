export const setError = (val) => {
  return {
    type: "ERROR",
    payload: val,
  };
};

export const setInfo = (val) => {
  return {
    type: "INFO",
    payload: val,
  };
};

export const setMessage = (val) => {
  return {
    type: "MESSAGE",
    payload: val,
  };
};

export const setSuccess = (val) => {
  return {
    type: "SUCCESS",
    payload: val,
  };
};

export const setSave = (val) => {
  return {
    type: "SAVE",
    payload: val,
  };
};

export const setIsShow = (val) => {
  return {
    type: "SHOW",
    payload: val,
  };
};

export const setIsConfirm = (val) => {
  return {
    type: "CONFIRM",
    payload: val,
  };
};

export const setIsRestore = (val) => {
  return {
    type: "RESTORE",
    payload: val,
  };
};

export const setIsAdd = (val) => {
  return {
    type: "IS_ADD",
    payload: val,
  };
};

export const setIsFinish = (val) => {
  return {
    type: "IS_FINISH",
    payload: val,
  };
};

export const setIsSearch = (val) => {
  return {
    type: "IS_SEARCH",
    payload: val,
  };
};

export const setStartIndex = (val) => {
  return {
    type: "START_INDEX",
    payload: val,
  };
};

export const setCreatePassSuccess = (val) => {
  return {
    type: "IS_CREATE_PASS_SUCCCESS",
    payload: val,
  };
};

export const setForgetPassSuccess = (val) => {
  return {
    type: "IS_FORGET_PASS_SUCCCESS",
    payload: val,
  };
};

export const setAdminForgetPassSuccess = (val) => {
  return {
    type: "IS_ADMIN_FORGET_PASS_SUCCCESS",
    payload: val,
  };
};

export const setIsLogin = (val) => {
  return {
    type: "IS_LOGIN",
    payload: val,
  };
};

export const setIsLogout = (val) => {
  return {
    type: "IS_LOGOUT",
    payload: val,
  };
};

export const setCredentials = (
  settings_account_aid,
  settings_account_email,
  settings_account_user_id,
  fname,
  lname,
  don_member_address,
  don_member_city,
  don_member_state,
  don_member_zipcode,
  don_member_cus_id,
  account_role_aid,
  account_role_name,
  account_role_is_admin,
  account_role_is_member,
  payment_method,
  default_source
) => {
  return {
    type: "CREDENTIALS",
    payload: {
      settings_account_aid,
      settings_account_email,
      settings_account_user_id,
      fname,
      lname,
      don_member_address,
      don_member_city,
      don_member_state,
      don_member_zipcode,
      don_member_cus_id,
      account_role_aid,
      account_role_name,
      account_role_is_admin,
      account_role_is_member,
      payment_method,
      default_source,
    },
  };
};

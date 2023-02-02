import fetchApi from "./fetchApi";

import {
  consoleLog,
  devApiUrl,
  devNavUrl,
  doList,
  doLoadmore,
  setStorageRoute,
  UrlAdmin,
} from "./functions-general";

import {
  setAdminForgetPassSuccess,
  setCreatePassSuccess,
  setCredentials,
  setError,
  setForgetPassSuccess,
  setIsAdd,
  setIsConfirm,
  setIsLogin,
  setIsRestore,
  setMessage,
  setSave,
  setSuccess,
} from "../../store/StoreAction";
import { checkRoleToRedirect } from "./login-functions";

export const fetchData = async (
  //parameters
  setLoading, // Boolean loading values optional
  endpoint, // url endpoint
  fd, // form data values
  setResult, // result data
  successMsg, // success msg optional
  errorMsg, // additional error msg if needed optional
  dispatch, // context api action
  store, // context api state
  successModal, // boolean to show success modal
  isLoadMore, // boolean to show load more functionality button
  navigate = null, // props optional
  method // method (GET, POST, PUT, DELETE)
) => {
  setLoading !== null && setLoading(true);

  const data = await fetchApi(devApiUrl + endpoint, fd, dispatch, method);
  consoleLog(data);

  // if result data is undefined or false
  if (data === undefined || !data) {
    setResult(-1);
    dispatch(setError(true));
    dispatch(setMessage("API / Network Error"));
    setLoading !== null && setLoading(false);
    return;
  }

  // used for result set by read api
  isLoadMore && setResult !== null && doLoadmore(data, setResult);
  !isLoadMore && setResult !== null && doList(data, setResult);

  // if result data is empty and success is false
  if (!data.success) {
    setLoading !== null && setLoading(false);
    dispatch(setError(true));
    dispatch(setMessage(data.error));
    return;
  }

  // if result data is not empty and success is true
  if (data.success) {
    setLoading !== null && setLoading(false);
    // add modal will be closed when used
    if (store.isAdd) {
      dispatch(setIsAdd(false));
      //this will refresh table list
      store.isSave ? dispatch(setSave(false)) : dispatch(setSave(true));
    }

    // delete modal will be closed when used
    if (store.isConfirm) {
      dispatch(setIsConfirm(false));
      store.isSave ? dispatch(setSave(false)) : dispatch(setSave(true));
    }

    // restore modal will be closed when used
    if (store.isRestore) {
      dispatch(setIsRestore(false));
      store.isSave ? dispatch(setSave(false)) : dispatch(setSave(true));
    }

    // success modal will be closed when used
    if (successModal) {
      dispatch(setSuccess(true));
      dispatch(setMessage(successMsg));
      // return;
    }

    // redirect to other page after request forgot password
    if (store.isForgetPassSuccess) {
      dispatch(setForgetPassSuccess(false));
      window.location.replace(`${devNavUrl}/reset-password-success`);
    }

    // redirect to other page after request forgot password for admin
    if (store.isAdminForgetPassSuccess) {
      dispatch(setAdminForgetPassSuccess(false));
      window.location.replace(
        `${devNavUrl}/${UrlAdmin}/reset-password-success`
      );
    }

    // redirect to other page after request forgot password
    if (store.isCreatePassSuccess) {
      dispatch(setCreatePassSuccess(false));
      navigate(`${devNavUrl}/create-password-success`);
    }

    // redirect to other page after login
    if (store.isLogin) {
      // dispatch(setCredentials(data.mail));
      dispatch(
        setCredentials(
          data.mail.settings_account_aid,
          data.mail.settings_account_email,
          data.mail.settings_account_user_id,
          data.mail.don_member_name === undefined
            ? data.mail.don_admin_fname
            : data.mail.don_member_name,
          data.mail.don_admin_fname === undefined
            ? ""
            : data.mail.don_admin_fname,
          data.mail.don_member_address === undefined
            ? ""
            : data.mail.don_member_address,
          data.mail.don_member_city === undefined
            ? ""
            : data.mail.don_member_city,
          data.mail.don_member_state === undefined
            ? ""
            : data.mail.don_member_state,
          data.mail.don_member_zipcode === undefined
            ? ""
            : data.mail.don_member_zipcode,
          data.mail.don_member_cus_id === undefined
            ? ""
            : data.mail.don_member_cus_id,
          data.mail.account_role_aid,
          data.mail.account_role_name,
          data.mail.account_role_is_admin,
          data.mail.account_role_is_member
        )
      );
      setStorageRoute(data.data);
      // setStorageRoute(data.data, data.mail);
      dispatch(setIsLogin(false));
      checkRoleToRedirect(navigate, data.mail);
    }
  }
};

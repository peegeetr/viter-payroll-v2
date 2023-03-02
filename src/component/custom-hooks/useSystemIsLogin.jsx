import React from "react";
import { setIsLogin } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import { checkLocalStorage } from "../helpers/CheckLocalStorage";
import fetchApi from "../helpers/fetchApi";
import { devApiUrl } from "../helpers/functions-general";
import { checkRoleToRedirect } from "../helpers/login-functions";

const useSystemIsLogin = (navigate) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loginLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const fetchLogin = async () => {
      const login = await fetchApi(
        devApiUrl + "/v1/user-systems/token",
        {
          token: checkLocalStorage().token,
        },
        null,
        "post"
      );

      if (typeof login === "undefined" || !login.success) {
        localStorage.removeItem("fbsPayroll");
        setLoading(false);
      } else {
        setLoading(false);
        checkRoleToRedirect(navigate, login.data);
      }
    };
    if (
      checkLocalStorage() !== null &&
      checkLocalStorage().token !== undefined
    ) {
      fetchLogin();
      dispatch(setIsLogin(false));
    } else {
      setLoading(false);
      dispatch(setIsLogin(true));
    }
  }, []);

  return { loginLoading };
};

export default useSystemIsLogin;

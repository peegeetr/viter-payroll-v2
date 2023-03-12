import React from "react";
import { setIsLogin } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import { checkLocalStorage } from "../helpers/CheckLocalStorage";
import fetchApi from "../helpers/fetchApi";
import { devApiUrl } from "../helpers/functions-general";
import { checkRoleToRedirect } from "../helpers/login-functions";

const useIsLogin = (navigate) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const fetchLogin = async () => {
      const login = await queryData(
        "/v1/user-others/token",
        { ...values, token: fbsPayroll.token },
        "post"
      );

      if (typeof login === "undefined" || !login.status) {
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

  return { loading };
};

export default useIsLogin;

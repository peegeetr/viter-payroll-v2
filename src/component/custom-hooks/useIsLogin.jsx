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
      const login = await fetchApi(
        devApiUrl + "/admin/settings/account/read-account-token.php",
        {
          token: checkLocalStorage().token,
          memberId: store.credentials.account_role_is_admin === "1" ? "0" : "1",
        }
      );

      if (typeof login === "undefined" || !login.status) {
        localStorage.removeItem("fwcdonationtoken");
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

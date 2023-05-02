import React from "react";
import { Navigate } from "react-router-dom";
import { setCredentials, setError } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import fetchApi from "../../helpers/fetchApi";
import {
  consoleLog,
  devApiUrl,
  devNavUrl,
} from "../../helpers/functions-general";
import TableSpinner from "../../partials/spinners/TableSpinner";

const ProtectedRouteOther = ({ children }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(true);
  const [isAuth, setIsAuth] = React.useState("");
  const fbsPayroll = JSON.parse(localStorage.getItem("fbsPayroll"));

  React.useEffect(() => {
    const fetchLogin = async () => {
      const login = await fetchApi(
        devApiUrl + "/v1/user-others/token",
        {
          token: fbsPayroll.token,
        },
        null,
        "post"
      );

      consoleLog(login);
      consoleLog(typeof login);

      if (typeof login === "undefined" || !login.success) {
        setLoading(false);
        setIsAuth("456");
        localStorage.removeItem("fbsPayroll");
      } else {
        dispatch(setCredentials(login.data));
        setIsAuth("123");
        setLoading(false);
        delete login.data.user_other_password;
        delete login.data.role_description;
        delete login.data.role_created;
        delete login.data.role_datetime;
      }
    };

    if (fbsPayroll !== null) {
      fetchLogin();
    } else {
      setLoading(false);
      localStorage.removeItem("fbsPayroll");
      setIsAuth("456");
    }
  }, [dispatch]);

  return loading ? (
    <TableSpinner />
  ) : isAuth === "123" ? (
    children
  ) : isAuth === "456" ? (
    <Navigate to={`${devNavUrl}/login`} />
  ) : (
    <p>API end point error / Page not found.</p>
  );
};

export default ProtectedRouteOther;

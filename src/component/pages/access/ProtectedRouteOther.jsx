import React from "react";
import { Navigate } from "react-router-dom";
import { setCredentials } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import fetchApi from "../../helpers/fetchApi";
import { devApiUrl, devNavUrl } from "../../helpers/functions-general";
import ModalError from "../../partials/modals/ModalError";
import TableSpinner from "../../partials/spinners/TableSpinner";

const ProtectedRouteOther = ({ children }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(true);
  const [isAuth, setIsAuth] = React.useState("");
  const hrisv3token = JSON.parse(localStorage.getItem("hrisv3token"));

  React.useEffect(() => {
    const fetchLogin = async () => {
      const login = await fetchApi(
        devApiUrl + "/v1/user-others/token",
        {
          token: hrisv3token.token,
        },
        null,
        "post"
      );

      console.log(login);
      console.log(typeof login);

      if (typeof login === "undefined" || !login.success) {
        setLoading(false);
        setIsAuth("456");
      } else {
        dispatch(setCredentials(login.data));
        setIsAuth("123");
        setLoading(false);
      }

      delete login.data.user_other_password;
      delete login.data.role_description;
      delete login.data.role_created;
      delete login.data.role_datetime;
    };

    if (hrisv3token !== null) {
      fetchLogin();
    } else {
      setLoading(false);
      localStorage.removeItem("hrisv3token");
      setIsAuth("456");
    }
  }, [dispatch]);

  return loading ? (
    <TableSpinner />
  ) : isAuth === "123" ? (
    children
  ) : isAuth === "456" ? (
    <>
      <Navigate to={`${devNavUrl}/login`} />
      {store.error && <ModalError />}
    </>
  ) : (
    <p>API end point error / Page not found.</p>
  );
};

export default ProtectedRouteOther;

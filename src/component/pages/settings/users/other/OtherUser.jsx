import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { setIsAdd } from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  devNavUrl,
  UrlSystem,
} from "../../../../helpers/functions-general";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Footer from "../../../../partials/Footer";
import Header from "../../../../partials/Header";
import ModalError from "../../../../partials/modals/ModalError";
import ModalSuccess from "../../../../partials/modals/ModalSuccess";
import Navigation from "../../../../partials/Navigation";
import FetchingSpinner from "../../../../partials/spinners/FetchingSpinner";
import { getRoleIdAdmin } from "../function-users";
import ModalAddOtherUser from "./ModalAddOtherUser";
import OtherUserList from "./OtherUserList";

const OtherUser = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  // use if not loadmore button undertime
  const { isLoading, data: role } = useQueryData(
    `${devApiUrl}/v1/roles`, // endpoint
    "get", // method
    "role" // key
  );

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Header />
      <Navigation menu="settings" />
      <div className="wrapper ">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs />
          {getRoleIdAdmin(role?.data) !== -1 && (
            <div className="flex items-center gap-1">
              <button type="button" className="btn-primary" onClick={handleAdd}>
                <FaPlusCircle />
                <span>Add</span>
              </button>
            </div>
          )}
        </div>
        <hr />

        <div className=" w-full pt-5 pb-20">
          {isLoading ? (
            <FetchingSpinner />
          ) : getRoleIdAdmin(role?.data) === -1 ? (
            <p className="flex-col p-2">
              There's no created role for admin.
              {store.credentials.data.role_is_developer === 1 && (
                <>
                  Please{" "}
                  <Link
                    to={`${devNavUrl}/${UrlSystem}/settings/users/role`}
                    className="underline text-primary"
                  >
                    create one
                  </Link>{" "}
                  first.
                </>
              )}
            </p>
          ) : (
            <OtherUserList setItemEdit={setItemEdit} />
          )}
        </div>
        <Footer />
      </div>

      {store.isAdd && (
        <ModalAddOtherUser
          item={itemEdit}
          roleId={getRoleIdAdmin(role?.data)}
        />
      )}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default OtherUser;

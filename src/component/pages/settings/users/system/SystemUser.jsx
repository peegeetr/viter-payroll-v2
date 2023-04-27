import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { devApiUrl } from "../../../../helpers/functions-general";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Footer from "../../../../partials/Footer";
import Header from "../../../../partials/Header";
import Navigation from "../../../../partials/Navigation";
import ServerError from "../../../../partials/ServerError";
import ModalError from "../../../../partials/modals/ModalError";
import ModalSuccess from "../../../../partials/modals/ModalSuccess";
import FetchingSpinner from "../../../../partials/spinners/FetchingSpinner";
import { getRoleIdDev } from "../function-users";
import ModalAddSystemUser from "./ModalAddSystemUser";
import SystemUserList from "./SystemUserList";

const SystemUser = () => {
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
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs />
          <div className="flex items-center gap-1">
            <button type="button" className="btn-primary" onClick={handleAdd}>
              <FaPlusCircle />
              <span>Add</span>
            </button>
          </div>
        </div>
        <hr />

        <div className="w-full pt-5 pb-20">
          {isLoading ? (
            <FetchingSpinner />
          ) : getRoleIdDev(role?.data) === -1 ? (
            <ServerError />
          ) : (
            <SystemUserList setItemEdit={setItemEdit} />
          )}
        </div>
        <Footer />
      </div>

      {store.isAdd && (
        <ModalAddSystemUser item={itemEdit} roleId={getRoleIdDev(role?.data)} />
      )}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default SystemUser;

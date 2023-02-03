import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import useLoadRole from "../../../../custom-hooks/useLoadRole";
import { devApiUrl } from "../../../../helpers/functions-general";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Footer from "../../../../partials/Footer";
import Header from "../../../../partials/Header";
import ModalError from "../../../../partials/modals/ModalError";
import ModalSuccess from "../../../../partials/modals/ModalSuccess";
import Navigation from "../../../../partials/Navigation";
import ServerError from "../../../../partials/ServerError";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import { getRoleIdAdmin } from "../function-users";
import ModalAddOtherUser from "./ModalAddOtherUser";
import OtherUserList from "./OtherUserList";

const OtherUser = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const { role, roleLoading } = useLoadRole(`${devApiUrl}/v1/roles`, "get");

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Header />
      <Navigation menu="settings" />
      <div className="wrapper">
        <div className="flex items-center justify-between mb-3 whitespace-nowrap overflow-auto gap-2">
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
          {roleLoading ? (
            <TableSpinner />
          ) : getRoleIdAdmin(role) === -1 ? (
            <ServerError />
          ) : (
            <OtherUserList setItemEdit={setItemEdit} />
          )}
        </div>
        <Footer />
      </div>

      {store.isAdd && (
        <ModalAddOtherUser item={itemEdit} roleId={getRoleIdAdmin(role)} />
      )}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default OtherUser;

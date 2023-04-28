import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Footer from "../../../../partials/Footer";
import Header from "../../../../partials/Header";
import ModalError from "../../../../partials/modals/ModalError";
import ModalSuccess from "../../../../partials/modals/ModalSuccess";
import Navigation from "../../../../partials/Navigation";
import ModalAddRole from "./ModalAddRole";
import RoleList from "./RoleList";
import PageNotFound from "../../../../partials/PageNotFound";

const Role = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const fbsPayroll = JSON.parse(localStorage.getItem("fbsPayroll"));
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  if (
    fbsPayroll.isDev === false ||
    store.credentials.data.role_is_developer !== 1
  ) {
    return <PageNotFound />;
  }
  return (
    <>
      <Header />
      <Navigation menu="settings" />
      <div className="wrapper">
        <div className="flex items-center justify-between mb-3 whitespace-nowrap overflow-auto gap-2 print:hidden">
          <BreadCrumbs />
          <div className="flex items-center gap-1">
            <button type="button" className="btn-primary" onClick={handleAdd}>
              <FaPlusCircle />
              <span>Add</span>
            </button>
          </div>
        </div>
        <hr className=" print:hidden" />

        <div className="w-full pt-5 pb-20">
          <RoleList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalAddRole item={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Role;

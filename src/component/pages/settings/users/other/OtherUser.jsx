import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import useLoadRole from "../../../../custom-hooks/useLoadRole";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Footer from "../../../../partials/Footer";
import Header from "../../../../partials/Header";
import ModalError from "../../../../partials/modals/ModalError";
import ModalSuccess from "../../../../partials/modals/ModalSuccess";
import Navigation from "../../../../partials/Navigation";
import ModalAddOtherUser from "./ModalAddOtherUser";
import OtherUserList from "./OtherUserList";

const OtherUser = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const { role } = useLoadRole("/v1/roles", "get");

  // consoleLog(result);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Header />
      <Navigation menu="settings" />
      <div className="relative min-h-screen pt-20 ml-0 px-5 md:ml-20 lg:ml-40 lg:px-10">
        {/* <h4 className="text-xl">Settings</h4> */}

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
          <OtherUserList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalAddOtherUser itemEdit={itemEdit} role={role} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default OtherUser;

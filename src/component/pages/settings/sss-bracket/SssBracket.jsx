import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import BreadCrumbs from "../../../partials/BreadCrumbs.jsx";
import Footer from "../../../partials/Footer.jsx";
import Header from "../../../partials/Header.jsx";
import ModalError from "../../../partials/modals/ModalError.jsx";
import ModalSuccess from "../../../partials/modals/ModalSuccess.jsx";
import Navigation from "../../../partials/Navigation.jsx";
import ModalSssBracket from "./ModalSssBracket.jsx";
import SssBracketList from "./SssBracketList.jsx";

const SssBracket = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [itemNum, setItemNum] = React.useState(null);
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <Header />
      <Navigation menu="settings" />
      <div className="relative min-h-screen pt-20 ml-0 px-5 md:ml-20 lg:ml-40 lg:px-10">
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
          <SssBracketList setItemEdit={setItemEdit} setItemNum={setItemNum} />
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalSssBracket itemEdit={itemEdit} itemNum={itemNum} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default SssBracket;

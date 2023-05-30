import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../../store/StoreContext.jsx";
import BreadCrumbs from "../../../../partials/BreadCrumbs.jsx";
import Footer from "../../../../partials/Footer.jsx";
import Header from "../../../../partials/Header.jsx";
import ModalError from "../../../../partials/modals/ModalError.jsx";
import ModalSuccess from "../../../../partials/modals/ModalSuccess.jsx";
import Navigation from "../../../../partials/Navigation.jsx";
import {
  default as ModalAddTaxMonthly,
  default as ModalTaxMonthly,
} from "./ModalAddTaxMonthly.jsx";
import TaxMonthlyList from "./TaxMonthlyList.jsx";

const TaxMonthly = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  // consoleLog(result);

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
          <TaxMonthlyList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>
      {store.isAdd && <ModalAddTaxMonthly itemEdit={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default TaxMonthly;

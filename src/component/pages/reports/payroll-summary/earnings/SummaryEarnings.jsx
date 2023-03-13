import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import { getUserType } from "../../../../helpers/functions-general";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Footer from "../../../../partials/Footer";
import Header from "../../../../partials/Header";
import ModalError from "../../../../partials/modals/ModalError";
import ModalSuccess from "../../../../partials/modals/ModalSuccess";
import Navigation from "../../../../partials/Navigation";
import SummaryEarningsList from "./SummaryEarningsList";

const SummaryEarnings = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  return (
    <>
      <Header />
      <Navigation menu="employee" />
      <div className="wrapper">
        <BreadCrumbs />
        <hr />

        <div className="w-full pt-5 pb-20">
          <SummaryEarningsList />
        </div>
        <Footer />
      </div>

      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default SummaryEarnings;

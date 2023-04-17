import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import { getUserType } from "../../../helpers/functions-general";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import PayrunSummaryList from "./PayrunSummaryList";

const PayrunSummary = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  return (
    <>
      <Header />
      <Navigation menu="reports" />
      <div className="wrapper">
        <BreadCrumbs />
        <hr />

        <div className="w-full pt-5 pb-20">
          <PayrunSummaryList />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PayrunSummary;

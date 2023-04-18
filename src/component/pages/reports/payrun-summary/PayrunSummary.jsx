import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import { getUserType } from "../../../helpers/functions-general";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import PayrunSummaryList from "./PayrunSummaryList";
import { AiFillPrinter } from "react-icons/ai";

const PayrunSummary = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  return (
    <>
      <Header />
      <Navigation menu="reports" />
      <div className="wrapper print:pt-0">
        <div className="flex items-center mb-1 justify-between whitespace-nowrap overflow-auto gap-2 print:hidden">
          <BreadCrumbs />
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="btn-primary"
              onClick={() => window.print()}
            >
              <AiFillPrinter />
              <span>Print</span>
            </button>
          </div>
        </div>
        <hr className="print:hidden" />

        <div className="w-full pt-2 pb-20 ">
          <PayrunSummaryList />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PayrunSummary;

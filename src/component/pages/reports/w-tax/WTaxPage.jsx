import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import WTaxMonthlyLink from "./monthly-tax/WTaxMonthlyLink";
import WTaxYearlyLink from "./yearly-tax/WTaxYearlyLink";
import WTaxSummaryLink from "./summary-tax/WTaxSummaryLink";

const WTaxPage = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  return (
    <>
      <Header />
      <Navigation menu="reports" />
      <div className="wrapper">
        <BreadCrumbs />
        <hr />
        <ul className="pt-5 pb-20 relative">
          <li className="py-2">
            <WTaxMonthlyLink />
          </li>
          <li className="py-2">
            <WTaxYearlyLink />
          </li>
          <li className="py-2">
            <WTaxSummaryLink />
          </li>
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default WTaxPage;

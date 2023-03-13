import React from "react";
import BreadCrumbs from "../../partials/BreadCrumbs.jsx";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx";
import PayrollSummaryLink from "./payroll-summary/PayrollSummaryLink.jsx";
import WTaxLink from "./w-tax/WTaxLink.jsx";

const ReportsLink = () => {
  return (
    <>
      <Header />
      <Navigation menu="reports" />
      <div className="wrapper">
        <h4 className="text-xl mb-3">Reports</h4>
        <hr />
        <ul className="pt-5 pb-20 relative">
          <li className="py-2">
            <PayrollSummaryLink />
          </li>
          <li className="py-2">
            <WTaxLink />
          </li>
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default ReportsLink;

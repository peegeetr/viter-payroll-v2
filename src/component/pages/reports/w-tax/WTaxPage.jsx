import React from "react";
import { BsFillCalculatorFill } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../store/StoreContext";
import { getUserType } from "../../../helpers/functions-general";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import Footer from "../../../partials/Footer";
import WTaxMonthlyLink from "./monthly-tax/WTaxMonthlyLink";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import WTaxYearlyLink from "./yearly-tax/WTaxYearlyLink";

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
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default WTaxPage;

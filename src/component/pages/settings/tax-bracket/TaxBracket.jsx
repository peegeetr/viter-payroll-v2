import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import BreadCrumbs from "../../../partials/BreadCrumbs.jsx";
import Footer from "../../../partials/Footer.jsx";
import Header from "../../../partials/Header.jsx";
import Navigation from "../../../partials/Navigation.jsx";
import TaxMonthlyLink from "./tax-monthly/TaxMonthlyLink.jsx";
import TaxSemiLink from "./tax-semi/TaxSemiLink.jsx";
import TaxYearlyLink from "./tax-yearly/TaxYearlyLink";

const TaxBracket = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <Header />
      <Navigation menu="settings" />
      <div className="wrapper">
        <BreadCrumbs />

        <hr />
        <ul className="pt-2 pb-20 relative">
          <li className="py-2">
            <TaxSemiLink />
          </li>
          <li className="py-2">
            <TaxMonthlyLink />
          </li>
          <li className="py-2">
            <TaxYearlyLink />
          </li>
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default TaxBracket;

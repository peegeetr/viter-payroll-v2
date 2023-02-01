import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import BreadCrumbs from "../../../partials/BreadCrumbs.jsx";
import Footer from "../../../partials/Footer.jsx";
import Header from "../../../partials/Header.jsx";
import Navigation from "../../../partials/Navigation.jsx";
import TaxMonthlyLink from "./tax-monthly/TaxMonthlyLink.jsx";
import TaxSemiLink from "./tax-semi/TaxSemiLink.jsx";

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
      <div className="relative min-h-screen pt-20 ml-0 px-5 md:ml-20 lg:ml-40 lg:px-10">
        <div className="flex items-center justify-between mb-3 whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs />
          <div className="flex items-center gap-1"></div>
        </div>

        <hr />
        <ul className="pt-5 pb-20 relative">
          <TaxMonthlyLink />
          <TaxSemiLink />
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default TaxBracket;

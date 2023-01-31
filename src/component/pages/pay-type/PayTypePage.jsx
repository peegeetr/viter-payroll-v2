import React from "react";
import { FaPlusCircle, FaUsers } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { setIsAdd, setStartIndex } from "../../../store/StoreAction.jsx";
import { devNavUrl, UrlAdmin } from "../../helpers/functions-general.jsx";
import BreadCrumbs from "../../partials/BreadCrumbs.jsx";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx";
import PayTypeLink from "./PayTypeLink.jsx";

const PayTypePage = () => {
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <Header />
      <Navigation menu="pay-type" />
      <div className="wrapper">
        <div className="flex items-center justify-between mb-3 whitespace-nowrap overflow-auto gap-2">
          <h4 className="text-xl">Pay Type</h4>
          <div className="flex items-center gap-1">
            <button type="button" className="btn-primary" onClick={handleAdd}>
              <FaPlusCircle />
              <span>Add</span>
            </button>
          </div>
        </div>

        <hr />
        <ul className="pt-5 pb-20 relative">
          <PayTypeLink />
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default PayTypePage;

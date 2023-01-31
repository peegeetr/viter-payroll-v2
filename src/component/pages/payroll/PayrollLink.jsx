import React from "react";
import BreadCrumbs from "../../partials/BreadCrumbs.jsx";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx";

const PayrollLink = () => {
  return (
    <>
      <Header />
      <Navigation menu="attendance" />
      <div className="wrapper">
        <h4 className="text-xl">Attendance</h4>
        <BreadCrumbs />
        <hr />
        <ul className="pt-5 pb-20 relative">
          <li className="py-2"></li>
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default PayrollLink;

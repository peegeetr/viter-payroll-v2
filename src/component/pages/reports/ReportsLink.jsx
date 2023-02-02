import React from "react";
import BreadCrumbs from "../../partials/BreadCrumbs.jsx";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx";

const ReportsLink = () => {
  return (
    <>
      <Header />
      <Navigation menu="reports" />
      <div className="wrapper">
        <h4 className="text-xl">Reports</h4>
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

export default ReportsLink;

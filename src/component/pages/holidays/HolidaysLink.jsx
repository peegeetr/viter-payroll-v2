import React from "react";
import BreadCrumbs from "../../partials/BreadCrumbs.jsx";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx";

const HolidaysLink = () => {
  return (
    <>
      <Header />
      <Navigation menu="holidays" />
      <div className="wrapper">
        <h4 className="text-xl">Holidays</h4>
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

export default HolidaysLink;

import React from "react";
import BreadCrumbs from "../../partials/BreadCrumbs.jsx";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx";
import DetailsLink from "./job-details/JobDetailsLink.jsx";
import SalaryHistoryLink from "./salary-history/SalaryHistoryLink.jsx";

const EmployeeLink = () => {
  return (
    <>
      <Header />
      <Navigation menu="employee" />
      <div className="wrapper ">
        <BreadCrumbs />
        <hr />
        pat
        <ul className="pt-5 pb-20 relative">
          <li className="py-2">
            <DetailsLink />
          </li>
          <li className="py-2">
            <SalaryHistoryLink />
          </li>
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default EmployeeLink;

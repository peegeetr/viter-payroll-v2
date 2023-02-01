import React from "react";
import BreadCrumbs from "../../partials/BreadCrumbs.jsx";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx";
import SssBracketLink from "./sss-bracket/SssBracketLink.jsx";
import TaxBracketLink from "./tax-bracket/TaxBracketLink.jsx";
import UserLink from "./users/UserLink.jsx";

const SettingsLink = () => {
  return (
    <>
      <Header />
      <Navigation menu="settings" />
      <div className="wrapper">
        <h4 className="text-xl">Settings</h4>
        <BreadCrumbs />
        <hr />
        <ul className="pt-5 pb-20 relative">
          <li className="py-2">
            <UserLink />
          </li>

          <li className="py-2">
            <TaxBracketLink />
          </li>

          <li className="py-2">
            <SssBracketLink />
          </li>
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default SettingsLink;

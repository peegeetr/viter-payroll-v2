import React from "react";
import BreadCrumbs from "../../partials/BreadCrumbs.jsx";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx";
import PagibigLink from "./pagibig/PagibigLink.jsx";
import PayrollTypeLink from "./payroll-type/PayrollTypeLink.jsx";
import PhilhealthLink from "./philhealth/PhilhealthLink.jsx";
import RatesLink from "./rates/RatesLink.jsx";
import SssBracketLink from "./sss-bracket/SssBracketLink.jsx";
import TaxBracketLink from "./tax-bracket/TaxBracketLink.jsx";
import UserLink from "./users/UserLink.jsx";
import OtherUserLink from "./users/other/OtherUserLink";
import { StoreContext } from "../../../store/StoreContext";

const SettingsLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  return (
    <>
      <Header />
      <Navigation menu="settings" />
      <div className="wrapper">
        <h4 className="text-xl">Setting</h4>
        <BreadCrumbs />
        <hr />
        <ul className="pt-2 pb-20 relative">
          {store.credentials.data.role_is_developer === 1 ? (
            <li className="py-2">
              <UserLink />
            </li>
          ) : (
            <li className="py-2">
              <OtherUserLink />
            </li>
          )}

          <li className="py-2">
            <TaxBracketLink />
          </li>

          <li className="py-2">
            <SssBracketLink />
          </li>

          <li className="py-2">
            <PagibigLink />
          </li>

          <li className="py-2">
            <PhilhealthLink />
          </li>

          <li className="py-2">
            <RatesLink />
          </li>

          <li className="py-2">
            <PayrollTypeLink />
          </li>
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default SettingsLink;

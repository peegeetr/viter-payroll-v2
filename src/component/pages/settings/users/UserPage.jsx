import React from "react";
import { setStartIndex } from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import BreadCrumbs from "../../../partials/BreadCrumbs.jsx";
import Footer from "../../../partials/Footer.jsx";
import Header from "../../../partials/Header.jsx";
import Navigation from "../../../partials/Navigation.jsx";
import OtherUser from "./other/OtherUser.jsx";
import OtherUserLink from "./other/OtherUserLink.jsx";
import RoleLink from "./role/RoleLink.jsx";
import SystemUserLink from "./system/SystemUserLink.jsx";
import PageNotFound from "../../../partials/PageNotFound";

const UserPage = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const fbsPayroll = JSON.parse(localStorage.getItem("fbsPayroll"));
  if (
    fbsPayroll.isDev === false ||
    store.credentials.data.role_is_developer !== 1
  ) {
    return <PageNotFound />;
  }
  return (
    <>
      {store.credentials.data.role_is_developer === 1 ? (
        <>
          <Header />
          <Navigation menu="settings" />
          <div className="wrapper">
            <BreadCrumbs />
            <hr />
            <ul className="pt-2 pb-20 relative">
              <li className="py-2" onClick={() => dispatch(setStartIndex(0))}>
                <SystemUserLink />
              </li>
              <li className="py-2" onClick={() => dispatch(setStartIndex(0))}>
                <OtherUserLink />
              </li>
              <li className="py-2" onClick={() => dispatch(setStartIndex(0))}>
                <RoleLink />
              </li>
            </ul>
            <Footer />
          </div>
        </>
      ) : (
        <OtherUser />
      )}
    </>
  );
};

export default UserPage;

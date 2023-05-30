import React from "react";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import BreadCrumbs from "../../../partials/BreadCrumbs.jsx";
import Footer from "../../../partials/Footer.jsx";
import Header from "../../../partials/Header.jsx";
import ModalError from "../../../partials/modals/ModalError.jsx";
import ModalSuccess from "../../../partials/modals/ModalSuccess.jsx";
import Navigation from "../../../partials/Navigation.jsx";
import PhilhealthForm from "./PhilhealthForm.jsx";

const Philhealth = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  return (
    <>
      <Header />
      <Navigation menu="settings" />
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs />
          <div className="flex items-center gap-1"></div>
        </div>

        <hr />
        <div className="w-full pt-5 pb-20">
          <PhilhealthForm />
        </div>
        <Footer />
      </div>

      {store.success && <ModalSuccess close={"close"} />}
      {store.error && <ModalError />}
    </>
  );
};

export default Philhealth;

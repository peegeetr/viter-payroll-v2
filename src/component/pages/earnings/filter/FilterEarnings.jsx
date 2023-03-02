import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import Navigation from "../../../partials/Navigation";
import FilterEarningsList from "./FilterEarningsList";

const FilterEarnings = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  return (
    <>
      <Header />
      <Navigation menu="earnings" />
      <div className="wrapper">
        <div className="flex items-center mb-1 justify-between whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs />
        </div>
        <hr />

        <div className="w-full pt-5 pb-20">
          <FilterEarningsList />
        </div>
        <Footer />
      </div>

      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default FilterEarnings;

import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { AiFillPrinter } from "react-icons/ai";
import { StoreContext } from "../../../../store/StoreContext";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import Navigation from "../../../partials/Navigation";
import PayslipList from "./PayslipList";

const Payslip = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  return (
    <>
      <Header />
      <Navigation menu="payroll" />
      <div className="wrapper print:pt-0">
        <div className="flex items-center mb-1 justify-between whitespace-nowrap overflow-auto gap-2 print:hidden">
          <BreadCrumbs param={`${location.search}`} />
          <div className="flex items-center gap-1">
            <button type="button" className="btn-primary">
              <FaEnvelope />
              <span>Email</span>
            </button>
            <button type="button" className="btn-primary">
              <AiFillPrinter />
              <span>Print</span>
            </button>
          </div>
        </div>
        <hr />

        <div className="w-full pt-5 pb-20 mb-16">
          <PayslipList />
        </div>
        <Footer />
      </div>
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Payslip;

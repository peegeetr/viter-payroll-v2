import React from "react";
import { AiFillPrinter } from "react-icons/ai";
import { FaEnvelope } from "react-icons/fa";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import { devApiUrl, getUrlParam } from "../../../helpers/functions-general";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ServerError from "../../../partials/ServerError";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import FetchingSpinner from "../../../partials/spinners/FetchingSpinner";
import PayslipBonusList from "./PayslipBonusList";
import NoData from "../../../partials/NoData";

const PayslipBonus = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  // use if not loadmore button undertime
  const payslipId = getUrlParam().get("payslipid");

  // use if not loadmore button undertime
  const {
    data: payslip,
    isLoading,
    error,
  } = useQueryData(
    `${devApiUrl}/v1/payslip/${payslipId}`, // endpoint
    "get", // method
    "payslip" // key
  );
  let payrollUrl =
    payslip?.data.length > 0 ? `?payrollid=${payslip?.data[0].payroll_id}` : "";

  // console.log(payslip);
  return (
    <>
      <Header />
      <Navigation menu="payroll" />
      <div className="wrapper print:pt-0">
        <div className="flex items-center mb-1 justify-between whitespace-nowrap overflow-auto gap-2 print:hidden">
          <BreadCrumbs param={`${payrollUrl}`} />
          {isLoading && <FetchingSpinner />}
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="btn-primary"
              onClick={() => window.print()}
            >
              <AiFillPrinter />
              <span>Print</span>
            </button>
          </div>
        </div>
        <hr className="print:hidden" />

        <div className="w-full pt-5 pb-20 mb-16">
          {payslip?.data.length > 0 ? (
            <PayslipBonusList payslip={payslip} />
          ) : (
            <NoData />
          )}
        </div>

        {error && <ServerError />}

        <Footer />
      </div>
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default PayslipBonus;

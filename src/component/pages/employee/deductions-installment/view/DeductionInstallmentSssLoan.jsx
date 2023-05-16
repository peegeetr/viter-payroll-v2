import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  getUrlParam,
  hrisDevApiUrl,
} from "../../../../helpers/functions-general";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Footer from "../../../../partials/Footer";
import Header from "../../../../partials/Header";
import Navigation from "../../../../partials/Navigation";
import ModalError from "../../../../partials/modals/ModalError";
import ModalSuccess from "../../../../partials/modals/ModalSuccess";
import { SSSLoanId } from "../../../../helpers/functions-payitemId";
import DeductionInstallmentViewList from "./DeductionInstallmentViewList";

const DeductionInstallmentSssLoan = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const eid = getUrlParam().get("employeeid");

  // use if not loadmore button undertime
  const { isLoading: isLoadingEmployee, data: employee } = useQueryData(
    `${hrisDevApiUrl}/v1/employees/job/${eid}`, // endpoint
    "get", // method
    "employee", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );

  // use if not loadmore button undertime
  const { data: payItem } = useQueryData(
    `${devApiUrl}/v1/payitem/${SSSLoanId}`, // endpoint
    "get", // method
    `payItem${SSSLoanId}` // key
  );
  return (
    <>
      <Header />
      <Navigation menu="employee" />
      <div className="wrapper">
        <BreadCrumbs param={`${location.search}`} />
        <hr />
        <p className="font-semibold pt-4 m-0">
          Name :
          <span className="font-light pl-4">
            {isLoadingEmployee
              ? "Loading..."
              : `${employee?.data[0].employee_lname}, 
            ${employee?.data[0].employee_fname}`}
          </span>
        </p>
        <div className="w-full pb-40">
          <DeductionInstallmentViewList
            paytypeId={SSSLoanId}
            payItem={payItem?.data}
          />
        </div>
        <Footer />
      </div>

      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default DeductionInstallmentSssLoan;

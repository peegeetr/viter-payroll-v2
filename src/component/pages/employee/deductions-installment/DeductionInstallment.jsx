import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  getUrlParam,
  hrisDevApiUrl,
} from "../../../helpers/functions-general";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import DeductionInstallmentList from "./DeductionInstallmentList";

const DeductionInstallment = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const eid = getUrlParam().get("employeeid");

  // use if not loadmore button undertime
  const {
    isLoading,
    error,
    data: employee,
  } = useQueryData(
    `${hrisDevApiUrl}/v1/employees/job/${eid}`, // endpoint
    "get", // method
    "employee", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );

  // use if not loadmore button undertime
  const { data: draft, isLoading: draftLoading } = useQueryData(
    `${devApiUrl}/v1/payroll/list`, // endpoint
    "get", // method
    "draft" // key
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
            {isLoading
              ? "Loading..."
              : `${employee?.data[0].employee_lname}, 
            ${employee?.data[0].employee_fname}`}
          </span>
        </p>
        <div className="w-full pb-40">
          {/* <MyPayslipPassword /> */}
          <DeductionInstallmentList draft={draft} draftLoading={draftLoading} />
        </div>
        <Footer />
      </div>

      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default DeductionInstallment;

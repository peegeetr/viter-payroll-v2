import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useLoadEmployee from "../../../custom-hooks/useLoadEmployee";
import useQueryData from "../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  getUrlParam,
  hrisDevApiUrl,
} from "../../../helpers/functions-general";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import Navigation from "../../../partials/Navigation";
import PayrollDetailsList from "./PayrollDetailsList";

const PayrollDetails = () => {
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
  const { data: draft } = useQueryData(
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
        <div className="w-full pb-20">
          <PayrollDetailsList
            isLoading={isLoading}
            error={error}
            employee={employee}
            draft={draft}
          />
        </div>
        <Footer />
      </div>

      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default PayrollDetails;

import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useLoadEmployee from "../../../custom-hooks/useLoadEmployee";
import useQueryData from "../../../custom-hooks/useQueryData";
import { getUrlParam, hrisDevApiUrl } from "../../../helpers/functions-general";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import Navigation from "../../../partials/Navigation";
import JobDetailsList from "./JobDetailsList";

const JobDetails = () => {
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
    "employee" // key
  );

  // consoleLog(result);

  return (
    <>
      <Header />
      <Navigation menu="employee" />
      <div className="wrapper">
        <BreadCrumbs param={`${location.search}`} />
        <hr />
        <p className="font-semibold pt-4 m-0">
          Name :{" "}
          <span className="font-light">
            {employee?.data.length
              ? `${employee?.data[0].employee_lname}, 
            ${employee?.data[0].employee_fname}`
              : "NO DATA"}
          </span>
        </p>
        <div className="w-full pb-20">
          <JobDetailsList
            isLoading={isLoading}
            error={error}
            employee={employee}
          />
        </div>
        <Footer />
      </div>

      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default JobDetails;

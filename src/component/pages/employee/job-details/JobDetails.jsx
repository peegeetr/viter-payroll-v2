import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import { getUrlParam, hrisDevApiUrl } from "../../../helpers/functions-general";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
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
    "employee", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );

  // consoleLog(result);

  return (
    <>
      <Header />
      <Navigation menu="employee" />
      <div className="wrapper">
        <BreadCrumbs param={`${location.search}`} />
        <hr />
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

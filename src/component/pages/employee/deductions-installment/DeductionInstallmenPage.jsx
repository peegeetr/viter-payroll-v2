import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import {
  getUrlParam,
  getUserType,
  hrisDevApiUrl,
} from "../../../helpers/functions-general";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import NoData from "../../../partials/NoData";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import OptionalDeductionLink from "./optional-deduction/OptionalDeductionLink";
import OtherDeductionLink from "./other-deduction/OtherDeductionLink";

const DeductionInstallmenPage = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const eid = getUrlParam().get("employeeid");
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  // use if not loadmore button undertime
  const { isLoading, data: employee } = useQueryData(
    `${hrisDevApiUrl}/v1/employees/${eid}`, // endpoint
    "get", // method
    "employee", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );
  return (
    <>
      <Header />
      <Navigation menu="employee" />
      <div className="wrapper ">
        <BreadCrumbs param={`${location.search}`} />
        <hr />
        {employee?.data.length ? (
          <>
            <p className="font-semibold py-4 m-0">
              Name :{" "}
              <span className="font-light">
                {isLoading
                  ? "Loading..."
                  : `${employee?.data[0].employee_lname}, 
          ${employee?.data[0].employee_fname}`}
              </span>
            </p>

            <ul className="pb-20 relative">
              <li className="pb-2">
                <OptionalDeductionLink />
              </li>
              <li className="pb-2">
                <OtherDeductionLink />
              </li>
            </ul>
          </>
        ) : (
          <>
            <div className="relative w-full min-h-[616px] grid place-items-center">
              {isLoading && <TableSpinner />}
              <NoData />
            </div>
          </>
        )}
        <Footer />
      </div>
    </>
  );
};

export default DeductionInstallmenPage;

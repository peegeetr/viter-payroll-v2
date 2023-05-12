import React from "react";
import useQueryData from "../../custom-hooks/useQueryData.jsx";
import {
  getUrlParam,
  hrisDevApiUrl,
} from "../../helpers/functions-general.jsx";
import BreadCrumbs from "../../partials/BreadCrumbs.jsx";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx";
import NoData from "../../partials/NoData.jsx";
import TableSpinner from "../../partials/spinners/TableSpinner.jsx";
import JobDetailsLink from "./job-details/JobDetailsLink.jsx";
import SalaryHistoryLink from "./salary-history/SalaryHistoryLink.jsx";
import PayrollDetailsLink from "./payroll-details/PayrollDetailsLink";
import DeductionInstallmentLink from "./deductions-installment/DeductionInstallmentLink";

const EmployeeLink = () => {
  const employeeid = getUrlParam().get("employeeid");
  // use if not loadmore button undertime
  const { isLoading, data: employee } = useQueryData(
    `${hrisDevApiUrl}/v1/employees/${employeeid}`, // endpoint
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
        <BreadCrumbs />
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
                <JobDetailsLink />
              </li>
              <li className="pb-2">
                <PayrollDetailsLink />
              </li>
              <li className="py-2">
                <DeductionInstallmentLink />
              </li>
              <li className="py-2">
                <SalaryHistoryLink />
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

export default EmployeeLink;

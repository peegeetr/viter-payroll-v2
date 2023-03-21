import React from "react";
import useQueryData from "../../../custom-hooks/useQueryData";
import {
  formatDate,
  getPayslipPeriod,
  getWorkingDays,
  hrisDevApiUrl,
} from "../../../helpers/functions-general";

const PayslipHeader = ({ payslip, empid, days }) => {
  // use if not loadmore button undertime
  const { data: job } = useQueryData(
    `${hrisDevApiUrl}/v1/employees/job/${empid}`, // endpoint
    "get", // method
    "job" // key
  );

  return (
    <>
      <div className="relative overflow-x-auto z-0">
        <div className="xs:grid grid-cols-2 mb-5">
          <p className="mb-0">
            <span className="font-semibold">Employee : </span>{" "}
            {payslip?.data[0].payroll_list_employee_name}
          </p>
          <p className="mb-0">
            <span className="font-semibold">Pay Date : </span>
            {formatDate(payslip?.data[0].payroll_pay_date)}(
            {payslip?.data[0].payroll_id})
          </p>
          <p className="mb-0">
            <span className="font-semibold">Department : </span>{" "}
            {job?.data.length > 0 ? job?.data[0].department_name : "N/A"}
          </p>
          <p className="mb-0">
            <span className="font-semibold">Frequency : </span> Semi-monthly
          </p>
          <p className="mb-0">
            <span className="font-semibold">Position : </span>{" "}
            {job?.data.length > 0 ? job?.data[0].job_title_name : "N/A"}
          </p>
          <p className="mb-0">
            <span className="font-semibold">Pay Period : </span>{" "}
            {getPayslipPeriod(payslip)} ({days} working days)
          </p>
        </div>
      </div>
    </>
  );
};

export default PayslipHeader;

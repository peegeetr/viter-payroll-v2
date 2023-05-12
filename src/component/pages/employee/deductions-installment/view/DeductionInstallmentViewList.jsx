import React from "react";
import {
  formatDate,
  getUrlParam,
  hrisDevApiUrl,
  numberWithCommas,
} from "../../../../helpers/functions-general";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import Status from "../../../../partials/status/Status";
import {
  getEndOfInstallment,
  getNumberOfMonths,
} from "../functions-deductions-installment";
import useQueryData from "../../../../custom-hooks/useQueryData";

const DeductionInstallmentViewList = ({ paytypeId }) => {
  const eid = getUrlParam().get("employeeid");
  let counter = 1;
  // use if not loadmore button undertime
  const {
    isLoading,
    error,
    data: employeeInstallmentAll,
  } = useQueryData(
    `${hrisDevApiUrl}/v1/employees-installment/all-by-employee/${paytypeId}/${eid}`, // endpoint
    "get", // method
    `employeeInstallmentAll${paytypeId}`, // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );
  console.log(employeeInstallmentAll);

  return (
    <>
      <div className=" overflow-x-auto pt-4 pb-2 z-0">
        <table>
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th>Pay Type</th>
              <th className="min-w-[10rem]">Start Date</th>
              <th className="min-w-[10rem]">End Date</th>
              <th className="text-right pr-4">Amount</th>
              <th className="text-right pr-4">Months</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {(isLoading || employeeInstallmentAll?.data.length === 0) && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  {isLoading && <TableSpinner />}
                  <NoData />
                </td>
              </tr>
            )}
            {error && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}

            {employeeInstallmentAll?.data.map((item, key) => {
              return (
                <tr key={key}>
                  <td className="text-center">{counter++}.</td>
                  <td>{formatDate(item.employee_installment_start_date)}</td>
                  <td className="hidden sm:block">
                    {formatDate(item.employee_installment_start_date)}
                  </td>
                  <td className="min-w-[10rem]">
                    {getEndOfInstallment(
                      item.employee_installment_number_of_months,
                      item.employee_installment_start_date
                    )}
                  </td>
                  <td className="text-right pr-4">
                    &#8369;{" "}
                    {numberWithCommas(
                      Number(item.employee_installment_amount).toFixed(2)
                    )}
                  </td>
                  <td className="text-right pr-4">{`${getNumberOfMonths(
                    item.employee_installment_start_date
                  )} /
                    ${item.employee_installment_number_of_months}`}</td>
                  <td>
                    {" "}
                    {item.employee_installment_status === "0" ? (
                      <Status text="stop" />
                    ) : item.employee_installment_status === "1" ? (
                      <Status text="pending" />
                    ) : item.employee_installment_status === "2" ? (
                      <Status />
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DeductionInstallmentViewList;

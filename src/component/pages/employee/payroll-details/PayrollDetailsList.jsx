import React from "react";
import { FaEdit } from "react-icons/fa";
import { setIsAdd, setIsRestore } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import {
  formatDate,
  getUrlParam,
  hrisDevApiUrl,
  numberWithCommas,
} from "../../../helpers/functions-general";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import ModalEditPayroll from "./ModalEditPayroll";

const PayrollDetailsList = ({ isLoading, error, employee }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const [itemEdit, setItemEdit] = React.useState(null);

  const eid = getUrlParam().get("employeeid");

  const handleEditPayroll = (item) => {
    dispatch(setIsRestore(true));
    setItemEdit(item);
  };

  return (
    <>
      <div className="text-center overflow-x-auto pb-2 z-0 ">
        {employee?.data.map((item, key) => {
          return (
            <div key={key} className="relative w-full max-w-[650px] pt-5 ">
              <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center">
                <h4>Payroll Details</h4>
                {eid === null ? (
                  ""
                ) : (
                  <button
                    type="button"
                    className="tooltip-action-table"
                    data-tooltip="Edit"
                    onClick={() => handleEditPayroll(item)}
                  >
                    <FaEdit />
                  </button>
                )}
              </div>
              <div className="text-left grid grid-cols-2 md:md:grid-cols-[1fr_1.5fr] mb-5 xs:pl-5 pl-2">
                <p className="font-semibold">Employee Name :</p>
                <p className="pl-2">
                  {`${item.employee_lname}, ${item.employee_fname}`}
                </p>
                <p className="font-semibold">Payroll Elegibility</p>
                <p className="pl-2">
                  {item.employee_job_payroll_elegibility === 1 ? "Yes" : "No"}
                </p>
                <p className="font-semibold">With SSS deduction?</p>
                <p className="pl-2">
                  {item.employee_job_sss_deduc === 1 ? "Yes" : "No"}
                </p>
                <p className="font-semibold">With Pag-IBIG deduction?</p>
                <p className="pl-2">
                  {item.employee_job_pag_ibig_deduc === 1 ? "Yes" : "No"}
                </p>
                <p className="font-semibold">With PhilHealth deduction?</p>
                <p className="pl-2">
                  {item.employee_job_phil_health_deduc === 1 ? "Yes" : "No"}
                </p>
                <p className="font-semibold">Work on holiday?</p>
                <p className="pl-2">
                  {item.employee_job_work_reg_hol === 1 ? "Yes" : "No"}{" "}
                </p>
                <p className="font-semibold">
                  Night differential hours per day
                </p>
                <p className="pl-2">
                  {numberWithCommas(item.employee_job_nd_per_day)}
                </p>
                <p className="font-semibold">De Minimis</p>
                <p className="pl-2">
                  {numberWithCommas(item.employee_job_deminimis)}
                </p>
                <p className="font-semibold">Pag-ibig addtl. amount</p>
                <p className="pl-2">
                  {numberWithCommas(item.employee_job_pagibig_amount)}
                </p>
                <p className="font-semibold">Salary</p>
                <p className="pl-2">
                  <span className=" w-24 inline-block">
                    {`P${numberWithCommas(
                      Number(item.employee_job_salary).toFixed(2)
                    )}`}
                  </span>
                </p>
                <p className="font-semibold">Pay frequency</p>
                <p className="pl-2 capitalize">
                  {item.employee_job_pay_freq === "m"
                    ? "Monthly"
                    : "Semi-Monthly"}
                </p>
                <p className="font-semibold">Account number</p>
                <p className="pl-2">{item.employee_job_account_number}</p>
                <p className="font-semibold">Starting pay</p>
                <p className="pl-2">
                  <span className=" w-24 inline-block">
                    {`P${numberWithCommas(
                      Number(item.employee_job_starting_pay).toFixed(2)
                    )}`}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
        {(isLoading || employee?.data.length === 0) && (
          <div className="relative w-full min-h-[616px] grid place-items-center">
            {isLoading && <TableSpinner />}
            <NoData />
          </div>
        )}
        {error && (
          <div className="relative w-full min-h-[616px] grid place-items-center">
            <ServerError />
          </div>
        )}
      </div>

      {store.isRestore && <ModalEditPayroll itemEdit={itemEdit} />}
    </>
  );
};

export default PayrollDetailsList;

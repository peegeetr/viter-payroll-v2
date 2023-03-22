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
import ModalEditJobDetails from "./ModalEditJobDetails";
import ModalEditPayroll from "./ModalEditPayroll";

const JobDetailsList = ({ isLoading, error, employee }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const [itemEdit, setItemEdit] = React.useState(null);

  const eid = getUrlParam().get("employeeid");

  // use if not loadmore button undertime
  const { isFetching: loadingSup, data: supervisor } = useQueryData(
    `${hrisDevApiUrl}/v1/supervisors`, // endpoint
    "get", // method
    "supervisor" // key
  );

  // use if not loadmore button undertime
  const { isFetching: loadingJob, data: jobTitle } = useQueryData(
    `${hrisDevApiUrl}/v1/job-titles`, // endpoint
    "get", // method
    "jobTitle" // key
  );

  // use if not loadmore button undertime
  const { isFetching: loadingDep, data: department } = useQueryData(
    `${hrisDevApiUrl}/v1/departments`, // endpoint
    "get", // method
    "department" // key
  );

  // use if not loadmore button undertime
  const { isFetching: loadingLeave, data: leave } = useQueryData(
    `${hrisDevApiUrl}/v1/leave/types`, // endpoint
    "get", // method
    "leave" // key
  );

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleEditPayroll = (item) => {
    dispatch(setIsRestore(true));
    setItemEdit(item);
  };

  return (
    <>
      <div className="text-center overflow-x-auto z-0 ">
        {employee?.data.map((item, key) => {
          return (
            <div key={key} className="relative w-full max-w-[650px] pt-5 ">
              <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center ">
                <h4>Employment Status</h4>
                {eid === null ? (
                  ""
                ) : (
                  <button
                    type="button"
                    className="tooltip-action-table"
                    data-tooltip="Edit"
                    onClick={() => handleEdit(item)}
                  >
                    <FaEdit />
                  </button>
                )}
              </div>
              <div className="text-left grid grid-cols-2 md:md:grid-cols-[1fr_1.5fr] mb-5 xs:pl-5 pl-2">
                <p className="font-semibold">Employee Number :</p>
                <p className="pl-2">{item.employee_job_number}</p>
                <p className="font-semibold">Department :</p>
                <p className="pl-2">
                  {loadingDep ? "Loading..." : item.department_name}
                </p>
                <p className="font-semibold">Job Title :</p>
                <p className="pl-2">
                  {loadingJob ? "Loading..." : item.job_title_name}
                </p>
                <p className="font-semibold">Status :</p>
                <p className="pl-2 capitalize">{item.employee_job_status}</p>
                <p className="font-semibold">Leave type :</p>
                <p className="pl-2 capitalize">
                  {loadingLeave ? "Loading..." : item.leavetype_name}
                </p>
                <p className="font-semibold">Supervisor :</p>
                <p className="pl-2">
                  {loadingSup
                    ? "Loading..."
                    : item.employee_job_supervisor_name === "na"
                    ? "n/a"
                    : item.employee_job_supervisor_name}
                </p>
                <p className="font-semibold">Work Start Time :</p>
                <p className="pl-2">
                  {item.employee_job_start_time === "ft"
                    ? "Flexitime"
                    : item.employee_job_start_time === ""
                    ? ""
                    : `${item.employee_job_start_time} AM`}
                </p>
                <p className="font-semibold">Work Email :</p>
                <p className="pl-2 break-all">{item.employee_email}</p>
                <p className="font-semibold">Date Employed :</p>
                <p className="pl-2">
                  {item.employee_job_hired_date === ""
                    ? ""
                    : formatDate(item.employee_job_hired_date)}
                </p>
                <p className="font-semibold">Regularized on :</p>
                <p className="pl-2">
                  {item.employee_job_regularized === "" ||
                  item.employee_job_regularized === "na"
                    ? "n/a"
                    : formatDate(item.employee_job_regularized)}
                </p>
                <p className="font-semibold">Date separated :</p>
                <p className="pl-2">
                  {item.employee_job_regularized === "" ||
                  item.employee_job_separated === "na"
                    ? "n/a"
                    : formatDate(item.employee_job_separated)}
                </p>
                <p className="font-semibold">TIN :</p>
                <p className="pl-2">{item.employee_job_tin}</p>
                <p className="font-semibold">Drive Link :</p>
                <p className="pl-2 underline text-blue-600">
                  {item.employee_job_drive_link !== "" && (
                    <a href={`${item.employee_job_drive_link}`} target="_blank">
                      View on G-Drive
                    </a>
                  )}
                </p>
                <p className="font-semibold">Comment :</p>
                <p className="pl-2">{item.employee_job_comments}</p>
              </div>
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
                <p className="font-semibold">Pag-ibig addtl. amount</p>
                <p className="pl-2">
                  {numberWithCommas(item.employee_job_pagibig_amount)}
                </p>
                <p className="font-semibold">Salary</p>
                <p className="pl-2">
                  {numberWithCommas(item.employee_job_salary)}
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
                  {numberWithCommas(item.employee_job_starting_pay)}
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

      {store.isAdd && (
        <ModalEditJobDetails
          itemEdit={itemEdit}
          jobTitle={jobTitle}
          department={department}
          supervisor={supervisor}
          leave={leave}
        />
      )}

      {store.isRestore && <ModalEditPayroll itemEdit={itemEdit} />}
    </>
  );
};

export default JobDetailsList;

import React from "react";
import { FaEdit } from "react-icons/fa";
import { setIsAdd, setIsRestore } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useLoadDepartment from "../../../custom-hooks/useLoadDepartment";
import useLoadEmployee from "../../../custom-hooks/useLoadEmployee";
import useLoadJobTitle from "../../../custom-hooks/useLoadJobTitle";
import {
  getUrlParam,
  numberWithCommas,
} from "../../../helpers/functions-general";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import ModalEditJobDetails from "./ModalEditJobDetails";
import ModalEditPayroll from "./ModalEditPayroll";

const JobDetailsList = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  const [itemEdit, setItemEdit] = React.useState(null);

  const eid = getUrlParam().get("employeeid");

  const { employee, employeeLoading } = useLoadEmployee(
    `/v1/employees/job/${eid}`,
    "get"
  );

  const { jobTitle } = useLoadJobTitle("/v1/job-titles", "get");

  const { department } = useLoadDepartment("/v1/departments", "get");

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
      <div className="text-center overflow-x-auto z-0">
        {employee.length > 0 ? (
          employee.map((item, key) => {
            return (
              <div key={key} className="relative w-full max-w-[650px]  ">
                <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center mt-5">
                  <h4>Employment Status</h4>
                  <button
                    type="button"
                    className="tooltip-action-table"
                    data-tooltip="Edit"
                    onClick={() => handleEdit(item)}
                  >
                    <FaEdit />
                  </button>
                </div>
                <div className="text-left grid grid-cols-2 md:md:grid-cols-[1fr_2fr] mb-5 xs:pl-5 pl-2">
                  <p className="font-semibold">Date Employed :</p>
                  <p className="pl-2">
                    {item.employee_job_hired_date === ""
                      ? ""
                      : formatDate(item.employee_job_hired_date)}
                  </p>
                  <p className="font-semibold">Employee Number :</p>
                  <p className="pl-2">{item.employee_job_number}</p>
                  <p className="font-semibold">TIN :</p>
                  <p className="pl-2">{item.employee_job_tin}</p>
                  <p className="font-semibold">Status :</p>
                  <p className="pl-2">{item.employee_job_status}</p>
                  <p className="font-semibold">Department :</p>
                  <p className="pl-2">{item.department_name}</p>
                  <p className="font-semibold">Job Title :</p>
                  <p className="pl-2">{item.job_title_name}</p>
                  <p className="font-semibold">Supervisor :</p>
                  <p className="pl-2">{item.employee_job_supervisor_id}</p>
                  <p className="font-semibold">Work Email :</p>
                  <p className="pl-2 break-all">{item.employee_email}</p>
                  <p className="font-semibold">Drive Link :</p>
                  <p className="pl-2">{item.employee_job_drive_link}</p>
                  <p className="font-semibold">Comment :</p>
                  <p className="pl-2">{item.employee_job_comments}</p>
                </div>
                <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center">
                  <h4>Payroll Details</h4>
                  <button
                    type="button"
                    className="tooltip-action-table"
                    data-tooltip="Edit"
                    onClick={() => handleEditPayroll(item)}
                  >
                    <FaEdit />
                  </button>
                </div>
                <div className="text-left grid grid-cols-2 md:md:grid-cols-[1fr_2fr] mb-5 xs:pl-5 pl-2">
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
                  <p className="font-semibold">Work on regular holiday?</p>
                  <p className="pl-2">
                    {item.employee_job_work_reg_hol === 1 ? "Yes" : "No"}{" "}
                  </p>
                  <p className="font-semibold">
                    Night differential hours per day
                  </p>
                  <p className="pl-2">
                    {numberWithCommas(item.employee_job_nd_per_day)}
                  </p>
                  <p className="font-semibold">Salary</p>
                  <p className="pl-2">
                    {numberWithCommas(item.employee_job_salary)}
                  </p>
                  <p className="font-semibold">Pay frequency</p>
                  <p className="pl-2 capitalize">
                    {item.employee_job_pay_freq}
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
          })
        ) : employee === -1 ? (
          <div className="relative w-full min-h-[616px] grid place-items-center">
            <ServerError />
          </div>
        ) : (
          <div className="relative w-full min-h-[616px] grid place-items-center">
            {employeeLoading && <TableSpinner />}
            <NoData />
          </div>
        )}
      </div>

      {store.isAdd && (
        <ModalEditJobDetails
          itemEdit={itemEdit}
          jobTitle={jobTitle}
          department={department}
        />
      )}

      {store.isRestore && <ModalEditPayroll itemEdit={itemEdit} />}
    </>
  );
};

export default JobDetailsList;

import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { setIsAdd, setIsRestore } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  formatDate,
  getTenure,
  getUrlParam,
  getYearCount,
  numberWithCommas,
} from "../../../helpers/functions-general";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import ModalDeleteRestoreRq from "../../../partials/modals/ModalDeleteRestoreRq";
import TableSpinner from "../../../partials/spinners/TableSpinner";

const SalaryHistoryList = ({ setItemEdit, employee }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  let counter = 0;
  const empId = getUrlParam().get("employeeid");

  // use if not loadmore button undertime
  const {
    isLoading,
    isFetching,
    error,
    data: salaryHistory,
  } = useQueryData(
    `${devApiUrl}/v1/salary-history/by-employee-id/${empId}`, // endpoint
    "get", // method
    "salaryHistory" // key
  );
  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.salary_history_aid);
    setData(item);
    setDel(true);
  };
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr] pb-5 ">
        {employee?.data.length > 0 ? (
          <>
            <div className="mr-5 capitalize">
              <p className="mb-0">
                Name:
                <span className="font-bold text-primary ml-2 ">
                  {`${employee?.data[0].employee_lname}, ${employee?.data[0].employee_fname}`}
                </span>
              </p>

              <p className="mb-0">
                Department:
                <span className="font-bold text-primary ml-2">
                  {`${employee?.data[0].department_name}`}
                </span>
              </p>
            </div>
            <div className="mr-5 ">
              <p className="mb-0">
                Date Hire:
                <span className="font-bold text-primary ml-2">
                  {employee?.data[0].employee_job_hired_date === "na" ||
                  employee?.data[0].employee_job_hired_date === ""
                    ? "N/A"
                    : formatDate(employee?.data[0].employee_job_hired_date)}
                </span>
              </p>
              <p className="mb-0">
                Tenure:
                <span className="font-bold text-primary ml-2">
                  {getTenure(employee?.data[0].employee_job_hired_date)}
                </span>
              </p>
            </div>
            <div className="mr-5">
              <p className="mb-0">
                Regularized on:
                <span className="font-bold text-primary ml-2">
                  {employee?.data[0].employee_job_regularized === "na" ||
                  employee?.data[0].employee_job_regularized === ""
                    ? "N/A"
                    : formatDate(employee?.data[0].employee_job_regularized)}
                </span>
              </p>
              <p className="mb-0">
                Starting Pay:
                <span className="font-bold text-primary ml-2">
                  {`P ${numberWithCommas(
                    Number(employee?.data[0].employee_job_starting_pay).toFixed(
                      2
                    )
                  )}`}
                </span>
              </p>
            </div>
            <div className="mr-5">
              <p className="mb-0">
                Date Separated:
                <span className="font-bold text-primary ml-2">
                  {employee?.data[0].employee_job_separated === "na" ||
                  employee?.data[0].employee_job_separated === ""
                    ? "N/A"
                    : formatDate(employee?.data[0].employee_job_separated)}
                </span>
              </p>
            </div>
          </>
        ) : (
          "Loading..."
        )}
      </div>

      <div className="relative text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[8rem] w-[20rem] text-right pr-4 ">
                Salary
              </th>
              <th>Date of Salary Raise</th>
              <th className="max-w-[5rem]">Action</th>
            </tr>
          </thead>
          <tbody>
            {(isLoading || salaryHistory?.data.length === 0) && (
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
            {salaryHistory?.data.map((item, key) => {
              counter++;
              return (
                <tr key={key}>
                  <td>{counter}.</td>
                  <td className="text-right pr-4">
                    {`P ${numberWithCommas(
                      Number(item.salary_history_salary_amount).toFixed(2)
                    )}`}
                  </td>
                  <td>{formatDate(item.salary_history_date)}</td>

                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="btn-action-table tooltip-action-table"
                        data-tooltip="Edit"
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        type="button"
                        className="btn-action-table tooltip-action-table"
                        data-tooltip="Delete"
                        onClick={() => handleDelete(item)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {(!isLoading || salaryHistory?.data.length > 0) && (
              <>
                <tr className="hover:bg-white">
                  <td colSpan={4} className=" print:py-[2px]">
                    &nbsp;
                  </td>
                </tr>
                <tr className="bg-primary text-right text-white uppercase hover:bg-primary  ">
                  <td colSpan={4}>
                    Current pay:
                    <span className="ml-5">
                      {`P ${numberWithCommas(
                        Number(employee?.data[0].employee_job_salary).toFixed(2)
                      )}`}
                    </span>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      {store.isRestore && (
        <ModalDeleteRestoreRq
          id={id}
          isDel={isDel}
          mysqlApiDelete={`${devApiUrl}/v1/salary-history/${id}`}
          msg="Are you sure you want to delete this user"
          item={`${formatDate(dataItem.salary_history_date)}`}
          arrKey="salaryHistory"
        />
      )}
    </>
  );
};

export default SalaryHistoryList;

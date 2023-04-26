import useQueryData from "../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  formatDate,
  hrisDevApiUrl,
  numberWithCommas,
} from "../../../helpers/functions-general";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import SalaryHistoryHeader from "./SalaryHistoryHeader";

const SalaryHistoryBody = ({ item }) => {
  let counter = 0;
  // use if not loadmore button undertime
  const {
    isLoading,
    isFetching,
    error,
    data: salaryHistory,
  } = useQueryData(
    `${devApiUrl}/v1/salary-history/by-employee-id/${item.salary_history_employee_id}`, // endpoint
    "get", // method
    `${item.salary_history_employee_id}-salaryHistory` // key
  );
  const { data: employee } = useQueryData(
    `${hrisDevApiUrl}/v1/employees/job/${item.salary_history_employee_id}`, // endpoint
    "get", // method
    `${item.salary_history_employee_id}-employee`, // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );
  return (
    <>
      <SalaryHistoryHeader employee={employee} />

      <div className="relative text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[8rem] w-[5rem] text-right pr-4 ">Salary</th>
              <th className=" w-[50rem]">Date of Salary Raise</th>
              <th className="!w-[5rem]">&nbsp;</th>
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
            {salaryHistory?.data.map((shItem, key) => {
              counter++;
              return (
                <tr key={key}>
                  <td>{counter}.</td>
                  <td className="text-right pr-4">
                    {`P ${numberWithCommas(
                      Number(shItem.salary_history_salary_amount).toFixed(2)
                    )}`}
                  </td>
                  <td>{formatDate(shItem.salary_history_date)}</td>
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
                <tr className=" text-right uppercase font-bold hover:bg-white border-primary border-b-[2px] border-solid ">
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
    </>
  );
};

export default SalaryHistoryBody;

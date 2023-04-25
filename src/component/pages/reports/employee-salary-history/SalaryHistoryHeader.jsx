import {
  formatDate,
  getTenure,
  numberWithCommas,
} from "../../../helpers/functions-general";
import HeaderPrint from "../../../partials/HeaderPrint";

const SalaryHistoryHeader = ({ employee }) => {
  // payroll-type/summary/
  return (
    <>
      <div className="print:pt-5">
        <HeaderPrint />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr] pb-5 print:grid-cols-[1fr_1fr_1fr_1fr] print:pt-5">
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
    </>
  );
};

export default SalaryHistoryHeader;

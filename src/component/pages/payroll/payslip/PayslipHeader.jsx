import useQueryData from "../../../custom-hooks/useQueryData";
import {
  formatDate,
  getPayslipPeriod,
  hrisDevApiUrl,
} from "../../../helpers/functions-general";
import {
  payrollCategory13thMonthId,
  payrollCategoryBonusId,
  payrollCategorySalaryId,
} from "../../../helpers/functions-payroll-category-id";
import HeaderPrint from "../../../partials/HeaderPrint";

const PayslipHeader = ({ payslip, empid, days }) => {
  // use if not loadmore button undertime
  const { data: job } = useQueryData(
    `${hrisDevApiUrl}/v1/employees/job/${empid}`, // endpoint
    "get", // method
    "job", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );

  return (
    <>
      <HeaderPrint />
      <div className="relative overflow-x-auto z-0 print:pt-2">
        <div className="xs:grid grid-cols-2 mb-5 ">
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
            {payslip?.data[0].payroll_list_employee_department}
          </p>
          {Number(payslip?.data[0].payroll_category_type) ===
          payrollCategoryBonusId ? (
            <p className="mb-0">
              <span className="font-semibold">Payroll Type : </span> Bonus
            </p>
          ) : Number(payslip?.data[0].payroll_category_type) ===
            payrollCategory13thMonthId ? (
            <p className="mb-0">
              <span className="font-semibold">Payroll Type : </span> 13th Month
            </p>
          ) : (
            <p className="mb-0">
              <span className="font-semibold">Frequency : </span> Semi-monthly
            </p>
          )}
          <p className="mb-0">
            <span className="font-semibold">Position : </span>{" "}
            {job?.data.length > 0 ? job?.data[0].job_title_name : "N/A"}
          </p>
          {Number(payslip?.data[0].payroll_category_type) ===
            payrollCategorySalaryId && (
            <p className="mb-0">
              <span className="font-semibold">Pay Period : </span>{" "}
              {getPayslipPeriod(payslip)} ({days} working days)
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default PayslipHeader;

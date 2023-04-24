import useQueryData from "../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  getWorkingDays,
  numberWithCommas,
} from "../../../helpers/functions-general";
import {
  otherBenefitsEarningsId,
  wagesEarningsId,
} from "../../../helpers/functions-payitemId";
import { employeeRate } from "../../../helpers/payroll-formula";
import PayslipHeader from "../payslip/PayslipHeader";
import PayslipEarningsBonus from "./PayslipEarningsBonus";

const PayslipBonusList = ({ payslip }) => {
  const empId = payslip?.data[0].payroll_list_employee_id;
  const payrollId = payslip?.data[0].payroll_list_payroll_id;
  // use if not loadmore button undertime
  const { data: earnings, isLoading } = useQueryData(
    `${devApiUrl}/v1/payslip/earnings/${wagesEarningsId}/${empId}/${payrollId}`, // endpoint
    "get", // method
    `earnings-wages` // key
  );
  const days = getWorkingDays(
    new Date(payslip?.data[0].payroll_start_date),
    new Date(payslip?.data[0].payroll_end_date)
  );
  let hourRate = Number(
    employeeRate(payslip?.data[0].payroll_list_employee_salary, days).hourly
  );
  let totalEarnings =
    Number(payslip?.data[0].payroll_list_gross) +
    Number(payslip?.data[0].payroll_list_total_benefits);
  let netPay = totalEarnings - Number(payslip?.data[0].payroll_list_deduction);
  let deminimis = payslip?.data[0].payroll_list_deminimis;
  let holidayHrs = payslip?.data[0].payroll_list_holiday_hrs;
  let totalHrs = holidayHrs;
  let basicHrs = days * 8 - totalHrs;
  let basicPay = hourRate * basicHrs - holidayHrs;
  console.log(
    payslip
    // Number(payslip?.data[0].payroll_list_gross),
    // Number(payslip?.data[0].payroll_list_total_benefits),
    // basicPay
  );
  return (
    <>
      <PayslipHeader
        payslip={payslip}
        empid={payslip?.data[0].payroll_list_employee_id}
        days={days}
      />

      <div className="relative text-center overflow-x-auto z-0">
        <table>
          <tbody>
            <PayslipEarningsBonus
              paytypeId={otherBenefitsEarningsId}
              empid={payslip?.data[0].payroll_list_employee_id}
              payrollid={payslip?.data[0].payroll_list_payroll_id}
              hourRate={hourRate}
              days={days}
              payslip={payslip}
            />

            {/* netpay */}
            <tr>
              <td colSpan={4} className=" print:py-[2px]">
                &nbsp;
              </td>
            </tr>
            <tr className="bg-primary hover:bg-primary text-white uppercase">
              <td
                colSpan={3}
                className="uppercase text-right xs:pr-4 print:py-[2px] "
              >
                Total Bonus
              </td>
              <td className=" text-right px-4 print:py-[2px]">
                {numberWithCommas(netPay.toFixed(2))}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="text-center my-8 ">
          <small>
            <i>
              This is a computer generated payslip. Does not require signature
            </i>
          </small>
        </div>
      </div>
    </>
  );
};

export default PayslipBonusList;

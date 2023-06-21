import useQueryData from "../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  getWorkingDays,
  getWorkingDaysInMonth,
  numberWithCommas,
} from "../../../helpers/functions-general";
import {
  mandatoryDeductionId,
  optionalDeductionId,
  otherBenefitsEarningsId,
  paytypeOtherDeductionId,
  wagesEarningsId,
} from "../../../helpers/functions-payitemId";
import { employeeRate } from "../../../helpers/payroll-formula";
import PayslipDeduction from "./PayslipDeduction";
import PayslipEarnings from "./PayslipEarnings";
import PayslipHeader from "./PayslipHeader";
import PayslipMandatoryDeduc from "./PayslipMandatoryDeduc";

const PayslipList = ({ payslip }) => {
  const empId = payslip?.data[0].payroll_list_employee_id;
  const payrollId = payslip?.data[0].payroll_list_payroll_id;
  // use if not loadmore button undertime
  const { data: earnings, isLoading } = useQueryData(
    `${devApiUrl}/v1/payslip/earnings/${wagesEarningsId}/${empId}/${payrollId}`, // endpoint
    "get", // method
    `earnings-wages` // key
  );
  const days = getWorkingDaysInMonth(
    new Date(payslip?.data[0].payroll_start_date)
  );
  const daysPeriod = getWorkingDays(
    new Date(payslip?.data[0].payroll_start_date),
    new Date(payslip?.data[0].payroll_end_date)
  );
  let hourRate = Number(
    employeeRate(payslip?.data[0].payroll_list_employee_salary, days).hourly
  );
  let periodPay = Number(
    employeeRate(payslip?.data[0].payroll_list_employee_salary, days).period
  );
  let dailyRate = Number(
    employeeRate(payslip?.data[0].payroll_list_employee_salary, days).daily
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
            <PayslipEarnings
              paytypeId={wagesEarningsId}
              empid={payslip?.data[0].payroll_list_employee_id}
              payrollid={payslip?.data[0].payroll_list_payroll_id}
              hourRate={hourRate}
              days={daysPeriod}
              payslip={payslip}
              periodPay={periodPay}
              dailyRate={dailyRate}
            />
            <PayslipEarnings
              paytypeId={otherBenefitsEarningsId}
              empid={payslip?.data[0].payroll_list_employee_id}
              payrollid={payslip?.data[0].payroll_list_payroll_id}
              hourRate={hourRate}
              days={days}
              payslip={payslip}
              periodPay={periodPay}
              dailyRate={dailyRate}
            />

            <tr className="hover:bg-white">
              <td colSpan={4} className="print:py-[2px]">
                &nbsp;
              </td>
            </tr>
            <tr className="font-semibold bg-gray-300 hover:bg-gray-300">
              <td
                colSpan={3}
                className="uppercase text-right xs:pr-4 print:py-[2px]"
              >
                Total Earnings
              </td>
              <td className=" text-right px-4 print:py-[2px]">
                {numberWithCommas(totalEarnings.toFixed(2))}
              </td>
            </tr>
            <tr className="hover:bg-white">
              <td colSpan={4} className=" print:py-[2px]">
                &nbsp;
              </td>
            </tr>

            {/* Mandatory deduction */}
            <PayslipMandatoryDeduc
              paytypeId={mandatoryDeductionId}
              payslip={payslip}
              empid={payslip?.data[0].payroll_list_employee_id}
              payrollid={payslip?.data[0].payroll_list_payroll_id}
            />
            {/* Optional deduction */}
            <PayslipDeduction
              paytypeId={optionalDeductionId}
              empid={payslip?.data[0].payroll_list_employee_id}
              payrollid={payslip?.data[0].payroll_list_payroll_id}
            />
            {/* other deduction */}
            <PayslipDeduction
              paytypeId={paytypeOtherDeductionId}
              empid={payslip?.data[0].payroll_list_employee_id}
              payrollid={payslip?.data[0].payroll_list_payroll_id}
            />
            {/* tax */}
            <tr className="hover:bg-white">
              <td colSpan={4} className=" print:py-[2px]">
                &nbsp;
              </td>
            </tr>
            <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
              <td colSpan={3} className="w-[20rem] uppercase print:py-[2px]">
                TAX
              </td>
              <td
                colSpan={3}
                className="w-[20rem] uppercase text-right px-4 print:py-[2px]"
              >
                {numberWithCommas(
                  Number(payslip?.data[0].payroll_list_tax).toFixed(2)
                )}
              </td>
            </tr>

            {/* total deduction */}
            <tr className="hover:bg-white">
              <td colSpan={4} className=" print:py-[2px]">
                &nbsp;
              </td>
            </tr>
            <tr className="font-semibold bg-gray-300 hover:bg-gray-300 uppercase">
              <td
                colSpan={3}
                className="uppercase text-right xs:pr-4 print:py-[2px] "
              >
                total deductions
              </td>
              <td className=" text-right px-4 print:py-[2px]">
                {numberWithCommas(
                  Number(payslip?.data[0].payroll_list_deduction).toFixed(2)
                )}
              </td>
            </tr>
            <tr className="hover:bg-white">
              <td colSpan={4} className=" print:py-[2px]">
                &nbsp;
              </td>
            </tr>

            {/* netpay */}
            <tr className="bg-primary hover:bg-primary text-white uppercase">
              <td
                colSpan={3}
                className="uppercase text-right xs:pr-4 print:py-[2px] "
              >
                net pay
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

export default PayslipList;

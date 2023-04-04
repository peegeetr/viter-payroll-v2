import useQueryData from "../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  getWorkingDays,
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
            <PayslipEarnings
              paytypeId={wagesEarningsId}
              empid={payslip?.data[0].payroll_list_employee_id}
              payrollid={payslip?.data[0].payroll_list_payroll_id}
              hourRate={hourRate}
              days={days}
              payslip={payslip}
            />
            <PayslipEarnings
              paytypeId={otherBenefitsEarningsId}
              empid={payslip?.data[0].payroll_list_employee_id}
              payrollid={payslip?.data[0].payroll_list_payroll_id}
              hourRate={hourRate}
              days={days}
              payslip={payslip}
            />

            {/* <tr className="font-semibold bg-gray-100 hover:bg-gray-100 uppercase">
              <td className="w-[30rem]">WAGES</td>
              <td className="w-[10rem]">hours</td>
              <td className="w-[10rem] text-right  px-4">rate</td>
              <td className="text-right  px-4">total</td>
            </tr>
            <tr className="hover:bg-transparent">
              <td className="w-[20rem]">{`Basic Pay ${
                deminimis > 0
                  ? `(De Minimis inclusive ${numberWithCommas(deminimis)})`
                  : ``
              }`}</td>
              <td className="w-[10rem]">{basicHrs}</td>
              <td className="text-right   px-4">{hourRate}</td>
              <td className="text-right px-4">
                {numberWithCommas(basicPay.toFixed(2))}
              </td>
            </tr>
            {isLoading ? (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  Loading...
                </td>
              </tr>
            ) : (
              <>
                {earnings?.data.map((item, key) => {
                  return (
                    <tr key={key} className="hover:bg-transparent">
                      <td className="w-[20rem]">{item.earnings_details}</td>
                      <td className="w-[10rem]">8</td>
                      <td className="text-right   px-4">
                        {(
                          hourRate *
                          (Number(item.earnings_holidays_rate) / 100)
                        ).toFixed(4)}
                      </td>
                      <td className="text-right px-4">
                        {numberWithCommas(
                          Number(item.earnings_amount).toFixed(2)
                        )}
                      </td>
                    </tr>
                  );
                })}
                {earnings?.data.length > 0 && (
                  <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
                    <td colSpan={3} className="uppercase text-right xs:pr-4">
                      Total Wages
                    </td>
                    <td className=" text-right px-4">
                      {numberWithCommas(
                        Number(payslip?.data[0].payroll_list_gross).toFixed(2)
                      )}
                    </td>
                  </tr>
                )}
              </>
            )} */}

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

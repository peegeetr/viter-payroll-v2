import {
  getWorkingDays,
  numberWithCommas,
} from "../../../helpers/functions-general";
import {
  empContributionEarningsId,
  mandatoryDeductionId,
  optionalDeductionId,
  otherBenefitsEarningsId,
  paytypeOtherDeductionId,
  taxDeductionId,
  wagesEarningsId,
} from "../../../helpers/functions-payitemId";
import { employeeRate } from "../../../helpers/payroll-formula";
import PayslipDeduction from "./PayslipDeduction";
import PayslipEarnings from "./PayslipEarnings";
import PayslipHeader from "./PayslipHeader";
import PayslipMandatoryDeduc from "./PayslipMandatoryDeduc";
import React from "react";

const PayslipList = ({ payslip }) => {
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
  console.log(payslip);
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
            />
            {/* 2nd */}
            <PayslipEarnings
              paytypeId={otherBenefitsEarningsId}
              empid={payslip?.data[0].payroll_list_employee_id}
              payrollid={payslip?.data[0].payroll_list_payroll_id}
              hourRate={hourRate}
              days={days}
            />

            <tr className="hover:bg-white">
              <td colSpan={4}>&nbsp;</td>
            </tr>
            <tr className="font-semibold bg-gray-300 hover:bg-gray-300">
              <td colSpan={3} className="uppercase text-right xs:pr-16">
                Total Earnings
              </td>
              <td>{numberWithCommas(totalEarnings.toFixed(2))}</td>
            </tr>
            <tr>
              <td colSpan={4}>&nbsp;</td>
            </tr>

            {/* deduction */}
            <PayslipMandatoryDeduc
              paytypeId={mandatoryDeductionId}
              payslip={payslip}
              empid={payslip?.data[0].payroll_list_employee_id}
              payrollid={payslip?.data[0].payroll_list_payroll_id}
            />

            <PayslipDeduction
              paytypeId={optionalDeductionId}
              empid={payslip?.data[0].payroll_list_employee_id}
              payrollid={payslip?.data[0].payroll_list_payroll_id}
            />

            <PayslipDeduction
              paytypeId={paytypeOtherDeductionId}
              empid={payslip?.data[0].payroll_list_employee_id}
              payrollid={payslip?.data[0].payroll_list_payroll_id}
            />
            {/* <PayslipDeduction
              paytypeId={taxDeductionId}
              empid={payslip?.data[0].payroll_list_employee_id}
              payrollid={payslip?.data[0].payroll_list_payroll_id}
            /> */}
            <tr>
              <td colSpan={4}></td>
            </tr>
            <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
              <td colSpan={3} className="w-[20rem] uppercase">
                TAX
              </td>
              <td colSpan={3} className="w-[20rem] uppercase">
                {numberWithCommas(
                  Number(payslip?.data[0].payroll_list_tax).toFixed(2)
                )}
              </td>
            </tr>

            {/* total */}
            <tr>
              <td colSpan={4}>&nbsp;</td>
            </tr>
            <tr className="font-semibold bg-gray-300 hover:bg-gray-300 uppercase">
              <td colSpan={3} className="uppercase text-right xs:pr-16 pr-4">
                total deductions
              </td>
              <td>9,830.55</td>
            </tr>
            <tr>
              <td colSpan={4}>&nbsp;</td>
            </tr>
            {/* netpay */}
            <tr className="bg-primary hover:bg-primary text-white uppercase">
              <td colSpan={3} className="uppercase text-right xs:pr-16 pr-4">
                net pay
              </td>
              <td>9,196.35</td>
            </tr>
          </tbody>
        </table>

        <p className="text-center my-8 ">
          <i>
            This is a computer generated payslip. Does not require signature
          </i>
        </p>
      </div>
    </>
  );
};

export default PayslipList;

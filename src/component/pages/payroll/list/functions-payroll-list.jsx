import {
  payComputeAbsences,
  payComputeAdjustment,
  payComputeHazardPay,
  payComputeHoliday,
  payComputeInflationAdjustmen,
  payComputeLeave,
  payComputeNightDiff,
  payComputeOt,
  payComputeTaxDue,
  payComputeUndertime,
} from "../../../helpers/payroll-formula";

export const runPayroll = (employee, payrollEarnings, holidays, semiTax) => {
  let totalOtAmount = 0;
  let totalLeaveAmount = 0;
  let totalUndertimeAmount = 0;
  let totalAbsencesAmount = 0;
  let totalNightDiffAmount = 0;
  let totalHazardPayAmount = 0;
  let totalInflationAmount = 0;
  let totalAdjustmentAmount = 0;
  let totalHolidayAmount = 0;
  let grossAmount = 0;
  let totalBasicPay = 0;
  let deductionAmount = 0;
  let netPay = 0;
  let tax = 0;
  let payrollList = [];
  // loop each employee records
  employee.map((emp) => {
    totalBasicPay = Number(emp.payroll_list_employee_salary) / 2;
    // loop each earnings for each employee
    payrollEarnings.map((earning) => {
      if (
        emp.payroll_earning_type === earning.earnings_payroll_type_id && // payroll type
        emp.payroll_list_payroll_id === earning.earnings_payroll_id && // payroll id
        emp.payroll_list_employee_id === earning.earnings_employee_id && // employee id
        new Date(emp.payroll_end_date) >=
          new Date(earning.earnings_start_pay_date) && // payroll end date
        new Date(emp.payroll_end_date) >=
          new Date(earning.earnings_end_pay_date) // payroll end date
      ) {
        totalOtAmount += payComputeOt(earning);
        totalLeaveAmount += payComputeLeave(earning);
        totalUndertimeAmount += payComputeUndertime(earning);
        totalAbsencesAmount += payComputeAbsences(earning);
        totalHazardPayAmount += payComputeHazardPay(earning);
        totalInflationAmount += payComputeInflationAdjustmen(earning);
        totalAdjustmentAmount += payComputeAdjustment(earning);
      }
    });
    //  holiday for each employee
    totalHolidayAmount += payComputeHoliday(emp, holidays, payrollEarnings);
    // night diffirencial
    totalNightDiffAmount += payComputeNightDiff(emp, holidays, payrollEarnings);
    // gross or total wages
    grossAmount =
      totalNightDiffAmount +
      totalHolidayAmount +
      totalBasicPay +
      totalOtAmount +
      totalHazardPayAmount +
      totalInflationAmount +
      totalAdjustmentAmount -
      totalAbsencesAmount -
      totalUndertimeAmount;

    // total De Minimis

    // 13th mo & Other benefits

    // // loop each deductions for each employee
    // payrollEarnings.map((deduction) => {
    //   if (
    //     emp.payroll_earning_type === earning.earnings_payroll_type_id && // payroll type
    //     emp.payroll_list_payroll_id === earning.earnings_payroll_id && // payroll id
    //     emp.payroll_list_employee_id === earning.earnings_employee_id && // employee id
    //     new Date(emp.payroll_end_date) >=
    //       new Date(earning.earnings_start_pay_date) && // payroll end date
    //     new Date(emp.payroll_end_date) >=
    //       new Date(earning.earnings_end_pay_date) // payroll end date
    //   ) {
    //     // totalOtAmount += payComputeOt(earning);
    //     // totalLeaveAmount += payComputeLeave(earning);
    //     // totalUndertimeAmount += payComputeUndertime(earning);
    //     // totalAbsencesAmount += payComputeAbsences(earning);
    //     // totalHazardPayAmount += payComputeHazardPay(earning);
    //     // totalInflationAmount += payComputeInflationAdjustmen(earning);
    //     // totalAdjustmentAmount += payComputeAdjustment(earning);
    //   }
    // });

    // compute tax due
    tax = payComputeTaxDue(emp, grossAmount, semiTax, lessItems);
    // data to send to server
    payrollList.push({
      // wages
      payroll_list_employee_id: emp.payroll_list_employee_id,
      payroll_list_employee_name: emp.payroll_list_employee_name,
      payroll_list_basic_pay: totalBasicPay.toFixed(2),
      payroll_list_overtime_pay: totalOtAmount.toFixed(2),
      payroll_list_leave_pay: totalLeaveAmount.toFixed(2),
      payroll_list_absences: totalAbsencesAmount.toFixed(2),
      payroll_list_undertime: totalUndertimeAmount.toFixed(2),
      payroll_list_night_shift_differential: totalNightDiffAmount.toFixed(2),
      payroll_list_hazard_pay: totalHazardPayAmount.toFixed(2),
      payroll_list_inlfation_adjustment: totalInflationAmount.toFixed(2),
      payroll_list_adjustment_pay: totalAdjustmentAmount.toFixed(2),
      payroll_list_holiday: totalHolidayAmount.toFixed(2),
      payroll_list_gross: grossAmount.toFixed(2),
      // Deminimis
      // total deduction
      payroll_list_deduction: 0,
      payroll_list_net_pay: 0,
    });

    // reset variables
    totalOtAmount = 0;
    totalLeaveAmount = 0;
    totalUndertimeAmount = 0;
    totalAbsencesAmount = 0;
    totalNightDiffAmount = 0;
    totalHazardPayAmount = 0;
    totalInflationAmount = 0;
    totalAdjustmentAmount = 0;
    totalHolidayAmount = 0;
    grossAmount = 0;
    deductionAmount = 0;
    netPay = 0;
    tax = 0;
  });

  console.log(payrollList);
};

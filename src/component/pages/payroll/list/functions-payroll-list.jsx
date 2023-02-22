import {
  computeHoliday,
  computeNightDiff,
  payComputeAbsences,
  payComputeAdjustment,
  payComputeHazardPay,
  payComputeInflationAdjustmen,
  payComputeLeave,
  payComputeOt,
} from "../../../helpers/payroll-formula";

export const runPayroll = (employee, payrollEarnings, holidays) => {
  let totalOtAmount = 0;
  let totalLeaveAmount = 0;
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
        new Date(emp.payroll_end_date) <=
          new Date(earning.earnings_end_pay_date) // payroll end date
      ) {
        totalOtAmount += payComputeOt(earning, holidays, emp);
        totalLeaveAmount += payComputeLeave(earning, holidays);
        totalAbsencesAmount += payComputeAbsences(earning);
        totalHazardPayAmount += payComputeHazardPay(earning);
        totalInflationAmount += payComputeInflationAdjustmen(earning);
        totalAdjustmentAmount += payComputeAdjustment(earning);
      }
    });
    //  loop each holiday for each employee
    holidays.map((holidaysItem) => {
      if (
        new Date(holidaysItem.holidays_date) >=
          new Date(emp.payroll_start_date) &&
        new Date(holidaysItem.holidays_date) <= new Date(emp.payroll_end_date)
      ) {
        totalHolidayAmount += computeHoliday(emp, holidaysItem);
      }
    });
    // night diffirencial
    totalNightDiffAmount += computeNightDiff(emp);

    grossAmount =
      totalNightDiffAmount +
      totalBasicPay +
      totalOtAmount +
      totalLeaveAmount +
      totalHazardPayAmount +
      totalInflationAmount +
      totalAdjustmentAmount -
      totalAbsencesAmount;

    payrollList.push({
      payroll_list_employee_id: emp.payroll_list_employee_id,
      payroll_list_employee_name: emp.payroll_list_employee_name,
      payroll_list_basic_pay: Number(emp.payroll_list_employee_salary) / 2,
      payroll_list_overtime_pay: totalOtAmount.toFixed(2),
      payroll_list_leave_pay: totalLeaveAmount.toFixed(2),
      payroll_list_absences: totalAbsencesAmount.toFixed(2),
      payroll_list_night_shift_differential: totalNightDiffAmount.toFixed(2),
      payroll_list_hazard_pay: totalHazardPayAmount.toFixed(2),
      payroll_list_inlfation_adjustment: totalInflationAmount.toFixed(2),
      payroll_list_adjustment_pay: totalAdjustmentAmount.toFixed(2),
      payroll_list_holiday: totalHolidayAmount.toFixed(2),
      payroll_list_gross: grossAmount,
      payroll_list_deduction: 0,
      payroll_list_net_pay: 0,
    });

    // reset variables
    totalOtAmount = 0;
    totalLeaveAmount = 0;
    totalAbsencesAmount = 0;
    totalNightDiffAmount = 0;
    totalHazardPayAmount = 0;
    totalInflationAmount = 0;
    totalAdjustmentAmount = 0;
    totalHolidayAmount = 0;
    grossAmount = 0;
    deductionAmount = 0;
    netPay = 0;
  });

  console.log(payrollList);
};

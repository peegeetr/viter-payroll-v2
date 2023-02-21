import { getWorkingDays } from "./functions-general";
import {
  absencesId,
  hazardPayId,
  inflationAdjustmentId,
  leaveId,
  overtimeId,
  payAdjustmentId,
} from "./functions-payitemId";

export const employeeRate = (salary, workingDays) => {
  let list = {};
  let dayRate = 0;
  let hourRate = 0;
  let periodSalary = Number(salary) / 2;
  dayRate = periodSalary / Number(workingDays);
  hourRate = dayRate / 8;
  list.daily = dayRate.toFixed(2);
  list.hourly = hourRate.toFixed(4);
  list.period = periodSalary.toFixed(2);
  // console.log(list);
  return list;
};

export const payComputeOt = (earning, holidays = 130) => {
  let amount = 0;
  let regularAmount = 0;
  let finalAmountOt = 0;
  let rate = holidays / 100;
  if (earning.earnings_payitem_id === overtimeId) {
    amount += Number(earning.earnings_amount);
    regularAmount += Number(earning.earnings_amount) * rate;
  }
  finalAmountOt = regularAmount - amount;
  return finalAmountOt;
};

export const payComputeLeave = (earning) => {
  let amountLeave = 0;
  if (earning.earnings_payitem_id === leaveId) {
    amountLeave += Number(earning.earnings_amount);
  }
  return amountLeave;
};

export const payComputeAbsences = (earning) => {
  let amountAbsences = 0;
  if (earning.earnings_payitem_id === absencesId) {
    amountAbsences += Number(earning.earnings_amount);
  }
  return amountAbsences;
};

// compute Night Diffirencial
export const computeNightDiff = (emp) => {
  const days = getWorkingDays(
    new Date(emp.payroll_start_date),
    new Date(emp.payroll_end_date)
  );
  let rate = 110 / 100;
  let ratedAmount = 0;
  let regularAmount = 0;
  let finalAmountNightDiff = 0;
  let hourRate = Number(
    employeeRate(emp.payroll_list_employee_salary, days).hourly
  );

  if (emp.payroll_list_night_diff_per_day > 0) {
    ratedAmount += emp.payroll_list_night_diff_per_day * hourRate * days * rate;
    regularAmount += emp.payroll_list_night_diff_per_day * hourRate * days;
  }
  finalAmountNightDiff = ratedAmount - regularAmount;
  return finalAmountNightDiff;
};

// compute Hazard Pay
export const payComputeHazardPay = (earning) => {
  let amountHazardPay = 0;
  if (
    earning.earnings_payitem_id === hazardPayId &&
    earning.earnings_number_of_installment === 1
  ) {
    amountHazardPay += Number(earning.earnings_amount);
  }
  return amountHazardPay;
};

// compute Inflation Adjustmen
export const payComputeInflationAdjustmen = (earning) => {
  let amountHazardPay = 0;
  if (
    earning.earnings_payitem_id === inflationAdjustmentId &&
    earning.earnings_number_of_installment === 1
  ) {
    amountHazardPay += Number(earning.earnings_amount);
  }
  return amountHazardPay;
};

// compute Pay Adjustment
export const payComputeAdjustment = (earning) => {
  let amountHazardPay = 0;
  if (
    earning.earnings_payitem_id === payAdjustmentId &&
    earning.earnings_number_of_installment === 1
  ) {
    amountHazardPay += Number(earning.earnings_amount);
  }
  return amountHazardPay;
};

// compute holiday
export const computeHoliday = (emp, holiday) => {
  const days = getWorkingDays(
    new Date(emp.payroll_start_date),
    new Date(emp.payroll_end_date)
  );
  let amountHazardPay = 0;
  if (holiday.holidays_type === "regular") {
    amountHazardPay += employeeRate(
      emp.payroll_list_employee_salary,
      days
    ).daily;
  }

  return amountHazardPay;
};

import { formatDate, getWorkingDays } from "./functions-general";
import {
  absencesId,
  hazardPayId,
  inflationAdjustmentId,
  leaveId,
  overtimeId,
  payAdjustmentId,
  undertimeId,
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

export const payComputeOt = (earning) => {
  let finalAmount = 0;

  if (earning.earnings_payitem_id === overtimeId) {
    // additional Overtime
    finalAmount += Number(earning.earnings_amount);
  }
  return finalAmount;
};

export const payComputeLeave = (earning) => {
  let finalAmount = 0;

  if (earning.earnings_payitem_id === leaveId) {
    //dont have additional leave
    finalAmount += 0;
  }
  return finalAmount;
};

export const payComputeAbsences = (earning) => {
  let finalAmount = 0;
  if (earning.earnings_payitem_id === absencesId) {
    finalAmount += Number(earning.earnings_amount);
  }
  return finalAmount;
};

export const payComputeUndertime = (earning) => {
  let finalAmount = 0;
  if (earning.earnings_payitem_id === undertimeId) {
    finalAmount += Number(earning.earnings_amount);
  }
  return finalAmount;
};

// compute Night Diffirencial
export const payComputeNightDiff = (emp, holidays) => {
  const days = getWorkingDays(
    new Date(emp.payroll_start_date),
    new Date(emp.payroll_end_date)
  );
  let rate10 = 110 / 100;
  let ratedNdAmount = 0;
  let ratedDailyNdAmount = 0;
  let regularAmount = 0;
  let finalAmount = 0;
  let totalNDHolidayAmount = 0;
  let totalNDAmount = 0;
  let dailyRate = Number(
    employeeRate(emp.payroll_list_employee_salary, days).daily
  );
  let hourRate = Number(
    employeeRate(emp.payroll_list_employee_salary, days).hourly
  );

  if (emp.payroll_list_night_diff_per_day > 0) {
    // if holiday and night diff
    holidays.map((holidaysItem) => {
      let holidayDate = holidaysItem.holidays_date;

      let holidayRate = holidaysItem.holidays_rate / 100;
      if (
        new Date(holidaysItem.holidays_date) >=
          new Date(emp.payroll_start_date) &&
        new Date(holidaysItem.holidays_date) <=
          new Date(emp.payroll_end_date) &&
        new Date(holidayDate).getDay() != 0 &&
        new Date(holidayDate).getDay() != 6
      ) {
        ratedDailyNdAmount = dailyRate * holidayRate;
        // 10% + holiday rate additional
        totalNDHolidayAmount += ratedDailyNdAmount - dailyRate;
      }
    });

    // night diff
    let totalHrs = emp.payroll_list_night_diff_per_day * days;
    regularAmount = totalHrs * hourRate;
    ratedNdAmount = regularAmount * rate10;
    // 10% additional
    totalNDAmount += ratedNdAmount - regularAmount;
  }

  finalAmount = totalNDAmount + totalNDHolidayAmount;
  return finalAmount;
};

// compute Hazard Pay
export const payComputeHazardPay = (earning) => {
  let finalAmount = 0;
  if (
    earning.earnings_payitem_id === hazardPayId &&
    earning.earnings_number_of_installment === 1
  ) {
    finalAmount += Number(earning.earnings_amount);
  }
  return finalAmount;
};

// compute Inflation Adjustmen
export const payComputeInflationAdjustmen = (earning) => {
  let finalAmount = 0;
  if (
    earning.earnings_payitem_id === inflationAdjustmentId &&
    earning.earnings_number_of_installment === 1
  ) {
    finalAmount += Number(earning.earnings_amount);
  }
  return finalAmount;
};

// compute Pay Adjustment
export const payComputeAdjustment = (earning) => {
  let finalAmount = 0;
  if (
    earning.earnings_payitem_id === payAdjustmentId &&
    earning.earnings_number_of_installment === 1
  ) {
    finalAmount += Number(earning.earnings_amount);
  }
  return finalAmount;
};

// compute holiday
export const payComputeHoliday = (emp, holidays) => {
  const days = getWorkingDays(
    new Date(emp.payroll_start_date),
    new Date(emp.payroll_end_date)
  );
  let workOnHoliday = emp.payroll_list_employee_work_on_holiday;
  let ratedAmount = 0;
  let regularAmount = 0;
  let finalAmount = 0;
  let dailyRate = Number(
    employeeRate(emp.payroll_list_employee_salary, days).daily
  );
  holidays.map((holidaysItem) => {
    let holidayDate = holidaysItem.holidays_date;
    let rate = holidaysItem.holidays_rate / 100;
    if (
      new Date(holidaysItem.holidays_date) >=
        new Date(emp.payroll_start_date) &&
      new Date(holidaysItem.holidays_date) <= new Date(emp.payroll_end_date) &&
      new Date(holidayDate).getDay() != 0 &&
      new Date(holidayDate).getDay() != 6
    ) {
      if (holidaysItem.holidays_type === "regular") {
        if (workOnHoliday === 0) {
          // no additional
          finalAmount = 0;
        }
        // 100% additional pay for working holiday
        if (workOnHoliday === 1) {
          regularAmount += dailyRate;
          ratedAmount += dailyRate * rate;
        }
      }

      // 30% additional pay for working special holiday
      if (holidaysItem.holidays_type === "special") {
        regularAmount += dailyRate;
        ratedAmount += dailyRate * rate;
      }
    }
  });

  finalAmount += ratedAmount - regularAmount;
  return finalAmount;
};

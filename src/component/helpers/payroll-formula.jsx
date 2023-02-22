import { formatDate, getWorkingDays } from "./functions-general";
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

export const payComputeOt = (earning, holidays, emp) => {
  let rate = 125 / 100;
  let isHoliday = false;
  let ratedAmount = 0;
  let regularAmount = 0;
  let finalAmount = 0;
  let totalAmount = 0;
  let totalOtHolidayAmount = 0;

  holidays.map((holidaysItem) => {
    // if overtime and holiday is same date
    if (
      earning.earnings_payitem_id === overtimeId &&
      holidaysItem.holidays_date === earning.earnings_hris_date
    ) {
      let holidayRate = holidaysItem.holidays_rate / 100;

      //100% additional if overtime is regular day
      if (holidaysItem.holidays_type === "regular") {
        regularAmount += Number(earning.earnings_amount);
        ratedAmount += Number(earning.earnings_amount) * holidayRate;
        totalAmount += Number(earning.earnings_amount) * rate - regularAmount;
        isHoliday = true;
      }

      //30% additional if overtime is regular day
      if (holidaysItem.holidays_type === "special") {
        regularAmount += Number(earning.earnings_amount);
        ratedAmount += Number(earning.earnings_amount) * holidayRate;
        totalAmount += Number(earning.earnings_amount) * rate - regularAmount;
        isHoliday = true;
      }
      totalOtHolidayAmount = ratedAmount - regularAmount + totalAmount;
    }
  });

  if (earning.earnings_payitem_id === overtimeId) {
    //if dont have holiday
    //25% additional if overtime is regular day
    regularAmount += Number(earning.earnings_amount);
    ratedAmount += Number(earning.earnings_amount) * rate;
    totalAmount = ratedAmount - regularAmount;
  }
  // OT + holiday (special or Regular)
  finalAmount = isHoliday ? totalOtHolidayAmount : totalAmount;

  console.log(
    "ot",
    finalAmount,
    totalAmount,
    totalOtHolidayAmount,
    emp.payroll_list_employee_name
  );
  return finalAmount;
};

export const payComputeLeave = (earning, holidays) => {
  let finalAmount = 0;
  let totalLeaveHolidayAmount = 0;
  let totalAmount = 0;
  let regularAmount = 0;
  let ratedAmount = 0;
  let val = false;

  holidays.map((holidaysItem) => {
    // if overtime and holiday is same date
    if (
      earning.earnings_payitem_id === leaveId &&
      holidaysItem.holidays_date === earning.earnings_hris_date
    ) {
      let holidayRate = holidaysItem.holidays_rate / 100;
      //30% additional if overtime is regular day
      if (holidaysItem.holidays_type === "special") {
        regularAmount += Number(earning.earnings_amount);
        ratedAmount += Number(earning.earnings_amount) * holidayRate;
        val = true;
      }
      totalLeaveHolidayAmount = ratedAmount - regularAmount;
    }
  });
  if (earning.earnings_payitem_id === leaveId) {
    //dont have additional leave
    totalAmount += 0;
  }
  finalAmount = val === false ? totalAmount : totalLeaveHolidayAmount;
  return finalAmount;
};

export const payComputeAbsences = (earning) => {
  let finalAmount = 0;
  if (earning.earnings_payitem_id === absencesId) {
    finalAmount += Number(earning.earnings_amount);
  }
  return finalAmount;
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
  let finalAmount = 0;
  let hourRate = Number(
    employeeRate(emp.payroll_list_employee_salary, days).hourly
  );

  if (emp.payroll_list_night_diff_per_day > 0) {
    ratedAmount += emp.payroll_list_night_diff_per_day * hourRate * days * rate;
    regularAmount += emp.payroll_list_night_diff_per_day * hourRate * days;
  }
  finalAmount = ratedAmount - regularAmount;
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
export const computeHoliday = (emp, holiday) => {
  const days = getWorkingDays(
    new Date(emp.payroll_start_date),
    new Date(emp.payroll_end_date)
  );
  let ratedAmount = 0;
  let regularAmount = 0;
  let finalAmount = 0;
  let rate = holiday.holidays_rate / 100;
  let dailyRate = Number(
    employeeRate(emp.payroll_list_employee_salary, days).daily
  );

  if (holiday.holidays_type === "regular") {
    if (
      emp.payroll_list_employee_work_on_holiday === 0 ||
      emp.payroll_list_employee_work_none_working_holiday === 0
    ) {
      // no additional
      finalAmount = 0;
    }
    if (
      emp.payroll_list_employee_work_on_holiday === 1 ||
      emp.payroll_list_employee_work_none_working_holiday === 1
    ) {
      regularAmount += dailyRate;
      ratedAmount += dailyRate * rate;

      // 100% additional pay for working holiday
      finalAmount = ratedAmount - regularAmount;
    }
  }

  if (holiday.holidays_type === "special") {
    regularAmount += dailyRate;
    ratedAmount += dailyRate * rate;

    // 30% additional pay for working special holiday
    finalAmount = ratedAmount - regularAmount;

    if (emp.payroll_list_employee_work_none_working_holiday === 0) {
      // no additional
      finalAmount = 0;
    }
  }
  return finalAmount;
};

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

export const otHolidayComputed = (earning, holidayRate, rate) => {
  let totalHolidayAmount = 0;
  let totalAmount = 0;
  let finalAmount = 0;
  let regularAmount = Number(earning.earnings_amount);
  // 100% or 30% additional holiday
  totalHolidayAmount = regularAmount * holidayRate - regularAmount;
  // additional rate ot or night diff
  totalAmount = regularAmount * rate - regularAmount;
  // total of additional salary
  finalAmount = totalHolidayAmount + totalAmount;
  return finalAmount;
};

export const payComputeOt = (earning, holidays, emp) => {
  let rate25 = 125 / 100;
  let restRate30 = 130 / 100;
  let isHoliday = false;
  let isRestDay = false;
  let ratedAmount = 0;
  let regularAmount = 0;
  let finalAmount = 0;
  let totalOtAmount25 = 0;
  let totalOtHolidayRestAmount = 0;
  let totalOtRestAmount = 0;
  let totalOtHolidayAmount = 0;

  holidays.map((holidaysItem) => {
    // if overtime and holiday is same date
    if (
      earning.earnings_payitem_id === overtimeId &&
      holidaysItem.holidays_date === earning.earnings_hris_date.split(" ")[0]
    ) {
      let holidayRate = holidaysItem.holidays_rate / 100;
      let otDate = earning.earnings_hris_date.split(" ")[0];
      let otTime = earning.earnings_hris_date.split(" ")[1];
      let otTimeHr = otTime.split(":")[0];

      //if overtime is regular or special holiday day and restday
      if (new Date(otDate).getDay() == 0 || new Date(otDate).getDay() == 6) {
        totalOtHolidayRestAmount = otHolidayComputed(
          earning,
          holidayRate,
          restRate30
        );
        isHoliday = true;
        isRestDay = true;

        console.log(
          "otTimeHr",
          otTimeHr,
          otTime,
          emp.payroll_list_employee_name
        );
      }

      //if overtime is regular or special holiday day
      if (!isRestDay) {
        totalOtHolidayAmount = otHolidayComputed(earning, holidayRate, rate25);
        isHoliday = true;
      }
    }
  });

  // if Overtime and not holiday
  if (earning.earnings_payitem_id === overtimeId && !isHoliday) {
    let otDate = earning.earnings_hris_date.split(" ")[0];

    // if overtime and saturday or sunday
    if (new Date(otDate).getDay() == 0 || new Date(otDate).getDay() == 6) {
      //if dont have holiday and saturday or sunday
      regularAmount = Number(earning.earnings_amount);
      ratedAmount = regularAmount * restRate30;
      //total of 30% additional
      totalOtRestAmount = ratedAmount - regularAmount;
      isRestDay = true;
    }

    // if overtime is normal day
    if (!isRestDay) {
      // if dont have holiday and not saturday or sunday
      regularAmount = Number(earning.earnings_amount);
      ratedAmount = regularAmount * rate25;
      //total of 25% additional
      totalOtAmount25 = ratedAmount - regularAmount;
    }
  }

  // OT + holiday + restday (special or Regular) with or without leave
  finalAmount += isHoliday && isRestDay && totalOtHolidayRestAmount;
  // OT + holiday (special or Regular) with or without leave
  finalAmount += isHoliday && !isRestDay && totalOtHolidayAmount;
  // OT + restday with or without leave
  finalAmount += !isHoliday && isRestDay && totalOtRestAmount;
  // OT normal day with or without leave
  finalAmount += !isHoliday && !isRestDay && totalOtAmount25;

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

// compute Night Diffirencial
export const payComputeNightDiff = (emp) => {
  const days = getWorkingDays(
    new Date(emp.payroll_start_date),
    new Date(emp.payroll_end_date)
  );
  let rate10 = 110 / 100;
  let ratedAmount = 0;
  let regularAmount = 0;
  let finalAmount = 0;
  let hourRate = Number(
    employeeRate(emp.payroll_list_employee_salary, days).hourly
  );

  if (emp.payroll_list_night_diff_per_day > 0) {
    ratedAmount +=
      emp.payroll_list_night_diff_per_day * hourRate * days * rate10;
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
export const payComputeHoliday = (emp, holiday) => {
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

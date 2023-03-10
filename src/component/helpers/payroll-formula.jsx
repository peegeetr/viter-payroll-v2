import { getWorkingDays } from "./functions-general";
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
export const payComputeNightDiff = (emp, holidays, payrollEarnings) => {
  const days = getWorkingDays(
    new Date(emp.payroll_start_date),
    new Date(emp.payroll_end_date)
  );
  let workOnHoliday = emp.payroll_list_employee_work_on_holiday;
  let rate10 = 110 / 100;
  let ratedNdAmount = 0;
  let ndLeave = 0;
  let totalMinusHrs = 0;
  let ndUndertime = 0;
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
        (workOnHoliday === 1 || holidaysItem.holidays_observed === 1) &&
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

    payrollEarnings.map((earning) => {
      if (
        emp.payroll_earning_type === earning.earnings_payroll_type_id && // payroll type
        emp.payroll_list_payroll_id === earning.earnings_payroll_id && // payroll id
        emp.payroll_list_employee_id === earning.earnings_employee_id &&
        new Date(emp.payroll_end_date) >=
          new Date(earning.earnings_start_pay_date) && // payroll end date
        new Date(emp.payroll_end_date) >=
          new Date(earning.earnings_end_pay_date) // employee id
      ) {
        if (
          earning.earnings_payitem_id === absencesId ||
          earning.earnings_payitem_id === leaveId
        ) {
          // minus 5 hours
          ndLeave += 5;
        }

        let spentHr = earning.earnings_hris_undertime_out.split(" ")[1];
        let undertimeOut = earning.earnings_hris_undertime_out.split(" ")[0];
        let undertimeOutHr = undertimeOut.split(":")[0];
        if (
          earning.earnings_payitem_id === undertimeId &&
          undertimeOutHr >= 0 &&
          undertimeOutHr <= 6
        ) {
          // minus 5 hours
          ndUndertime += spentHr.slice(0, 1);
        }
      }
      totalMinusHrs = ndLeave + Number(ndUndertime);
    });
    // night diff
    let totalHrs = emp.payroll_list_night_diff_per_day * days;
    regularAmount = (totalHrs - totalMinusHrs) * hourRate;
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
export const payComputeHoliday = (emp, holidays, payrollEarnings) => {
  let finalAmount = 0;
  let holidayLeaveAmount = 0;
  let holidayAmount = 0;
  holidays.map((holidaysItem) => {
    let holidayDate = holidaysItem.holidays_date;

    if (
      new Date(holidaysItem.holidays_date) >=
        new Date(emp.payroll_start_date) &&
      new Date(holidaysItem.holidays_date) <= new Date(emp.payroll_end_date) &&
      new Date(holidayDate).getDay() != 0 &&
      new Date(holidayDate).getDay() != 6
    ) {
      // If employee has holiday but leave
      payrollEarnings.map((earning) => {
        if (
          emp.payroll_earning_type === earning.earnings_payroll_type_id && // payroll type
          emp.payroll_list_payroll_id === earning.earnings_payroll_id && // payroll id
          emp.payroll_list_employee_id === earning.earnings_employee_id && // employee id
          new Date(holidaysItem.holidays_date) >=
            new Date(earning.earnings_start_pay_date) &&
          new Date(holidaysItem.holidays_date) <=
            new Date(earning.earnings_end_pay_date)
        ) {
          if (
            earning.earnings_payitem_id === absencesId ||
            earning.earnings_payitem_id === leaveId
          ) {
            // Total Amount holiday and leave
            holidayLeaveAmount += holidayTotalAmount(emp, holidaysItem);
          }
        }
      });
      holidayAmount += holidayTotalAmount(emp, holidaysItem);
    }
  });

  finalAmount = holidayAmount - holidayLeaveAmount;
  return finalAmount;
};

// compute holiday
export const holidayTotalAmount = (emp, holidaysItem) => {
  const days = getWorkingDays(
    new Date(emp.payroll_start_date),
    new Date(emp.payroll_end_date)
  );

  let rate = holidaysItem.holidays_rate / 100;
  let workOnHoliday = emp.payroll_list_employee_work_on_holiday;
  let ratedAmount = 0;
  let regularAmount = 0;
  let finalAmount = 0;
  let dailyRate = Number(
    employeeRate(emp.payroll_list_employee_salary, days).daily
  );

  if (holidaysItem.holidays_type === "regular") {
    // If employee has holiday and not observed
    if (workOnHoliday === 0 && holidaysItem.holidays_observed === 0) {
      // no additional
      finalAmount = 0;
    }

    // If employee has holiday
    // if employee has holiday observed and other employee did not observed
    // 100% additional pay for working holiday
    if (workOnHoliday === 1 || holidaysItem.holidays_observed === 1) {
      regularAmount += dailyRate;
      ratedAmount += dailyRate * rate;
    }
  }

  // if employee has holiday observed and other employee did not observed
  // 30% additional pay for working special holiday
  if (holidaysItem.holidays_type === "special") {
    if (workOnHoliday === 0 && holidaysItem.holidays_observed === 0) {
      // no additional
      finalAmount = 0;
    }

    // If employee has holiday
    // If employee has holiday and not observed
    if (workOnHoliday === 1 || holidaysItem.holidays_observed === 1) {
      // 30% additional
      regularAmount += dailyRate;
      ratedAmount += dailyRate * rate;
    }
  }

  finalAmount += ratedAmount - regularAmount;
  return finalAmount;
};

// compute tax due
export const payComputeTaxDue = (emp, gross, semiTax, lessItems) => {
  console.log(emp);
  let tax = 0;
  let list = [];
  const totalNonTaxableCompensation = lessItems;
  const taxableCompensationIncome = 0;
  semiTax.map((sTax) => {
    if (
      Number(taxableCompensationIncome) >=
        Number(sTax.semi_monthly_range_from) &&
      Number(taxableCompensationIncome) <= Number(sTax.semi_monthly_range_to)
    ) {
      // list.push({
      //   // tax_aid: Number(taxBracket[i].tax_aid),
      //   semi_monthly_range_from: Number(sTax.semi_monthly_range_from),
      //   semi_monthly_range_to: Number(sTax.semi_monthly_range_to),
      //   semi_monthly_less_amount: Number(sTax.semi_monthly_less_amount),
      //   semi_monthly_rate: Number(sTax.semi_monthly_rate),
      //   semi_monthly_additional_amount: Number(
      //     sTax.semi_monthly_additional_amount
      //   ),
      //   taxableCompensationIncome: gross - totalNonTaxableCompensation,
      //   totalNonTaxableCompensation,
      // });
      taxableCompensationIncome = gross - totalNonTaxableCompensation;
      tax =
        taxableCompensationIncome -
        Number(sTax.semi_monthly_less_amount) *
          (Number(sTax.semi_monthly_rate) / 100) +
        Number(sTax.semi_monthly_additional_amount);
    }
  });

  return tax;
};

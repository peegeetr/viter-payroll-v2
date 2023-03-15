import {
  isHrisNumber,
  isSemiMonthly,
  onetimeNumber,
} from "./functions-earning-refference";
import { formatDate, getWorkingDays } from "./functions-general";
import {
  absencesId,
  bereavementId,
  bonusId,
  diminimisId,
  EmpConributionId,
  employeeReferralBonusId,
  fcaTutionId,
  fwcTithesId,
  hazardPayId,
  holidayId,
  inflationAdjustmentId,
  leaveId,
  mandatoryDeductionId,
  nightDiffId,
  otherAllowancesId,
  otherDeductionId,
  overtimeId,
  pagibigEeId,
  pagibigErId,
  PagibigLoanId,
  PagibigMP2Id,
  payAdjustmentId,
  philhealthEeId,
  philhealthErId,
  separationPayId,
  sssEeId,
  sssErId,
  SSSLoanId,
  payrollTaxDeductionId,
  undertimeId,
  wagesId,
  taxDeductionId,
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
  let ndList = [];
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
        emp.payroll_category_type === earning.earnings_payroll_type_id && // payroll type
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

    finalAmount = totalNDAmount + totalNDHolidayAmount;
    ndList.push({
      earnings_payroll_type_id: emp.payroll_category_type,
      earnings_employee: emp.payroll_list_employee_name,
      earnings_employee_id: emp.payroll_list_employee_id,
      earnings_paytype_id: wagesId,
      earnings_payitem_id: nightDiffId,
      earnings_amount: finalAmount,
      earnings_details: `${emp.payroll_list_night_diff_per_day}hrs per day`,
      earnings_frequency: isSemiMonthly,
      earnings_is_installment: isHrisNumber,
      earnings_number_of_installment: onetimeNumber,
      earnings_start_pay_date: emp.payroll_start_date,
      earnings_end_pay_date: emp.payroll_end_date,
    });
  }

  return { finalAmount, ndList };
  // return finalAmount;
};

// compute Hazard Pay
export const payComputeHazardPay = (earning) => {
  let finalAmount = 0;
  if (earning.earnings_payitem_id === hazardPayId) {
    finalAmount += Number(earning.earnings_amount);
  }
  return finalAmount;
};

// compute Inflation Adjustmen
export const payComputeInflationAdjustmen = (earning) => {
  let finalAmount = 0;
  if (earning.earnings_payitem_id === inflationAdjustmentId) {
    finalAmount += Number(earning.earnings_amount);
  }
  return finalAmount;
};

// compute Pay Adjustment
export const payComputeAdjustment = (earning) => {
  let finalAmount = 0;
  if (earning.earnings_payitem_id === payAdjustmentId) {
    finalAmount += Number(earning.earnings_amount);
  }
  return finalAmount;
};

// compute Pay Diminimis
export const payComputeDiminimis = (earning) => {
  let finalAmount = 0;
  if (earning.earnings_payitem_id === diminimisId) {
    finalAmount += Number(earning.earnings_amount);
  }
  return finalAmount;
};

// compute Pay Bereavement
export const payComputeBereavement = (earning) => {
  let finalAmount = 0;
  if (earning.earnings_payitem_id === bereavementId) {
    finalAmount += Number(earning.earnings_amount);
  }

  return finalAmount;
};

// compute Pay Bonus
export const payComputeBunos = (earning) => {
  let finalAmount = 0;
  if (earning.earnings_payitem_id === bonusId) {
    finalAmount += Number(earning.earnings_amount);
  }
  return finalAmount;
};

// compute Pay Employee Referral Bonus
export const payComputeEmployeeReferralBonus = (earning) => {
  let finalAmount = 0;
  if (earning.earnings_payitem_id === employeeReferralBonusId) {
    finalAmount += Number(earning.earnings_amount);
  }
  return finalAmount;
};

// compute Pay Separation Pay
export const payComputeSeparationPay = (earning) => {
  let finalAmount = 0;
  if (earning.earnings_payitem_id === separationPayId) {
    finalAmount += Number(earning.earnings_amount);
  }
  return finalAmount;
};

// compute Pay Other Allowances
export const payComputeOtherAllowances = (earning) => {
  let finalAmount = 0;
  if (earning.earnings_payitem_id === otherAllowancesId) {
    finalAmount += Number(earning.earnings_amount);
  }
  return finalAmount;
};

// compute holiday
export const payComputeHoliday = (emp, holidays, payrollEarnings) => {
  let finalAmount = 0;
  let holidayLeaveAmount = 0;
  let holidayAmount = 0;

  let holidayList = [];
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
          emp.payroll_category_type === earning.earnings_payroll_type_id && // payroll type
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
            holidayLeaveAmount += holidayTotalAmount(
              emp,
              holidaysItem
            ).dailyAmount;
          }
        }
      });
      holidayAmount += holidayTotalAmount(emp, holidaysItem).dailyAmount;
      holidayList.push({
        earnings_payroll_type_id: emp.payroll_category_type,
        earnings_employee: emp.payroll_list_employee_name,
        earnings_employee_id: emp.payroll_list_employee_id,
        earnings_paytype_id: wagesId,
        earnings_payitem_id: holidayId,
        earnings_amount: holidayTotalAmount(emp, holidaysItem).dailyAmount,
        earnings_details: `${holidaysItem.holidays_name} ${formatDate(
          holidaysItem.holidays_date
        )}`,
        earnings_frequency: isSemiMonthly,
        earnings_is_installment: isHrisNumber,
        earnings_number_of_installment: onetimeNumber,
        earnings_start_pay_date: emp.payroll_start_date,
        earnings_end_pay_date: emp.payroll_end_date,
        earnings_hris_date: holidaysItem.holidays_date,
      });
    }
  });

  finalAmount = holidayAmount - holidayLeaveAmount;
  return { finalAmount, holidayList };
  // return finalAmount;
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
  let dailyAmount = 0;
  let dailyRate = Number(
    employeeRate(emp.payroll_list_employee_salary, days).daily
  );

  if (holidaysItem.holidays_type === "regular") {
    // If employee has holiday and not observed
    if (workOnHoliday === 0 && holidaysItem.holidays_observed === 0) {
      // no additional
      dailyAmount = 0;
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
      dailyAmount = 0;
    }

    // If employee has holiday
    // If employee has holiday and not observed
    if (workOnHoliday === 1 || holidaysItem.holidays_observed === 1) {
      // 30% additional
      regularAmount += dailyRate;
      ratedAmount += dailyRate * rate;
    }
  }

  dailyAmount += ratedAmount - regularAmount;

  return { dailyAmount };
};

// compute tax due
export const payComputeTaxDue = (
  emp,
  gross,
  semiTax,
  totalBenefits,
  totalMadatoryEe
) => {
  // console.log(emp);
  let taxDue = 0;
  let taxList = [];
  const totalNonTaxableCompensation = totalBenefits + totalMadatoryEe;
  let taxableCompensationIncome = gross - totalNonTaxableCompensation;
  semiTax.map((sTax) => {
    if (
      Number(taxableCompensationIncome) >=
        Number(sTax.semi_monthly_range_from) &&
      Number(taxableCompensationIncome) <= Number(sTax.semi_monthly_range_to)
    ) {
      taxDue =
        taxableCompensationIncome -
        Number(sTax.semi_monthly_less_amount) *
          (Number(sTax.semi_monthly_rate) / 100) +
        Number(sTax.semi_monthly_additional_amount);
    }
  });

  // use to insert in earnings table
  taxList.push({
    deduction_payroll_type_id: emp.payroll_category_type,
    deduction_employee: emp.payroll_list_employee_name,
    deduction_employee_id: emp.payroll_list_employee_id,
    deduction_paytype_id: taxDeductionId,
    deduction_payitem_id: payrollTaxDeductionId,
    deduction_amount: taxDue,
    deduction_details: "Tax Employee",
    deduction_frequency: isSemiMonthly,
    deduction_is_installment: onetimeNumber,
    deduction_number_of_installment: onetimeNumber,
    deduction_start_pay_date: emp.payroll_start_date,
    deduction_end_pay_date: emp.payroll_end_date,
  });
  return { taxDue, taxList };
};

// compute sss bracket
export const payComputeSssBracket = (emp, sssBracket) => {
  let sssEr = 0;
  let sssEe = 0;
  let sssList = [];
  sssBracket.map((item) => {
    if (
      Number(emp.payroll_list_employee_salary) >=
        Number(item.sss_bracket_range_from) &&
      Number(emp.payroll_list_employee_salary) <=
        Number(item.sss_bracket_range_to)
    ) {
      sssEr = Number(item.sss_bracket_er) / 2;
      sssEe = Number(item.sss_bracket_ee) / 2;
      // use to insert in earnings table
      sssList.push({
        earnings_payroll_type_id: emp.payroll_category_type,
        earnings_employee: emp.payroll_list_employee_name,
        earnings_employee_id: emp.payroll_list_employee_id,
        deduction_paytype_id: mandatoryDeductionId,
        earnings_paytype_id: EmpConributionId,
        deduction_payitem_id: sssEeId,
        earnings_payitem_id: sssErId,
        deduction_amount: sssEe,
        earnings_amount: sssEr,
        earnings_details: "SSS Employer",
        deduction_details: "SSS Employee",
        earnings_frequency: isSemiMonthly,
        earnings_is_installment: onetimeNumber,
        earnings_number_of_installment: onetimeNumber,
        earnings_start_pay_date: emp.payroll_start_date,
        earnings_end_pay_date: emp.payroll_end_date,
      });
    }
  });

  // if out of bracket
  if (sssEr === 0 || sssEe === 0) {
    sssEr = Number(sssBracket[sssBracket.length - 1].sss_bracket_er) / 2;
    sssEe = Number(sssBracket[sssBracket.length - 1].sss_bracket_ee) / 2;
    // use to insert in earnings table
    sssList.push({
      earnings_payroll_type_id: emp.payroll_category_type,
      earnings_employee: emp.payroll_list_employee_name,
      earnings_employee_id: emp.payroll_list_employee_id,
      deduction_paytype_id: mandatoryDeductionId,
      earnings_paytype_id: EmpConributionId,
      deduction_payitem_id: sssEeId,
      earnings_payitem_id: sssErId,
      deduction_amount: sssEe,
      earnings_amount: sssEr,
      earnings_details: "SSS Employer",
      deduction_details: "SSS Employee",
      earnings_frequency: isSemiMonthly,
      earnings_is_installment: onetimeNumber,
      earnings_number_of_installment: onetimeNumber,
      earnings_start_pay_date: emp.payroll_start_date,
      earnings_end_pay_date: emp.payroll_end_date,
    });
  }

  return { sssEr, sssEe, sssList };
};

// compute pagibig
export const payComputePagibig = (emp, pagibig) => {
  let pagibigEr = 0;
  let pagibigEe = 0;
  let pagibigList = [];
  if (pagibig.length > 0) {
    if (Number(emp.payroll_list_pagibig_additional) > 0) {
      pagibigEr = Number(emp.payroll_list_pagibig_additional);
      pagibigEe = Number(emp.payroll_list_pagibig_additional);
    } else {
      pagibigEr = pagibig[0].pagibig_er_amount;
      pagibigEe = pagibig[0].pagibig_ee_amount;
    }
  }
  pagibigList.push({
    earnings_payroll_type_id: emp.payroll_category_type,
    earnings_employee: emp.payroll_list_employee_name,
    earnings_employee_id: emp.payroll_list_employee_id,
    deduction_paytype_id: mandatoryDeductionId,
    earnings_paytype_id: EmpConributionId,
    deduction_payitem_id: pagibigEeId,
    earnings_payitem_id: pagibigErId,
    deduction_amount: pagibigEe,
    earnings_amount: pagibigEr,
    earnings_details: "Pagibig Employer",
    deduction_details: "Pagibig Employee",
    earnings_frequency: isSemiMonthly,
    earnings_is_installment: onetimeNumber,
    earnings_number_of_installment: onetimeNumber,
    earnings_start_pay_date: emp.payroll_start_date,
    earnings_end_pay_date: emp.payroll_end_date,
  });

  return { pagibigEr, pagibigEe, pagibigList };
};

// compute philhealth
export const payComputePhil = (emp, philhealth) => {
  let philhealthEr = 0;
  let philhealthEe = 0;
  let totalSalary = 0;
  let philhealthList = [];

  if (philhealth.length > 0) {
    totalSalary =
      Number(emp.payroll_list_employee_salary) *
      (philhealth[0].philhealth_percentage / 100);

    //if salary >= max
    if (totalSalary >= philhealth[0].philhealth_max) {
      philhealthEr = Number(philhealth[0].philhealth_max) / 4;
      philhealthEe = Number(philhealth[0].philhealth_max) / 4;
      // use to insert in earnings table
    }
    //if salary <= min
    if (totalSalary <= philhealth[0].philhealth_min) {
      philhealthEr = Number(philhealth[0].philhealth_min) / 4;
      philhealthEe = Number(philhealth[0].philhealth_min) / 4;
      // use to insert in earnings table
    }
    // if min, max are false
    philhealthEr = Number(totalSalary) / 4;
    philhealthEe = Number(totalSalary) / 4;
  }
  // use to insert in earnings table
  philhealthList.push({
    earnings_payroll_type_id: emp.payroll_category_type,
    earnings_employee: emp.payroll_list_employee_name,
    earnings_employee_id: emp.payroll_list_employee_id,
    deduction_paytype_id: mandatoryDeductionId,
    earnings_paytype_id: EmpConributionId,
    deduction_payitem_id: philhealthEeId,
    earnings_payitem_id: philhealthErId,
    deduction_amount: philhealthEe,
    earnings_amount: philhealthEr,
    earnings_details: "Philhealth Employer",
    deduction_details: "Philhealth Employee ",
    earnings_frequency: isSemiMonthly,
    earnings_is_installment: onetimeNumber,
    earnings_number_of_installment: onetimeNumber,
    earnings_start_pay_date: emp.payroll_start_date,
    earnings_end_pay_date: emp.payroll_end_date,
  });

  return { philhealthEr, philhealthEe, philhealthList };
};

// deductions compution

// compute FCA Tuition
export const payComputeTuition = (deduction) => {
  let finalAmount = 0;
  if (deduction.deduction_payitem_id === fcaTutionId) {
    finalAmount += Number(deduction.deduction_amount);
  }
  return finalAmount;
};

// compute FWC Tithes
export const payComputeTithes = (deduction) => {
  let finalAmount = 0;
  if (deduction.deduction_payitem_id === fwcTithesId) {
    finalAmount += Number(deduction.deduction_amount);
  }
  return finalAmount;
};

// compute FWC Tithes
export const payComputeOtherDeduction = (deduction) => {
  let finalAmount = 0;
  if (deduction.deduction_payitem_id === otherDeductionId) {
    finalAmount += Number(deduction.deduction_amount);
  }
  return finalAmount;
};

// compute Pagibig Loan
export const payComputePagibigLoan = (deduction) => {
  let finalAmount = 0;
  if (deduction.deduction_payitem_id === PagibigLoanId) {
    finalAmount += Number(deduction.deduction_amount);
  }
  return finalAmount;
};

// compute Pagibig MP2
export const payComputePagibigMP2 = (deduction) => {
  let finalAmount = 0;
  if (deduction.deduction_payitem_id === PagibigMP2Id) {
    finalAmount += Number(deduction.deduction_amount);
  }
  return finalAmount;
};

// compute SSS Loan
export const payComputeSSSLoan = (deduction) => {
  let finalAmount = 0;
  if (deduction.deduction_payitem_id === SSSLoanId) {
    finalAmount += Number(deduction.deduction_amount);
  }
  return finalAmount;
};

import {
  installmentNumber,
  isHrisNumber,
  isSemiMonthly,
  onetimeNumber,
} from "./functions-earning-refference";
import {
  formatDate,
  getWorkingDays,
  getWorkingDaysInMonth,
} from "./functions-general";
import {
  absencesId,
  bereavementId,
  bonusId,
  diminimisId,
  empContributionEarningsId,
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
  wagesEarningsId,
  taxDeductionId,
  deMinimisEarningsId,
  otherBenefitsEarningsId,
  paytypeOtherDeductionId,
  optionalDeductionId,
} from "./functions-payitemId";
import {
  payrollCategory13thMonthId,
  payrollCategoryBonusId,
} from "./functions-payroll-category-id";

export const employeeRate = (salary, workingDays) => {
  let list = {};
  let dayRate = 0;
  let hourRate = 0;
  let periodSalary = Number(salary) / 2;
  // dayRate = periodSalary / Number(workingDays);
  dayRate = salary / Number(workingDays);
  hourRate = dayRate / 8;
  list.daily = dayRate.toFixed(2);
  list.hourly = hourRate.toFixed(4);
  list.period = periodSalary.toFixed(2);
  return list;
};

// get number of Months
export const getNumberOfMonths = (startDate) => {
  const todayDate = new Date();
  const sDate = new Date(startDate);
  const todayYear = todayDate.getFullYear();
  const sDateYear = sDate.getFullYear();
  const todayMonth = todayDate.getMonth();
  const sDateMonth = sDate.getMonth();
  let totalMonth = 0;
  let totalYear = todayYear - sDateYear;
  let numberOfMonths = 0;

  if (totalYear === 0) {
    totalMonth = todayMonth - sDateMonth;
    numberOfMonths = totalMonth < 0 ? 0 : totalMonth + 1;
  }
  if (totalYear === 1) {
    let lastYearMonth = 0;
    lastYearMonth = 11 - sDateMonth;
    totalMonth = todayMonth + lastYearMonth + 1;
    numberOfMonths = totalMonth + 1;
  }

  if (totalYear > 1) {
    let startYearMonth = 0;
    let todayYearMonth = 0;
    let todayYearCount = 0;
    startYearMonth = 11 - sDateMonth;
    todayYearMonth = 11 - todayMonth;
    todayYearCount = 12 * totalYear - todayYearMonth;
    totalMonth = todayYearCount + startYearMonth;
    numberOfMonths = totalMonth + 1;
  }
  // console.log(numberOfMonths, totalMonth);
  return numberOfMonths;
};

export const payComputeCategoryBonus = (employee, payrollEarnings) => {
  let CategoryBonusList = [];
  let bonusList = [];
  let earningsNumInstallmentList = [];
  let bonusAmount = 0;
  let totalBonus = 0;
  let zero = "0.00";
  let payrollTotalAmount = 0;

  employee.map((emp) => {
    payrollEarnings.map((earning) => {
      // 13th mo & Other benefits
      // loop earnings onetime and installment for each employee
      if (
        emp.payroll_list_employee_id === earning.earnings_employee_id && // employee id
        earning.earnings_is_paid === 0 && // not paid
        Number(earning.earnings_payroll_type_id) === payrollCategoryBonusId && //onetime or installment
        earning.earnings_number_of_installment > earning.earnings_num_pay //number of payment
      ) {
        bonusAmount = payComputeBonus(emp, earning);
        totalBonus = bonusAmount.finalAmount;
        payrollTotalAmount += totalBonus;

        // for updating number of pay if installment or one time
        earningsNumInstallmentList.push({
          earnings_num_pay: earning.earnings_num_pay + 1,
          earnings_is_paid:
            earning.earnings_num_pay + 1 ===
            earning.earnings_number_of_installment
              ? 1
              : 0,
          earnings_employee_id: emp.payroll_list_employee_id,
          earnings_payitem_id: earning.earnings_payitem_id,
        });

        bonusList.push(...bonusAmount.bonusList);
        // data to send to server
        CategoryBonusList.push({
          payroll_category: payrollCategoryBonusId,
          payroll_list_employee_id: emp.payroll_list_employee_id,
          payroll_list_employee_name: emp.payroll_list_employee_name,
          payroll_list_gross: totalBonus.toFixed(2),
          payroll_list_deduction: zero,
          payroll_list_net_pay: zero,
          payroll_list_basic_pay: zero,
          payroll_list_overtime_pay: zero,
          payroll_list_overtime_hrs: zero,
          payroll_list_leave_pay: zero,
          payroll_list_leave_hrs: zero,
          payroll_list_holiday: zero,
          payroll_list_holiday_hrs: zero,
          payroll_list_inlfation_adjustment: zero,
          payroll_list_adjustment_pay: zero,
          payroll_list_night_shift_differential: zero,
          payroll_list_nd_hrs: zero,
          payroll_list_hazard_pay: zero,
          payroll_list_absences: zero,
          payroll_list_absences_hrs: zero,
          payroll_list_deminimis: zero,
          payroll_list_13th_month: zero,
          payroll_list_bonus: totalBonus.toFixed(2),
          payroll_list_employee_referral_bonus: zero,
          payroll_list_bereavement: zero,
          payroll_list_separation_pay: zero,
          payroll_list_other_allowances: zero,
          payroll_list_total_benefits: zero,
          payroll_list_sss_er: zero,
          payroll_list_philhealth_er: zero,
          payroll_list_pagibig_er: zero,
          payroll_list_hmo_er: zero,
          payroll_list_sss_ee: zero,
          payroll_list_philhealth_ee: zero,
          payroll_list_pagibig_ee: zero,
          payroll_list_hmo_ee: zero,
          payroll_list_sss_loan: zero,
          payroll_list_pagibig_loan: zero,
          payroll_list_pagibig_mp2: zero,
          payroll_list_fwc_tithes: zero,
          payroll_list_fca_tuition: zero,
          payroll_list_other_deduction: zero,
          payroll_list_madatory_ee: zero,
          payroll_list_tax: zero,
          payroll_list_undertime: zero,
          payrollTotalAmount: payrollTotalAmount.toFixed(2),
        });
      }
    });
  });
  return { CategoryBonusList, bonusList, earningsNumInstallmentList };
};

// category Id 13th month
export const payComputeCategory13thMonth = (category13thMonth, yearlyTax) => {
  let payrollList13thMonth = [];
  let finalAmount = 0;
  let totalAmount = 0;
  let absencesUndertimeSum = 0;
  let zero = "0.00";
  let taxYearly = 0;
  let baseAmount = 90000;
  let annualMinSalary = 250000;
  let annualNetSalary = 0;

  let payrollTotalAmount = 0;
  let totalBenefits = 0;
  let total13thAmount = 0;
  let totalShareEe = 0;
  let nonTax = 0;

  category13thMonth.map((cItem) => {
    // absencesUndertimeSum = cItem.total_absences + cItem.total_undertime;
    // totalAmount = (cItem.total_basic_pay - absencesUndertimeSum) / 12;
    const d = new Date();
    const month = d.getMonth();
    // const month = 10;
    console.log(month);
    annualNetSalary = Number(cItem.total_net);
    total13thAmount = Number(cItem.total_gross) / 12;
    console.log(total13thAmount, cItem.total_gross);
    if (month >= 10 && month <= 11) {
      console.log("000000000");
      annualNetSalary =
        Number(cItem.total_net) + Number(cItem.payroll_list_employee_salary);
      total13thAmount =
        (Number(cItem.total_gross) +
          Number(cItem.payroll_list_employee_salary)) /
        12;
    }
    console.log(
      total13thAmount,
      cItem.total_gross + Number(cItem.payroll_list_employee_salary)
    );
    // console.log(total13thAmount / 12, cItem.total_gross);
    // totalBenefits = Number(cItem.total_benefits) + Number(cItem.bonus);
    // total13thAmount = totalAmount + totalBenefits;
    // totalShareEe = cItem.sss + cItem.pag + cItem.phic;
    // nonTax = totalBenefits + totalShareEe + cItem.deminimis;

    taxYearly =
      total13thAmount > baseAmount
        ? compute13thMonthTax(
            annualNetSalary,
            yearlyTax,
            total13thAmount,
            baseAmount
          )
        : 0;
    // taxYearly =
    //   Number(total13thAmount) > baseAmount
    //     ? computeTaxYearly(total13thAmount, yearlyTax, nonTax)
    //     : 0;
    finalAmount = total13thAmount - taxYearly;
    console.log(
      cItem.payroll_list_employee_name,
      total13thAmount,
      annualNetSalary,
      taxYearly
    );
    payrollTotalAmount += finalAmount;
    payrollList13thMonth.push({
      payroll_category: payrollCategory13thMonthId,
      payroll_list_employee_id: cItem.payroll_list_employee_id,
      payroll_list_employee_name: cItem.payroll_list_employee_name,
      payroll_list_gross: total13thAmount.toFixed(2),
      payroll_list_deduction: taxYearly.toFixed(2),
      payroll_list_net_pay: zero,
      payroll_list_basic_pay: zero,
      payroll_list_overtime_pay: zero,
      payroll_list_overtime_hrs: zero,
      payroll_list_leave_pay: zero,
      payroll_list_leave_hrs: zero,
      payroll_list_holiday: zero,
      payroll_list_holiday_hrs: zero,
      payroll_list_inlfation_adjustment: zero,
      payroll_list_adjustment_pay: zero,
      payroll_list_night_shift_differential: zero,
      payroll_list_nd_hrs: zero,
      payroll_list_hazard_pay: zero,
      payroll_list_absences: zero,
      payroll_list_absences_hrs: zero,
      payroll_list_deminimis: zero,
      payroll_list_13th_month: finalAmount.toFixed(2),
      payroll_list_bonus: zero,
      payroll_list_employee_referral_bonus: zero,
      payroll_list_bereavement: zero,
      payroll_list_separation_pay: zero,
      payroll_list_other_allowances: zero,
      payroll_list_total_benefits: zero,
      payroll_list_sss_er: zero,
      payroll_list_philhealth_er: zero,
      payroll_list_pagibig_er: zero,
      payroll_list_hmo_er: zero,
      payroll_list_sss_ee: zero,
      payroll_list_philhealth_ee: zero,
      payroll_list_pagibig_ee: zero,
      payroll_list_hmo_ee: zero,
      payroll_list_sss_loan: zero,
      payroll_list_pagibig_loan: zero,
      payroll_list_pagibig_mp2: zero,
      payroll_list_fwc_tithes: zero,
      payroll_list_fca_tuition: zero,
      payroll_list_other_deduction: zero,
      payroll_list_madatory_ee: zero,
      payroll_list_tax: taxYearly.toFixed(2),
      payroll_list_undertime: zero,
      payrollTotalAmount: payrollTotalAmount.toFixed(2),
    });
  });

  return payrollList13thMonth;
};

export const payComputeOt = (earning) => {
  let finalAmount = 0;
  let otHrs = 0;

  if (earning.earnings_payitem_id === overtimeId) {
    // additional Overtime
    finalAmount += Number(earning.earnings_amount);
    otHrs += Number(earning.earnings_hrs);
  }
  return { finalAmount, otHrs };
};

export const payComputeLeave = (earning) => {
  let finalAmount = 0;
  let leaveHrs = 0;

  if (earning.earnings_payitem_id === leaveId) {
    //dont have additional leave
    finalAmount += Number(earning.earnings_amount);
    leaveHrs += Number(earning.earnings_hrs);
  }
  return { finalAmount, leaveHrs };
};

export const payComputeAbsences = (earning) => {
  let finalAmount = 0;
  let leaveHrs = 0;
  if (earning.earnings_payitem_id === absencesId) {
    finalAmount += Number(earning.earnings_amount);
    leaveHrs += Number(earning.earnings_hrs);
  }
  return { finalAmount, leaveHrs };
};

export const payComputeUndertime = (earning) => {
  let finalAmount = 0;
  if (earning.earnings_payitem_id === undertimeId) {
    finalAmount += Number(earning.earnings_amount);
  }
  return finalAmount;
};

// compute Night Diffirencial
export const payComputeNightDiff = (
  emp,
  holidays,
  payrollEarnings,
  holidayExemptions
) => {
  let ndList = [];
  const daysMonth = getWorkingDaysInMonth(new Date(emp.payroll_start_date));
  const days = getWorkingDays(
    new Date(emp.payroll_start_date),
    new Date(emp.payroll_end_date)
  );
  let workOnHoliday = emp.payroll_list_employee_work_on_holiday;
  // let rate10 = 110 / 100;
  let rate10 = 0.1;
  let ratedNdAmount = 0;
  let ndLeave = 0;
  let totalMinusHrs = 0;
  let minusHrs = 0;
  let ndUndertime = 0;
  let ratedDailyNdAmount = 0;
  let regularAmount = 0;
  let finalAmount = 0;
  let totalNDHolidayAmount = 0;
  let totalNDAmount = 0;
  let addedRate = 0;
  let newRate = 0;
  let totalHrs = 0;
  let holidayHrs = 0;
  let totalHolidayHrs = 0;
  let ndHolidayAmount = 0;
  let ndRatedHolidayAmount = 0;
  let isAbsent = false;
  let isExempted = false;
  let numberOfObservedHolidaysHrs = 0;
  let numberOfExcemptedHolidaysHrs = 0;
  let numberOfLeaveOrAbsencesHolidaysHrs = 0;
  let numberOfHolidays = 0;
  let numberOfHolidaysNd = 0;
  let numberOfHolidaysNdExcemption = 0;
  let leaveOrAbsencesDate = [];

  let dailyRate = Number(
    employeeRate(emp.payroll_list_employee_salary, days).daily
  );
  let hourRate = Number(
    employeeRate(emp.payroll_list_employee_salary, daysMonth).hourly
  );

  if (emp.payroll_list_night_diff_per_day > 0) {
    numberOfHolidaysNd = 0;
    // numberOfHolidaysNdExcemption = 0;
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
        // console.log(earning);
        if (
          earning.earnings_payitem_id === absencesId ||
          earning.earnings_payitem_id === leaveId
        ) {
          // leaveOrAbsencesDate = earning.earnings_hris_date;
          leaveOrAbsencesDate.push({
            date: earning.earnings_hris_date,
            id: earning.earnings_payitem_id,
          });
          // minus nd per hour
          ndLeave +=
            Number(emp.payroll_list_night_diff_per_day) *
            (Number(earning.earnings_hrs) / 8);
        }

        let undertimeOut = earning.earnings_hris_undertime_out.split(" ")[0];
        let undertimeOutHr = undertimeOut.split(":")[0];
        if (
          earning.earnings_payitem_id === undertimeId &&
          undertimeOutHr >= 0 &&
          undertimeOutHr < 6
        ) {
          // minus 5 hours
          // ndUndertime += spentHr.slice(0, 1);
          ndUndertime += Number(earning.earnings_hrs);
        }
      }
      totalMinusHrs = ndLeave + Number(ndUndertime);
    });

    console.log(leaveOrAbsencesDate);
    holidays.map((holidaysItem) => {
      let holidayDate = holidaysItem.holidays_date;
      let holidayObserved = holidaysItem.holidays_observed;
      let holidayRate = Number(holidaysItem.holidays_rate) / 100;
      // let holidayRate = Number(holidaysItem.holidays_rate) / 100 - 1;

      console.log(holidayObserved, workOnHoliday);
      // check for employee with holiday exemptions
      for (let h = 0; h < holidayExemptions.length; h++) {
        if (
          new Date(holidaysItem.holidays_date) >=
            new Date(emp.payroll_start_date) &&
          new Date(holidaysItem.holidays_date) <=
            new Date(emp.payroll_end_date) &&
          // absentOrLeave.earnings_hris_date !==
          //   holidayExemptions[h].holiday_exemption_holiday_date &&
          holidayExemptions[h].holiday_exemption_holiday_date ===
            holidaysItem.holidays_date &&
          holidayExemptions[h].holiday_exemption_eid ===
            emp.payroll_list_employee_id &&
          holidayExemptions[h].holiday_exemption_is_observe === 1
        ) {
          workOnHoliday = 1;
          holidayObserved = 1;
          break;
        }

        // not observed
        if (
          new Date(holidaysItem.holidays_date) >=
            new Date(emp.payroll_start_date) &&
          new Date(holidaysItem.holidays_date) <=
            new Date(emp.payroll_end_date) &&
          // absentOrLeave.earnings_hris_date !==
          //   holidayExemptions[h].holiday_exemption_holiday_date &&
          holidayExemptions[h].holiday_exemption_holiday_date ===
            holidaysItem.holidays_date &&
          holidayExemptions[h].holiday_exemption_eid ===
            emp.payroll_list_employee_id &&
          holidayExemptions[h].holiday_exemption_is_observe === 0
        ) {
          numberOfExcemptedHolidaysHrs += Number(
            emp.payroll_list_night_diff_per_day
          );
          workOnHoliday = 0;
          holidayObserved = 0;
          isExempted = true;
          console.log(numberOfExcemptedHolidaysHrs);
          break;
        }
      }

      leaveOrAbsencesDate.map((dte) => {
        if (dte.date === holidayDate) {
          numberOfLeaveOrAbsencesHolidaysHrs += Number(
            emp.payroll_list_night_diff_per_day
          );
          console.log(
            dte.date,
            holidayDate,
            numberOfLeaveOrAbsencesHolidaysHrs
          );
        }
      });

      // single holiday rate
      // check if work or observed holiday
      if (
        new Date(holidaysItem.holidays_date) >=
          new Date(emp.payroll_start_date) &&
        new Date(holidaysItem.holidays_date) <=
          new Date(emp.payroll_end_date) &&
        new Date(holidayDate).getDay() != 0 &&
        new Date(holidayDate).getDay() != 6
      ) {
        console.log(`${emp.payroll_list_employee_name}`, holidayDate);
        if (
          holidaysItem.holidays_type === "regular" ||
          holidaysItem.holidays_type === "special"
        ) {
          console.log(holidayObserved, workOnHoliday, isExempted);
          if (
            workOnHoliday === 0 &&
            holidayObserved === 0 &&
            isExempted === false
          ) {
            // no additional
            numberOfExcemptedHolidaysHrs += Number(
              emp.payroll_list_night_diff_per_day
            );
            // totalNDHolidayAmount = 0;
          }

          if (workOnHoliday === 1 || holidayObserved === 1) {
            numberOfObservedHolidaysHrs += Number(
              emp.payroll_list_night_diff_per_day
            );
            holidayHrs = Number(emp.payroll_list_night_diff_per_day);
            // 10% rate additional
            ndRatedHolidayAmount = hourRate * holidayRate * rate10 * holidayHrs;
            totalNDHolidayAmount += ndRatedHolidayAmount;
          }
        }
        // double holiday rate
        if (
          holidaysItem.holidays_type === "doubleS" ||
          holidaysItem.holidays_type === "doubleR" ||
          holidaysItem.holidays_type === "doubleSR"
        ) {
          if (
            workOnHoliday === 0 &&
            holidayObserved === 0 &&
            isExempted === false
          ) {
            // no additional
            numberOfExcemptedHolidaysHrs += Number(
              emp.payroll_list_night_diff_per_day
            );
            // totalNDHolidayAmount = 0;
          }

          // If employee has holiday and not observed
          if (workOnHoliday === 1 || holidayObserved === 1) {
            numberOfObservedHolidaysHrs += Number(
              emp.payroll_list_night_diff_per_day
            );
            holidayHrs = Number(emp.payroll_list_night_diff_per_day);
            // 10% rate additional
            ndRatedHolidayAmount = hourRate * holidayRate * rate10 * holidayHrs;
            totalNDHolidayAmount += ndRatedHolidayAmount;
          }
        }

        minusHrs =
          numberOfObservedHolidaysHrs -
          numberOfLeaveOrAbsencesHolidaysHrs +
          numberOfExcemptedHolidaysHrs;

        totalHolidayHrs = numberOfObservedHolidaysHrs;
        console.log(
          numberOfObservedHolidaysHrs,
          numberOfLeaveOrAbsencesHolidaysHrs,
          numberOfExcemptedHolidaysHrs,
          minusHrs,
          totalHolidayHrs
        );
        // numberOfObservedHolidaysHrs = 0;
        // numberOfLeaveOrAbsencesHolidaysHrs = 0;
        // numberOfExcemptedHolidaysHrs = 0;
        isExempted = false;
      }
    });
    totalMinusHrs += minusHrs;
    console.log("alhrs", numberOfLeaveOrAbsencesHolidaysHrs, totalMinusHrs);
    // night diff
    totalHrs =
      Number(emp.payroll_list_night_diff_per_day) * days - totalMinusHrs;
    // regularAmount = hourRate * rate10;
    // regularAmount = totalHrs * hourRate;
    ratedNdAmount = hourRate * rate10 - hourRate;
    // 10% additional
    // totalNDAmount += ratedNdAmount - regularAmount;
    // totalNDAmount += (ratedNdAmount + hourRate) * totalHrs;
    totalNDAmount = hourRate * rate10 * totalHrs;
    finalAmount = totalNDAmount + totalNDHolidayAmount;

    console.log(
      emp.payroll_list_employee_name,
      `\nRegular rate ND ${totalNDAmount}\n`,
      `Holiday rate ND ${totalNDHolidayAmount}\n`,
      `total hrs reg ND ${totalHrs}\n`,
      `total hrs hol ND ${
        numberOfObservedHolidaysHrs - numberOfLeaveOrAbsencesHolidaysHrs
      }\n`,
      `Minus hrs ${totalMinusHrs}`,
      totalNDHolidayAmount,
      ndLeave,
      numberOfExcemptedHolidaysHrs,
      days,
      numberOfObservedHolidaysHrs,
      numberOfLeaveOrAbsencesHolidaysHrs
    );

    ndList.push({
      earnings_payroll_type_id: emp.payroll_category_type,
      earnings_employee: emp.payroll_list_employee_name,
      earnings_employee_id: emp.payroll_list_employee_id,
      earnings_paytype_id: wagesEarningsId,
      earnings_payitem_id: nightDiffId,
      earnings_amount: finalAmount,
      earnings_hrs: totalHrs + numberOfObservedHolidaysHrs,
      earnings_rate: rate10 * 100,
      earnings_details: `Night Differential (110%) ${emp.payroll_list_night_diff_per_day} hrs/day`,
      // earnings_details: `Night Differential (110%) ${
      //   emp.payroll_list_night_diff_per_day
      // }hrs/day ${
      //   numberOfObservedHolidaysHrs > 0
      //     ? `(with ${numberOfObservedHolidaysHrs}hrs Holiday)`
      //     : ``
      // }`,
      earnings_frequency: isSemiMonthly,
      earnings_is_installment: isHrisNumber,
      earnings_number_of_installment: onetimeNumber,
      earnings_start_pay_date: emp.payroll_start_date,
      earnings_end_pay_date: emp.payroll_end_date,
    });
  }

  // console.log(totalNDAmount, totalHrs, hourRate, regularAmount, ratedNdAmount);

  return { finalAmount, ndList, totalHrs };
  // return finalAmount;
};

// compute Hazard Pay
export const payComputeHazardPay = (emp, earning) => {
  let finalAmount = 0;
  let hazardPayList = [];
  if (earning.earnings_payitem_id === hazardPayId) {
    finalAmount += Number(earning.earnings_amount);
    // if installment create installment extra
    if (earning.earnings_is_installment === installmentNumber) {
      hazardPayList.push({
        earnings_payroll_type_id: emp.payroll_category_type,
        earnings_employee: emp.payroll_list_employee_name,
        earnings_employee_id: emp.payroll_list_employee_id,
        earnings_paytype_id: wagesEarningsId,
        earnings_payitem_id: hazardPayId,
        earnings_amount: earning.earnings_amount,
        earnings_details: `${earning.payitem_name} - ${
          earning.earnings_details
        } (${Number(earning.earnings_num_pay) + 1}/${
          earning.earnings_number_of_installment
        }) `,
        earnings_frequency: isSemiMonthly,
        earnings_is_installment: onetimeNumber,
        earnings_number_of_installment: onetimeNumber,
        earnings_start_pay_date: emp.payroll_start_date,
        earnings_end_pay_date: emp.payroll_end_date,
        installment_extra: 1,
      });
    }
  }
  return { finalAmount, hazardPayList };
};

// compute Inflation Adjustmen
export const payComputeInflationAdjustmen = (emp, earning) => {
  let finalAmount = 0;
  let inflationList = [];
  if (earning.earnings_payitem_id === inflationAdjustmentId) {
    finalAmount += Number(earning.earnings_amount);
    // if installment create installment extra
    if (earning.earnings_is_installment === installmentNumber) {
      inflationList.push({
        earnings_payroll_type_id: emp.payroll_category_type,
        earnings_employee: emp.payroll_list_employee_name,
        earnings_employee_id: emp.payroll_list_employee_id,
        earnings_paytype_id: wagesEarningsId,
        earnings_payitem_id: inflationAdjustmentId,
        earnings_amount: earning.earnings_amount,
        earnings_details: `${earning.payitem_name} - ${
          earning.earnings_details
        } (${Number(earning.earnings_num_pay) + 1}/${
          earning.earnings_number_of_installment
        }) `,
        earnings_frequency: isSemiMonthly,
        earnings_is_installment: onetimeNumber,
        earnings_number_of_installment: onetimeNumber,
        earnings_start_pay_date: emp.payroll_start_date,
        earnings_end_pay_date: emp.payroll_end_date,
        installment_extra: 1,
      });
    }
  }
  return { finalAmount, inflationList };
};

// compute Pay Adjustment
export const payComputeAdjustment = (emp, earning) => {
  let finalAmount = 0;
  let adjustmentList = [];
  if (earning.earnings_payitem_id === payAdjustmentId) {
    finalAmount += Number(earning.earnings_amount);
    // if installment create installment extra
    if (earning.earnings_is_installment === installmentNumber) {
      adjustmentList.push({
        earnings_payroll_type_id: emp.payroll_category_type,
        earnings_employee: emp.payroll_list_employee_name,
        earnings_employee_id: emp.payroll_list_employee_id,
        earnings_paytype_id: wagesEarningsId,
        earnings_payitem_id: payAdjustmentId,
        earnings_amount: earning.earnings_amount,
        earnings_details: `${earning.payitem_name} - ${
          earning.earnings_details
        } (${Number(earning.earnings_num_pay) + 1}/${
          earning.earnings_number_of_installment
        }) `,
        earnings_frequency: isSemiMonthly,
        earnings_is_installment: onetimeNumber,
        earnings_number_of_installment: onetimeNumber,
        earnings_start_pay_date: emp.payroll_start_date,
        earnings_end_pay_date: emp.payroll_end_date,
        installment_extra: 1,
      });
    }
  }
  return { finalAmount, adjustmentList };
};

// compute Pay Diminimis
export const payComputeDiminimis = (emp) => {
  let finalAmount = 0;
  let deminimisList = [];
  if (emp.payroll_list_deminimis > 0) {
    finalAmount = emp.payroll_list_deminimis;
    deminimisList.push({
      earnings_payroll_type_id: emp.payroll_category_type,
      earnings_employee: emp.payroll_list_employee_name,
      earnings_employee_id: emp.payroll_list_employee_id,
      earnings_paytype_id: deMinimisEarningsId,
      earnings_payitem_id: diminimisId,
      earnings_amount: emp.payroll_list_deminimis,
      earnings_details: `De Minimis`,
      earnings_frequency: isSemiMonthly,
      earnings_is_installment: isHrisNumber,
      earnings_number_of_installment: onetimeNumber,
      earnings_start_pay_date: emp.payroll_start_date,
      earnings_end_pay_date: emp.payroll_end_date,
    });
  }
  return { deminimisList, finalAmount };
};

// compute Pay Bereavement
export const payComputeBereavement = (emp, earning) => {
  let finalAmount = 0;
  let bereavementList = [];
  if (earning.earnings_payitem_id === bereavementId) {
    finalAmount += Number(earning.earnings_amount);
    // if installment create installment extra
    if (earning.earnings_is_installment === installmentNumber) {
      bereavementList.push({
        earnings_payroll_type_id: emp.payroll_category_type,
        earnings_employee: emp.payroll_list_employee_name,
        earnings_employee_id: emp.payroll_list_employee_id,
        earnings_paytype_id: otherBenefitsEarningsId,
        earnings_payitem_id: bereavementId,
        earnings_amount: earning.earnings_amount,
        earnings_details: `${earning.payitem_name} - ${
          earning.earnings_details
        } (${Number(earning.earnings_num_pay) + 1}/${
          earning.earnings_number_of_installment
        }) `,
        earnings_frequency: isSemiMonthly,
        earnings_is_installment: onetimeNumber,
        earnings_number_of_installment: onetimeNumber,
        earnings_start_pay_date: emp.payroll_start_date,
        earnings_end_pay_date: emp.payroll_end_date,
        installment_extra: 1,
      });
    }
  }

  return { finalAmount, bereavementList };
};

// compute Pay Bonus
export const payComputeBonus = (emp, earning) => {
  let finalAmount = 0;
  let bonusList = [];
  if (earning.earnings_payitem_id === bonusId) {
    finalAmount += Number(earning.earnings_amount);
    // if installment create installment extra
    if (earning.earnings_is_installment === installmentNumber) {
      bonusList.push({
        earnings_payroll_type_id: emp.payroll_category_type,
        earnings_employee: emp.payroll_list_employee_name,
        earnings_employee_id: emp.payroll_list_employee_id,
        earnings_paytype_id: otherBenefitsEarningsId,
        earnings_payitem_id: bonusId,
        earnings_amount: earning.earnings_amount,
        earnings_details: `${earning.payitem_name} - ${
          earning.earnings_details
        } (${Number(earning.earnings_num_pay) + 1}/${
          earning.earnings_number_of_installment
        }) `,
        earnings_frequency: isSemiMonthly,
        earnings_is_installment: onetimeNumber,
        earnings_number_of_installment: onetimeNumber,
        earnings_start_pay_date: emp.payroll_start_date,
        earnings_end_pay_date: emp.payroll_end_date,
        installment_extra: 1,
      });
    }
  }
  return { finalAmount, bonusList };
};

// compute Pay Employee Referral Bonus
export const payComputeEmployeeReferralBonus = (emp, earning) => {
  // console.log(earning);
  let finalAmount = 0;
  let eRBonusList = [];
  if (earning.earnings_payitem_id === employeeReferralBonusId) {
    finalAmount += Number(earning.earnings_amount);
    // if installment create installment extra
    if (earning.earnings_is_installment === installmentNumber) {
      eRBonusList.push({
        earnings_payroll_type_id: emp.payroll_category_type,
        earnings_employee: emp.payroll_list_employee_name,
        earnings_employee_id: emp.payroll_list_employee_id,
        earnings_paytype_id: otherBenefitsEarningsId,
        earnings_payitem_id: employeeReferralBonusId,
        earnings_amount: earning.earnings_amount,
        earnings_details: `${earning.payitem_name} - ${
          earning.earnings_details
        } (${Number(earning.earnings_num_pay) + 1}/${
          earning.earnings_number_of_installment
        }) `,
        earnings_frequency: isSemiMonthly,
        earnings_is_installment: onetimeNumber,
        earnings_number_of_installment: onetimeNumber,
        earnings_start_pay_date: emp.payroll_start_date,
        earnings_end_pay_date: emp.payroll_end_date,
        installment_extra: 1,
      });
    }
  }
  return { finalAmount, eRBonusList };
};

// compute Pay Separation Pay
export const payComputeSeparationPay = (emp, earning) => {
  let finalAmount = 0;
  let separationPayList = [];
  if (earning.earnings_payitem_id === separationPayId) {
    finalAmount += Number(earning.earnings_amount); // if installment create installment extra
    if (earning.earnings_is_installment === installmentNumber) {
      separationPayList.push({
        earnings_payroll_type_id: emp.payroll_category_type,
        earnings_employee: emp.payroll_list_employee_name,
        earnings_employee_id: emp.payroll_list_employee_id,
        earnings_paytype_id: otherBenefitsEarningsId,
        earnings_payitem_id: separationPayId,
        earnings_amount: earning.earnings_amount,
        earnings_details: `${earning.payitem_name} - ${
          earning.earnings_details
        } (${Number(earning.earnings_num_pay) + 1}/${
          earning.earnings_number_of_installment
        }) `,
        earnings_frequency: isSemiMonthly,
        earnings_is_installment: onetimeNumber,
        earnings_number_of_installment: onetimeNumber,
        earnings_start_pay_date: emp.payroll_start_date,
        earnings_end_pay_date: emp.payroll_end_date,
        installment_extra: 1,
      });
    }
  }
  return { finalAmount, separationPayList };
};

// compute Pay Other Allowances
export const payComputeOtherAllowances = (emp, earning) => {
  let finalAmount = 0;
  let otherAllowancesList = [];
  if (earning.earnings_payitem_id === otherAllowancesId) {
    finalAmount += Number(earning.earnings_amount);
    // if installment create installment extra
    if (earning.earnings_is_installment === installmentNumber) {
      otherAllowancesList.push({
        earnings_payroll_type_id: emp.payroll_category_type,
        earnings_employee: emp.payroll_list_employee_name,
        earnings_employee_id: emp.payroll_list_employee_id,
        earnings_paytype_id: otherBenefitsEarningsId,
        earnings_payitem_id: otherAllowancesId,
        earnings_amount: earning.earnings_amount,
        earnings_details: `${earning.payitem_name} - ${
          earning.earnings_details
        } (${Number(earning.earnings_num_pay) + 1}/${
          earning.earnings_number_of_installment
        }) `,
        earnings_frequency: isSemiMonthly,
        earnings_is_installment: onetimeNumber,
        earnings_number_of_installment: onetimeNumber,
        earnings_start_pay_date: emp.payroll_start_date,
        earnings_end_pay_date: emp.payroll_end_date,
        installment_extra: 1,
      });
    }
  }
  return { finalAmount, otherAllowancesList };
};

// compute holiday
export const payComputeHoliday = (
  emp,
  holidays,
  payrollEarnings,
  holidayExemptions
) => {
  let finalAmount = 0;
  let regularAmount = 0;
  let holidayAmount = 0;
  let accumulatedAmount = 0;
  let accumulatedHrs = 0;
  let isAbsent = false;
  let regRate = 100;
  let holidayList = [];
  let isWorkHoliday = Boolean(emp.payroll_list_employee_work_on_holiday);
  holidays.map((holidaysItem) => {
    let holidayDate = holidaysItem.holidays_date;
    let isObserved = Boolean(holidaysItem.holidays_observed);
    if (
      new Date(holidaysItem.holidays_date) >=
        new Date(emp.payroll_start_date) &&
      new Date(holidaysItem.holidays_date) <= new Date(emp.payroll_end_date) &&
      new Date(holidayDate).getDay() != 0 &&
      new Date(holidayDate).getDay() != 6
    ) {
      // check first if leave or absent
      payrollEarnings.map((earning) => {
        if (
          (earning.earnings_payitem_id === leaveId ||
            earning.earnings_payitem_id === absencesId) &&
          emp.payroll_category_type === earning.earnings_payroll_type_id && // payroll type
          emp.payroll_list_payroll_id === earning.earnings_payroll_id && // payroll id
          emp.payroll_list_employee_id === earning.earnings_employee_id && // employee id
          new Date(holidaysItem.holidays_date) >=
            new Date(earning.earnings_start_pay_date) &&
          new Date(holidaysItem.holidays_date) <
            new Date(earning.earnings_end_pay_date)
        ) {
          isAbsent = true;
        }
      });

      if (!isAbsent) {
        holidayAmount = Number(
          holidayTotalAmount(emp, holidaysItem, holidayExemptions).dailyAmount
        );

        regularAmount += holidayTotalAmount(
          emp,
          holidaysItem,
          holidayExemptions
        ).dailyRate;

        // overwrite if exemptions
        isWorkHoliday = holidayTotalAmount(
          emp,
          holidaysItem,
          holidayExemptions
        ).workOnHoliday;
        // overwrite if exemptions
        isObserved = holidayTotalAmount(
          emp,
          holidaysItem,
          holidayExemptions
        ).holidayObserved;

        accumulatedAmount += holidayAmount;
        accumulatedHrs += 8;
        holidayList.push({
          earnings_payroll_type_id: emp.payroll_category_type,
          earnings_employee: emp.payroll_list_employee_name,
          earnings_employee_id: emp.payroll_list_employee_id,
          earnings_paytype_id: wagesEarningsId,
          earnings_payitem_id: holidayId,
          earnings_amount: holidayAmount.toFixed(2),
          earnings_details: `${holidaysItem.holidays_name} (${
            isWorkHoliday || isObserved
              ? holidaysItem.holidays_rate
              : // : holidaysItem.holidays_type === "doubleSR"
                // ? Number(holidaysItem.holidays_rate) - 200
                regRate
          }%) ${formatDate(holidaysItem.holidays_date)}`,
          earnings_frequency: isSemiMonthly,
          earnings_is_installment: isHrisNumber,
          earnings_number_of_installment: onetimeNumber,
          earnings_start_pay_date: emp.payroll_start_date,
          earnings_end_pay_date: emp.payroll_end_date,
          earnings_hris_date: holidaysItem.holidays_date,
          earnings_hrs: 8,
          earnings_rate:
            isWorkHoliday || isObserved
              ? holidaysItem.holidays_rate
              : // : holidaysItem.holidays_type === "doubleSR"
                // ? Number(holidaysItem.holidays_rate) - 200
                regRate,
        });
      }
    }
    isAbsent = false;
  });

  // finalAmount = holidayAmount - holidayLeaveAmount;
  finalAmount = holidayAmount;
  return {
    finalAmount,
    regularAmount,
    holidayList,
    accumulatedAmount,
    accumulatedHrs,
  };
  // return finalAmount;
};

// compute holiday
export const holidayTotalAmount = (emp, holidaysItem, holidayExemptions) => {
  // const days = getWorkingDays(
  //   new Date(emp.payroll_start_date),
  //   new Date(emp.payroll_end_date)
  // );
  const days = getWorkingDaysInMonth(new Date(emp.payroll_start_date));

  let rate = Number(holidaysItem.holidays_rate) / 100 - 1;
  // let rate = Number(holidaysItem.holidays_rate) / 100;
  let workOnHoliday = emp.payroll_list_employee_work_on_holiday;
  let holidayObserved = holidaysItem.holidays_observed;
  let dailyAmount = 0;
  let dailyRate = Number(
    employeeRate(emp.payroll_list_employee_salary, days).daily
  );

  // check for employee with holiday exemptions
  for (let h = 0; h < holidayExemptions.length; h++) {
    if (
      holidayExemptions[h].holiday_exemption_holiday_date ===
        holidaysItem.holidays_date &&
      holidayExemptions[h].holiday_exemption_eid ===
        emp.payroll_list_employee_id &&
      holidayExemptions[h].holiday_exemption_is_observe === 1
    ) {
      // console.log(emp.payroll_list_employee_id);
      workOnHoliday = 1;
      holidayObserved = 1;
      break;
    }

    // not observed
    if (
      holidayExemptions[h].holiday_exemption_holiday_date ===
        holidaysItem.holidays_date &&
      holidayExemptions[h].holiday_exemption_eid ===
        emp.payroll_list_employee_id &&
      holidayExemptions[h].holiday_exemption_is_observe === 0
    ) {
      // console.log(emp.payroll_list_employee_id);
      workOnHoliday = 0;
      holidayObserved = 0;
      break;
    }
  }

  if (
    holidaysItem.holidays_type === "regular" ||
    holidaysItem.holidays_type === "special"
  ) {
    // If employee has holiday and not observed
    if (workOnHoliday === 0 && holidayObserved === 0) {
      // no additional
      // dailyAmount = dailyRate;
      dailyAmount = 0;
    }

    // If employee has holiday
    // if employee has holiday observed and other employee did not observed
    // 100% or 30% additional pay for working holiday
    if (workOnHoliday === 1 || holidayObserved === 1) {
      // console.log(workOnHoliday);
      // regularAmount += dailyRate;
      // ratedAmount += dailyRate * rate;
      dailyAmount = dailyRate * Number(rate);
    }
  }

  // if double special holiday or double regular holiday or holiday
  // if double holiday employee has holiday observed and other employee did not observed
  // 160% 0r 300% or 260% additional pay for working special holiday
  if (
    holidaysItem.holidays_type === "doubleS" ||
    holidaysItem.holidays_type === "doubleR" ||
    holidaysItem.holidays_type === "doubleSR"
  ) {
    if (workOnHoliday === 0 && holidayObserved === 0) {
      // no additional
      // if (holidaysItem.holidays_type === "doubleSR") {
      //   dailyAmount = dailyRate * (Number(rate) - 2);
      // } else {
      //   // dailyAmount = dailyRate;
      // }
      dailyAmount = 0;
    }

    // If employee has holiday
    // If employee has holiday and not observed
    if (workOnHoliday === 1 || holidayObserved === 1) {
      // 160% 0r 300% or 260%  additional
      // dailyAmount = dailyRate * (Number(rate) - 1);
      dailyAmount = dailyRate * Number(rate);
    }
  }

  // dailyAmount += ratedAmount - regularAmount;
  // dailyRate -= dailyRate;
  dailyAmount = Number(dailyAmount.toFixed(2));
  // console.log(dailyAmount, rate);
  return { dailyAmount, dailyRate, workOnHoliday, holidayObserved };
};

// compute tax due
export const payComputeTaxDue = (
  emp,
  gross,
  semiTax,
  totalBenefits,
  totalMadatoryEe,
  totalDiminimis
) => {
  let taxDue = 0;
  let taxList = [];
  const totalNonTaxableCompensation =
    Number(totalBenefits.toFixed(2)) +
    Number(totalMadatoryEe) +
    Number(totalDiminimis);
  let taxableCompensationIncome =
    Number(gross.toFixed(2)) +
    Number(totalBenefits) -
    totalNonTaxableCompensation;

  semiTax.map((sTax) => {
    if (
      Number(taxableCompensationIncome) >=
        Number(sTax.semi_monthly_range_from) &&
      Number(taxableCompensationIncome) <= Number(sTax.semi_monthly_range_to)
    ) {
      taxDue =
        (taxableCompensationIncome - Number(sTax.semi_monthly_less_amount)) *
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
    deduction_amount: Number(taxDue.toFixed(2)),
    deduction_details: "Tax Employee",
    deduction_frequency: isSemiMonthly,
    deduction_is_installment: onetimeNumber,
    deduction_number_of_installment: onetimeNumber,
    deduction_start_pay_date: emp.payroll_start_date,
    deduction_end_pay_date: emp.payroll_end_date,
  });

  // console.log(
  //   totalDiminimis,
  //   totalMadatoryEe,
  //   totalNonTaxableCompensation,
  //   taxableCompensationIncome,
  //   taxDue.toFixed(2)
  // );

  return { taxDue, taxList };
};

// compute yearly tax due
export const computeTaxYearly = (gross, yearlyTax, nonTax = 0) => {
  let taxDue = 0;
  let taxable = 0;
  // const minimum = 250000;
  const minimum = Number(yearlyTax[0].tax_yearly_to);

  yearlyTax?.map((yTax) => {
    if (
      Number(gross) >= Number(yTax.tax_yearly_from) &&
      Number(gross) <= Number(yTax.tax_yearly_to)
    ) {
      taxable = Number(gross) - Number(nonTax);
      console.log(taxable, Number(nonTax), minimum);
      if (Number(taxable) >= 0 && Number(taxable) <= minimum) {
        return taxDue;
      }
      taxDue =
        (taxable - Number(yTax.tax_yearly_from)) *
          (Number(yTax.tax_yearly_rate) / 100) +
        Number(yTax.tax_yearly_fixed_tax);
    }
  });

  return taxDue;
};

// compute 13th month tax due annualNetSalary, yearlyTax, totalAmount
export const compute13thMonthTax = (
  annualNetSalary,
  yearlyTax,
  total13thAmount,
  baseAmount
) => {
  let taxDue = 0;

  yearlyTax?.map((yTax) => {
    if (
      Number(annualNetSalary) >= Number(yTax.tax_yearly_from) &&
      Number(annualNetSalary) <= Number(yTax.tax_yearly_to)
    ) {
      taxDue =
        (total13thAmount - baseAmount) * (Number(yTax.tax_yearly_rate) / 100);
    }
  });
  console.log(taxDue);
  return taxDue;
};

// compute sss bracket
export const payComputeSssBracket = (emp, sssBracket) => {
  let sssEr = 0;
  let sssEe = 0;
  let sssList = [];
  if (emp.payroll_list_deduc_employee_sss === 1) {
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
          earnings_paytype_id: empContributionEarningsId,
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
        earnings_paytype_id: empContributionEarningsId,
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
  }

  return { sssEr, sssEe, sssList };
};

// compute pagibig
export const payComputePagibig = (emp, pagibig) => {
  let pagibigEr = 0;
  let pagibigEe = 0;
  let pagibigList = [];
  if (emp.payroll_list_deduc_employee_pgbg === 1) {
    if (pagibig.length > 0) {
      if (Number(emp.payroll_list_pagibig_additional) > 0) {
        pagibigEr = Number(pagibig[0].pagibig_er_amount);
        pagibigEe =
          Number(pagibig[0].pagibig_ee_amount) +
          Number(emp.payroll_list_pagibig_additional);
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
      earnings_paytype_id: empContributionEarningsId,
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
  }
  return { pagibigEr, pagibigEe, pagibigList };
};

// compute philhealth
export const payComputePhil = (emp, philhealth) => {
  let philhealthEr = 0;
  let philhealthEe = 0;
  let totalSalary = 0;
  let philhealthList = [];

  if (emp.payroll_list_deduc_employee_philhealth === 1) {
    if (philhealth.length > 0) {
      totalSalary =
        Number(emp.payroll_list_employee_salary) *
        (Number(philhealth[0].philhealth_percentage) / 100);

      //if salary >= max
      if (totalSalary >= Number(philhealth[0].philhealth_max)) {
        philhealthEr = Number(philhealth[0].philhealth_max) / 4;
        philhealthEe = Number(philhealth[0].philhealth_max) / 4;
        // use to insert in earnings table
      }
      //if salary <= min
      if (totalSalary <= Number(philhealth[0].philhealth_min)) {
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
      earnings_paytype_id: empContributionEarningsId,
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
  }
  return { philhealthEr, philhealthEe, philhealthList };
};

//list of installment, deductions compution
// compute FCA Tuition
export const payComputeTuition = (emp, deduction) => {
  let finalAmount = 0;
  let tuitionList = [];
  if (deduction.employee_installment_paytype_id === fcaTutionId) {
    if (
      new Date(deduction.employee_installment_start_date) <=
      new Date(emp.payroll_start_date)
    ) {
      finalAmount = Number(deduction.employee_installment_amount) / 2;
      tuitionList.push({
        deduction_payroll_type_id: emp.payroll_category_type,
        deduction_employee: emp.payroll_list_employee_name,
        deduction_employee_id: emp.payroll_list_employee_id,
        deduction_paytype_id: paytypeOtherDeductionId,
        deduction_payitem_id: fcaTutionId,
        deduction_amount: finalAmount,
        deduction_details: `FCA Tuition ${deduction.employee_installment_details}`,
        deduction_frequency: isSemiMonthly,
        deduction_is_installment: onetimeNumber,
        deduction_number_of_installment: onetimeNumber,
        deduction_start_pay_date: emp.payroll_start_date,
        deduction_end_pay_date: emp.payroll_end_date,
        numOfPay: Number(deduction.employee_installment_number_of_payrun) + 1,
        numOfMonths: getNumberOfMonths(
          deduction.employee_installment_start_date
        ),
        // installment details
        employee_installment_number_of_months: Number(
          deduction.employee_installment_number_of_months
        ),
        employee_installment_start_date:
          deduction.employee_installment_start_date,
        employee_installment_status: deduction.employee_installment_status,
        employee_installment_aid: deduction.employee_installment_aid,
      });
    }
  }
  return { finalAmount, tuitionList };
};

// compute FWC Tithes deduction
export const payComputeTithes = (emp, deduction) => {
  let finalAmount = 0;
  let tithesList = [];
  if (deduction.employee_installment_paytype_id === fwcTithesId) {
    if (
      new Date(deduction.employee_installment_start_date) <=
      new Date(emp.payroll_start_date)
    ) {
      finalAmount = Number(deduction.employee_installment_amount) / 2;
      tithesList.push({
        deduction_payroll_type_id: emp.payroll_category_type,
        deduction_employee: emp.payroll_list_employee_name,
        deduction_employee_id: emp.payroll_list_employee_id,
        deduction_paytype_id: paytypeOtherDeductionId,
        deduction_payitem_id: fwcTithesId,
        deduction_amount: finalAmount,
        deduction_details: `FWC Tithes ${deduction.employee_installment_details}`,
        deduction_frequency: isSemiMonthly,
        deduction_is_installment: onetimeNumber,
        deduction_number_of_installment: onetimeNumber,
        deduction_start_pay_date: emp.payroll_start_date,
        deduction_end_pay_date: emp.payroll_end_date,
        numOfPay: Number(deduction.employee_installment_number_of_payrun) + 1,
        numOfMonths: getNumberOfMonths(
          deduction.employee_installment_start_date
        ),
        // installment details
        employee_installment_number_of_months: Number(
          deduction.employee_installment_number_of_months
        ),
        employee_installment_start_date:
          deduction.employee_installment_start_date,
        employee_installment_status: deduction.employee_installment_status,
        employee_installment_aid: deduction.employee_installment_aid,
      });
    }
  }
  return { finalAmount, tithesList };
};

// compute other deduction
export const payComputeOtherDeduction = (emp, deduction) => {
  let finalAmount = 0;
  let otherDeductionList = [];
  if (deduction.deduction_payitem_id === otherDeductionId) {
    finalAmount += Number(deduction.deduction_amount);
    if (deduction.deduction_is_installment === installmentNumber) {
      otherDeductionList.push({
        deduction_payroll_type_id: emp.payroll_category_type,
        deduction_employee: emp.payroll_list_employee_name,
        deduction_employee_id: emp.payroll_list_employee_id,
        deduction_paytype_id: paytypeOtherDeductionId,
        deduction_payitem_id: otherDeductionId,
        deduction_amount: deduction.deduction_amount,
        deduction_details: `${deduction.payitem_name} - ${
          deduction.deduction_details
        } (${Number(deduction.deduction_num_pay) + 1}/${
          deduction.deduction_number_of_installment
        })`,
        deduction_frequency: isSemiMonthly,
        deduction_is_installment: onetimeNumber,
        deduction_number_of_installment: onetimeNumber,
        deduction_start_pay_date: emp.payroll_start_date,
        deduction_end_pay_date: emp.payroll_end_date,
        installment_extra: 1,
      });
    }
  }
  return { finalAmount, otherDeductionList };
};

// compute Pagibig Loan deduction
export const payComputePagibigLoan = (emp, deduction) => {
  let finalAmount = 0;
  let pagibigLoanList = [];
  if (deduction.employee_installment_paytype_id === PagibigLoanId) {
    if (
      new Date(deduction.employee_installment_start_date) <=
      new Date(emp.payroll_start_date)
    ) {
      finalAmount = Number(deduction.employee_installment_amount) / 2;
      pagibigLoanList.push({
        deduction_payroll_type_id: emp.payroll_category_type,
        deduction_employee: emp.payroll_list_employee_name,
        deduction_employee_id: emp.payroll_list_employee_id,
        deduction_paytype_id: optionalDeductionId,
        deduction_payitem_id: PagibigLoanId,
        deduction_amount: finalAmount,
        deduction_details: `Pagibig ${deduction.employee_installment_details}`,
        deduction_frequency: isSemiMonthly,
        deduction_is_installment: onetimeNumber,
        deduction_number_of_installment: onetimeNumber,
        deduction_start_pay_date: emp.payroll_start_date,
        deduction_end_pay_date: emp.payroll_end_date,
        numOfPay: Number(deduction.employee_installment_number_of_payrun) + 1,
        numOfMonths: getNumberOfMonths(
          deduction.employee_installment_start_date
        ),
        // installment details
        employee_installment_number_of_months: Number(
          deduction.employee_installment_number_of_months
        ),
        employee_installment_start_date:
          deduction.employee_installment_start_date,
        employee_installment_status: deduction.employee_installment_status,
        employee_installment_aid: deduction.employee_installment_aid,
      });
    }
  }
  return { finalAmount, pagibigLoanList };
};

// compute Pagibig MP2 deduction
export const payComputePagibigMP2 = (emp, deduction) => {
  let finalAmount = 0;
  let pagibigMP2List = [];
  if (deduction.employee_installment_paytype_id === PagibigMP2Id) {
    if (
      new Date(deduction.employee_installment_start_date) <=
      new Date(emp.payroll_start_date)
    ) {
      finalAmount = Number(deduction.employee_installment_amount) / 2;
      pagibigMP2List.push({
        deduction_payroll_type_id: emp.payroll_category_type,
        deduction_employee: emp.payroll_list_employee_name,
        deduction_employee_id: emp.payroll_list_employee_id,
        deduction_paytype_id: optionalDeductionId,
        deduction_payitem_id: PagibigMP2Id,
        deduction_amount: finalAmount,
        deduction_details: `Pag-Ibig MP2`,
        deduction_frequency: isSemiMonthly,
        deduction_is_installment: onetimeNumber,
        deduction_number_of_installment: onetimeNumber,
        deduction_start_pay_date: emp.payroll_start_date,
        deduction_end_pay_date: emp.payroll_end_date,
        numOfPay: Number(deduction.employee_installment_number_of_payrun) + 1,
        numOfMonths: getNumberOfMonths(
          deduction.employee_installment_start_date
        ),
        // installment details
        employee_installment_number_of_months: Number(
          deduction.employee_installment_number_of_months
        ),
        employee_installment_start_date:
          deduction.employee_installment_start_date,
        employee_installment_status: deduction.employee_installment_status,
        employee_installment_aid: deduction.employee_installment_aid,
      });
    }
  }
  return { finalAmount, pagibigMP2List };
};

// compute SSS Loan deduction
export const payComputeSSSLoan = (emp, deduction) => {
  let finalAmount = 0;
  let sSSLoanList = [];
  if (deduction.employee_installment_paytype_id === SSSLoanId) {
    if (
      new Date(deduction.employee_installment_start_date) <=
      new Date(emp.payroll_start_date)
    ) {
      finalAmount = Number(deduction.employee_installment_amount) / 2;
      sSSLoanList.push({
        deduction_payroll_type_id: emp.payroll_category_type,
        deduction_employee: emp.payroll_list_employee_name,
        deduction_employee_id: emp.payroll_list_employee_id,
        deduction_paytype_id: optionalDeductionId,
        deduction_payitem_id: SSSLoanId,
        deduction_amount: finalAmount,
        deduction_details: `SSS ${deduction.employee_installment_details}`,
        deduction_frequency: isSemiMonthly,
        deduction_is_installment: onetimeNumber,
        deduction_number_of_installment: onetimeNumber,
        deduction_start_pay_date: emp.payroll_start_date,
        deduction_end_pay_date: emp.payroll_end_date,
        numOfPay: Number(deduction.employee_installment_number_of_payrun) + 1,
        numOfMonths: getNumberOfMonths(
          deduction.employee_installment_start_date
        ),
        // installment details
        employee_installment_number_of_months: Number(
          deduction.employee_installment_number_of_months
        ),
        employee_installment_start_date:
          deduction.employee_installment_start_date,
        employee_installment_status: deduction.employee_installment_status,
        employee_installment_aid: deduction.employee_installment_aid,
      });
    }
  }
  return { finalAmount, sSSLoanList };
};

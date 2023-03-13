import {
  everyPayrollNumber,
  installmentNumber,
  onetimeNumber,
} from "../../../helpers/functions-earning-refference";
import {
  payComputeAbsences,
  payComputeAdjustment,
  payComputeBereavement,
  payComputeBunos,
  payComputeDiminimis,
  payComputeEmployeeReferralBonus,
  payComputeHazardPay,
  payComputeHoliday,
  payComputeInflationAdjustmen,
  payComputeLeave,
  payComputeNightDiff,
  payComputeOt,
  payComputeOtherAllowances,
  payComputeOtherDeduction,
  payComputeSeparationPay,
  payComputeSssBracket,
  payComputeTaxDue,
  payComputeTithes,
  payComputeTuition,
  payComputeUndertime,
} from "../../../helpers/payroll-formula";

export const runPayroll = (
  employee,
  payrollEarnings,
  payrollDeductions,
  holidays,
  sssBracket,
  semiTax
) => {
  // wages
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

  // all earnings except wages
  let totalDiminimis = 0;
  let totalBonus = 0;
  let totalBereavement = 0;
  let totalEmployeeReferralBonus = 0;
  let totalSeparationPay = 0;
  let totalOtherAllowances = 0;

  // total deduction
  let totalTuition = 0;
  let totalTithes = 0;
  let totalOtherDeduction = 0;
  let totalPagibigLoan = 0;
  let totalPagibigMP2 = 0;
  let totalSSSLoan = 0;
  let deductionAmount = 0;
  let lessItems = 0;
  let tax = 0;
  let netPay = 0;

  // items for earnings and deductions to send to server
  // sss bracket
  let sssAmount = 0;
  // pagibig
  let pagibigAmount = 0;
  // philhealth
  let philAmount = 0;
  // Night differential
  let nightDiffAmount = 0;
  // holiday
  let holidayAmount = 0;

  let payrollList = [];
  let sssList = [];
  let ndList = [];
  let holidayList = [];
  // loop each employee records
  employee.map((emp) => {
    totalBasicPay = Number(emp.payroll_list_employee_salary) / 2;
    // loop each earnings for each employee
    payrollEarnings.map((earning) => {
      // loop earnings wages for each employee
      if (
        earning.earnings_number_of_installment === onetimeNumber && // onetime payment and HRIS import
        emp.payroll_category_type === earning.earnings_payroll_type_id && // payroll type
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
      // diminimis
      // loop earnings every payroll for each employee
      if (
        emp.payroll_list_employee_id === earning.earnings_employee_id && // employee id
        earning.earnings_is_installment === everyPayrollNumber // every payroll
      ) {
        totalDiminimis += payComputeDiminimis(earning);
      }
      // 13th mo & Other benefits
      // loop earnings onetime and installment for each employee
      if (
        emp.payroll_list_employee_id === earning.earnings_employee_id && // employee id
        earning.earnings_is_paid === 0 && // not paid
        (earning.earnings_is_installment === installmentNumber || //installment is = 2
          earning.earnings_is_installment === onetimeNumber) && //onetime payroll is = 1
        earning.earnings_number_of_installment > earning.earnings_num_pay //number of payment
      ) {
        totalBereavement += payComputeBereavement(earning);
        totalBonus += payComputeBunos(earning);
        totalEmployeeReferralBonus += payComputeEmployeeReferralBonus(earning);
        totalSeparationPay += payComputeSeparationPay(earning);
        totalOtherAllowances += payComputeOtherAllowances(earning);
      }
    });

    //  holiday for each employee
    holidayAmount = payComputeHoliday(emp, holidays, payrollEarnings);
    totalHolidayAmount += holidayAmount.finalAmount;
    // night diffirencial
    nightDiffAmount = payComputeNightDiff(emp, holidays, payrollEarnings);
    totalNightDiffAmount += nightDiffAmount.finalAmount;
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

    sssAmount = payComputeSssBracket(emp, sssBracket);
    // pagibigAmount = payComputePagibig(emp, pagibig);
    // philAmount = payComputePhil(emp, philhealth);

    // loop each deductions for each employee
    payrollDeductions.map((deduction) => {
      if (
        emp.payroll_list_employee_id === deduction.deduction_employee_id && // employee id
        deduction.deduction_is_paid === 0 && // not paid
        (deduction.deduction_is_installment === installmentNumber || //installment is = 2
          deduction.deduction_is_installment === onetimeNumber) && //onetime payroll is = 1
        deduction.deduction_number_of_installment > deduction.deduction_num_pay //number of payment
      ) {
        totalTuition += payComputeTuition(deduction);
        totalTithes += payComputeTithes(deduction);
        totalOtherDeduction += payComputeOtherDeduction(deduction);
        totalPagibigLoan += payComputePagibigLoan(deduction);
        totalPagibigMP2 += payComputePagibigMP2(deduction);
        totalSSSLoan += payComputeSSSLoan(deduction);
      }
    });

    // compute tax due
    tax = payComputeTaxDue(emp, grossAmount, semiTax, lessItems);
    // data to send to server
    payrollList.push({
      payroll_list_employee_id: emp.payroll_list_employee_id,
      payroll_list_employee_name: emp.payroll_list_employee_name,
      payroll_list_basic_pay: totalBasicPay.toFixed(2),
      // Wages
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
      // All earnings except wages
      payroll_list_bonus: totalBonus.toFixed(2),
      payroll_list_employee_referral_bonus:
        totalEmployeeReferralBonus.toFixed(2),
      payroll_list_bereavement: totalBereavement.toFixed(2),
      payroll_list_separation_pay: totalSeparationPay.toFixed(2),
      payroll_list_other_allowances: totalOtherAllowances.toFixed(2),
      // Deminimis
      payroll_list_diminimis: totalDiminimis.toFixed(2),
      // Deduction
      payroll_list_fca_tuition: totalTuition.toFixed(2),
      payroll_list_fwc_tithes: totalTithes.toFixed(2),
      payroll_list_other_deduction: totalOtherDeduction.toFixed(2),
      payroll_list_pagibig_loan: totalPagibigLoan.toFixed(2),
      payroll_list_pagibig_mp2: totalPagibigMP2.toFixed(2),
      payroll_list_sss_loan: totalSSSLoan.toFixed(2),
      payroll_list_deduction: 0,

      payroll_list_net_pay: 0,
    });
    // SSS
    sssList.push(...sssAmount.sssList);
    // ND
    ndList.push(...nightDiffAmount.ndList);
    // holiday
    holidayList.push(...holidayAmount.holidayList);

    // console.log({holidayList, });

    // reset wages variables
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
    // reset all earnings except wages
    totalBonus = 0;
    totalBereavement = 0;
    totalEmployeeReferralBonus = 0;
    totalOtherAllowances = 0;
    totalSeparationPay = 0;
    // reset deductions variables
    totalTuition = 0;
    totalTithes = 0;
    totalOtherDeduction = 0;
    totalPagibigLoan = 0;
    totalPagibigMP2 = 0;
    totalSSSLoan = 0;
    // reset variables
    totalDiminimis = 0;
    deductionAmount = 0;
    tax = 0;

    netPay = 0;
  });

  // console.log(payrollList);
  return { payrollList, holidayList, sssList, ndList };
};

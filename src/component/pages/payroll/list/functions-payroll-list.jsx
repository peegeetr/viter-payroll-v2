import {
  everyPayrollNumber,
  installmentNumber,
  onetimeNumber,
} from "../../../helpers/functions-earning-refference";
import { getWorkingDays } from "../../../helpers/functions-general";
import {
  employeeRate,
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
  payComputePagibig,
  payComputePagibigLoan,
  payComputePagibigMP2,
  payComputePhil,
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
  semiTax,
  pagibig,
  philhealth
) => {
  let grossAmount = 0;
  let deductionAmount = 0;
  let netPay = 0;
  let totalBasicPay = 0;
  let totalOtAmount = 0;
  let totalOtHrsAmount = 0;
  let totalOtRateAmount = 0;
  let totalLeaveAmount = 0;
  let totalLeaveHrsAmount = 0;
  let totalLeaveRateAmount = 0;
  let totalHolidayAmount = 0;
  let totalHolidayHrs = 0;
  let totalHolidayRateAmount = 0;
  let totalInflationAmount = 0;
  let totalAdjustmentAmount = 0;
  let totalNightDiffAmount = 0;
  let totalNightDiffHrsAmount = 0;
  let totalNightDiffRateAmount = 0;
  let totalHazardPayAmount = 0;
  let totalAbsencesAmount = 0;
  let totalDiminimis = 0;
  let total13thMoth = 0;
  let totalBonus = 0;
  let totalEmployeeReferralBonus = 0;
  let totalBereavement = 0;
  let totalSeparationPay = 0;
  let totalOtherAllowances = 0;

  let totalSSSLoan = 0;
  let totalPagibigLoan = 0;
  let totalPagibigMP2 = 0;
  let totalTithes = 0;
  let totalTuition = 0;
  let totalOtherDeduction = 0;
  let totalTaxAmount = 0;
  let totalUndertimeAmount = 0;

  let totalBenefits = 0;

  let lessItems = 0;
  let tax = 0;

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
  let totalMadatoryEe = 0;

  let payrollList = [];
  let sssList = [];
  let ndList = [];
  let holidayList = [];
  let pagibigList = [];
  let philhealthList = [];
  // loop each employee records
  employee.map((emp) => {
    const days = getWorkingDays(
      new Date(emp.payroll_start_date),
      new Date(emp.payroll_end_date)
    );
    totalBasicPay = Number(emp.payroll_list_employee_salary) / 2;
    let totalBasicHrs = Number(
      employeeRate(emp.payroll_list_employee_salary, days).hourly
    );
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
    // Total 13th mo & Other benefits
    totalBenefits =
      totalBereavement +
      totalBonus +
      totalEmployeeReferralBonus +
      totalSeparationPay +
      totalOtherAllowances;

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
    pagibigAmount = payComputePagibig(emp, pagibig);
    philAmount = payComputePhil(emp, philhealth);
    // Total madatory deduction ee
    totalMadatoryEe =
      sssAmount.sssEe + pagibigAmount.pagibigEe + philAmount.philhealthEe;

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
    tax = payComputeTaxDue(
      emp,
      grossAmount,
      semiTax,
      totalBenefits,
      totalMadatoryEe
    );

    // data to send to server
    payrollList.push({
      payroll_list_employee_id: emp.payroll_list_employee_id,
      payroll_list_employee_name: emp.payroll_list_employee_name,
      payroll_list_gross: grossAmount.toFixed(2),
      payroll_list_deduction: 0,
      payroll_list_net_pay: 0,
      payroll_list_basic_pay: totalBasicPay.toFixed(2),
      payroll_list_overtime_pay: totalOtAmount.toFixed(2),
      payroll_list_overtime_hrs: 0,
      payroll_list_overtime_rate: 0,
      payroll_list_leave_pay: totalLeaveAmount.toFixed(2),
      payroll_list_leave_hrs: 0,
      payroll_list_leave_rate: 0,
      payroll_list_holiday: totalHolidayAmount.toFixed(2),
      payroll_list_holiday_hrs: 0,
      payroll_list_holiday_rate: 0,
      payroll_list_inlfation_adjustment: totalInflationAmount.toFixed(2),
      payroll_list_adjustment_pay: totalAdjustmentAmount.toFixed(2),
      payroll_list_night_shift_differential: totalNightDiffAmount.toFixed(2),
      payroll_list_nd_hrs: 0,
      payroll_list_nd_rate: 0,
      payroll_list_hazard_pay: totalHazardPayAmount.toFixed(2),
      payroll_list_absences: totalAbsencesAmount.toFixed(2),
      payroll_list_deminimis: totalDiminimis.toFixed(2),
      payroll_list_13th_month: 0,
      payroll_list_bonus: totalBonus.toFixed(2),
      payroll_list_employee_referral_bonus:
        totalEmployeeReferralBonus.toFixed(2),
      payroll_list_bereavement: totalBereavement.toFixed(2),
      payroll_list_separation_pay: totalSeparationPay.toFixed(2),
      payroll_list_other_allowances: totalOtherAllowances.toFixed(2),
      payroll_list_sss_er: sssAmount.sssEr.toFixed(2),
      payroll_list_philhealth_er: philAmount.philhealthEr.toFixed(2),
      payroll_list_pagibig_er: pagibigAmount.pagibigEr.toFixed(2),
      payroll_list_hmo_er: 0,
      payroll_list_sss_ee: sssAmount.sssEe.toFixed(2),
      payroll_list_philhealth_ee: philAmount.philhealthEe.toFixed(2),
      payroll_list_pagibig_ee: pagibigAmount.pagibigEe.toFixed(2),
      payroll_list_hmo_ee: 0,
      payroll_list_sss_loan: totalSSSLoan.toFixed(2),
      payroll_list_pagibig_loan: totalPagibigLoan.toFixed(2),
      payroll_list_pagibig_mp2: totalPagibigMP2.toFixed(2),
      payroll_list_fwc_tithes: totalTithes.toFixed(2),
      payroll_list_fca_tuition: totalTuition.toFixed(2),
      payroll_list_other_deduction: totalOtherDeduction.toFixed(2),
      payroll_list_tax: tax.toFixed(2),
      payroll_list_undertime: totalUndertimeAmount.toFixed(2),
    });
    // SSS
    sssList.push(...sssAmount.sssList);
    // ND
    ndList.push(...nightDiffAmount.ndList);
    // holiday
    holidayList.push(...holidayAmount.holidayList);
    // pagibig
    pagibigList.push(...pagibigAmount.pagibigList);
    // pagibig
    philhealthList.push(...philAmount.philhealthList);

    // console.log({holidayList, });

    // reset wages variables
    grossAmount = 0;
    deductionAmount = 0;
    netPay = 0;
    totalBasicPay = 0;
    totalOtAmount = 0;
    totalOtHrsAmount = 0;
    totalOtRateAmount = 0;
    totalLeaveAmount = 0;
    totalLeaveHrsAmount = 0;
    totalLeaveRateAmount = 0;
    totalHolidayAmount = 0;
    totalHolidayHrs = 0;
    totalHolidayRateAmount = 0;
    totalInflationAmount = 0;
    totalAdjustmentAmount = 0;
    totalNightDiffAmount = 0;
    totalNightDiffHrsAmount = 0;
    totalNightDiffRateAmount = 0;
    totalHazardPayAmount = 0;
    totalAbsencesAmount = 0;
    totalDiminimis = 0;
    total13thMoth = 0;
    totalBonus = 0;
    totalEmployeeReferralBonus = 0;
    totalBereavement = 0;
    totalSeparationPay = 0;
    totalOtherAllowances = 0;

    totalSSSLoan = 0;
    totalPagibigLoan = 0;
    totalPagibigMP2 = 0;
    totalTithes = 0;
    totalTuition = 0;
    totalOtherDeduction = 0;
    totalTaxAmount = 0;
    totalUndertimeAmount = 0;

    totalBenefits = 0;

    lessItems = 0;
    tax = 0;
  });

  // console.log(payrollList);
  return {
    payrollList,
    holidayList,
    sssList,
    ndList,
    pagibigList,
    philhealthList,
  };
};

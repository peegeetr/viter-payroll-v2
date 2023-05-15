import { everyPayrollNumber } from "../../../helpers/functions-earning-refference";
import { bonusId } from "../../../helpers/functions-payitemId";
import {
  payrollCategory13thMonthId,
  payrollCategoryBonusId,
  payrollCategorySalaryId,
} from "../../../helpers/functions-payroll-category-id";
import {
  payComputeCategory13thMonth,
  payComputeAbsences,
  payComputeAdjustment,
  payComputeBereavement,
  payComputeBonus,
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
  payComputeSSSLoan,
  payComputeSeparationPay,
  payComputeSssBracket,
  payComputeTaxDue,
  payComputeTithes,
  payComputeTuition,
  payComputeUndertime,
  payComputeCategoryBonus,
  getNumberOfMonths,
} from "../../../helpers/payroll-formula";

export const runPayroll = (
  employee,
  payrollEarnings,
  payrollDeductions,
  holidays,
  sssBracket,
  semiTax,
  pagibig,
  philhealth,
  category13thMonth,
  categoryId,
  yearlyTax,
  holidayExemptions,
  employeesInstallment
) => {
  let payrollTotalAmount = 0;
  let grossAmount = 0;
  let deductionAmount = 0;
  let netPay = 0;
  let totalBasicPay = 0;
  let totalOtAmount = 0;
  let totalOtHrs = 0;
  let totalLeaveAmount = 0;
  let totalLeaveHrs = 0;
  let totalHolidayAmount = 0;
  let totalHolidayHrs = 0;
  let totalInflationAmount = 0;
  let totalAdjustmentAmount = 0;
  let totalNightDiffAmount = 0;
  let totalNightDiffHrs = 0;
  let totalHazardPayAmount = 0;
  let totalAbsencesAmount = 0;
  let totalAbsencesHrs = 0;
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
  let diminimisAmount = 0;
  let totalMadatoryEe = 0;

  // list of installment
  // earnings
  let bereavementAmount = 0;
  let bereavementList = [];
  let bonusAmount = 0;
  let bonusList = [];
  let employeeReferralBonusAmount = 0;
  let eRBonusList = [];
  let separationPayAmount = 0;
  let separationPayList = [];
  let otherAllowancesAmount = 0;
  let otherAllowancesList = [];
  // list of installment
  // deduction
  let tuitionAmount = 0;
  let tuitionList = [];
  let tithesAmount = 0;
  let tithesList = [];
  let otherDeductionAmount = 0;
  let otherDeductionList = [];
  let pagibigLoanAmount = 0;
  let pagibigLoanList = [];
  let pagibigMP2Amount = 0;
  let pagibigMP2List = [];
  let sSSLoanAmount = 0;
  let sSSLoanList = [];

  let categoryBonus = 0;

  let payrollList = [];
  let taxList = [];
  let sssList = [];
  let ndList = [];
  let holidayList = [];
  let deminimisList = [];
  let pagibigList = [];
  let philhealthList = [];
  let earningsNumInstallmentList = [];
  let deducNumInstallmentList = [];
  let zero = "0.00";

  if (Number(categoryId) === payrollCategory13thMonthId) {
    payrollList = payComputeCategory13thMonth(category13thMonth, yearlyTax);
  }

  if (Number(categoryId) === payrollCategoryBonusId) {
    categoryBonus = payComputeCategoryBonus(employee, payrollEarnings);

    bonusList.push(...categoryBonus.bonusList);
    earningsNumInstallmentList.push(
      ...categoryBonus.earningsNumInstallmentList
    );
    payrollList.push(...categoryBonus.CategoryBonusList);
  }

  // console.log(employeesInstallment);
  if (Number(categoryId) === payrollCategorySalaryId) {
    // loop each employee records
    employee.map((emp) => {
      // loop each earnings for each employee
      payrollEarnings.map((earning) => {
        // loop earnings wages for each employee
        if (
          // earning.earnings_number_of_installment === onetimeNumber && // onetime payment and HRIS import
          emp.payroll_category_type === earning.earnings_payroll_type_id && // payroll type
          emp.payroll_list_payroll_id === earning.earnings_payroll_id && // payroll id
          emp.payroll_list_employee_id === earning.earnings_employee_id && // employee id
          new Date(emp.payroll_end_date) >=
            new Date(earning.earnings_start_pay_date) && // payroll end date
          new Date(emp.payroll_end_date) >=
            new Date(earning.earnings_end_pay_date) // payroll end date
        ) {
          totalOtAmount += payComputeOt(earning).finalAmount;
          totalOtHrs += payComputeOt(earning).otHrs;
          totalLeaveAmount += payComputeLeave(earning).finalAmount;
          totalLeaveHrs += payComputeLeave(earning).leaveHrs;
          totalUndertimeAmount += payComputeUndertime(earning);
          totalAbsencesAmount += payComputeAbsences(earning).finalAmount;
          totalAbsencesHrs += payComputeAbsences(earning).leaveHrs;
          totalHazardPayAmount += payComputeHazardPay(earning);
          totalInflationAmount += payComputeInflationAdjustmen(earning);
          totalAdjustmentAmount += payComputeAdjustment(earning);
        }
        // 13th mo & Other benefits
        // loop earnings onetime and installment for each employee
        if (
          emp.payroll_list_employee_id === earning.earnings_employee_id && // employee id
          earning.earnings_is_paid === 0 && // not paid
          earning.earnings_is_installment !== everyPayrollNumber && //onetime or installment
          earning.earnings_number_of_installment > earning.earnings_num_pay //number of payment
        ) {
          bereavementAmount = payComputeBereavement(emp, earning);
          totalBereavement += bereavementAmount.finalAmount;

          bonusAmount = payComputeBonus(emp, earning);
          totalBonus += bonusAmount.finalAmount;

          employeeReferralBonusAmount = payComputeEmployeeReferralBonus(
            emp,
            earning
          );
          totalEmployeeReferralBonus += employeeReferralBonusAmount.finalAmount;

          separationPayAmount = payComputeSeparationPay(emp, earning);
          totalSeparationPay += separationPayAmount.finalAmount;

          otherAllowancesAmount = payComputeOtherAllowances(emp, earning);
          totalOtherAllowances += otherAllowancesAmount.finalAmount;

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

          // list of installment
          // earnings
          bereavementList.push(...bereavementAmount.bereavementList);
          bonusList.push(...bonusAmount.bonusList);
          eRBonusList.push(...employeeReferralBonusAmount.eRBonusList);
          separationPayList.push(...separationPayAmount.separationPayList);
          otherAllowancesList.push(
            ...otherAllowancesAmount.otherAllowancesList
          );
        }
      });

      diminimisAmount = payComputeDiminimis(emp);
      totalDiminimis = diminimisAmount.finalAmount;

      // Total 13th mo & Other benefits
      totalBenefits =
        totalBereavement +
        totalBonus +
        totalEmployeeReferralBonus +
        totalSeparationPay +
        totalOtherAllowances;

      //  holiday for each employee
      holidayAmount = payComputeHoliday(
        emp,
        holidays,
        payrollEarnings,
        holidayExemptions
      );

      totalHolidayAmount = holidayAmount.accumulatedAmount;
      totalHolidayHrs = holidayAmount.accumulatedHrs;

      // night diffirencial
      nightDiffAmount = payComputeNightDiff(emp, holidays, payrollEarnings);
      totalNightDiffAmount = nightDiffAmount.finalAmount;
      totalNightDiffHrs = nightDiffAmount.totalHrs;
      totalBasicPay = Number(emp.payroll_list_employee_salary) / 2;
      // gross or total wages
      grossAmount =
        totalNightDiffAmount +
        totalHolidayAmount +
        // totalLeaveAmount +
        // totalBasicPay +
        (totalBasicPay -
          (totalAbsencesAmount +
            totalUndertimeAmount +
            holidayAmount.regularAmount)) +
        totalOtAmount +
        totalHazardPayAmount +
        totalInflationAmount +
        totalAdjustmentAmount;
      // totalAbsencesAmount -
      // totalUndertimeAmount;

      sssAmount = payComputeSssBracket(emp, sssBracket);
      pagibigAmount = payComputePagibig(emp, pagibig);
      philAmount = payComputePhil(emp, philhealth);
      // Total madatory deduction ee
      totalMadatoryEe =
        sssAmount.sssEe + pagibigAmount.pagibigEe + philAmount.philhealthEe;

      // loop each deductions for each employee
      console.log("123", employeesInstallment);
      employeesInstallment.map((dInstallment) => {
        if (
          emp.payroll_list_employee_id ===
            dInstallment.employee_installment_employee_id &&
          getNumberOfMonths(dInstallment.employee_installment_start_date) <=
            dInstallment.employee_installment_number_of_months &&
          dInstallment.employee_installment_status === "0"
        ) {
          pagibigLoanAmount = payComputePagibigLoan(emp, dInstallment);
          totalPagibigLoan += pagibigLoanAmount.finalAmount;

          pagibigMP2Amount = payComputePagibigMP2(emp, dInstallment);
          totalPagibigMP2 += pagibigMP2Amount.finalAmount;

          sSSLoanAmount = payComputeSSSLoan(emp, dInstallment);
          totalSSSLoan += sSSLoanAmount.finalAmount;

          pagibigLoanList.push(...pagibigLoanAmount.pagibigLoanList);
          pagibigMP2List.push(...pagibigMP2Amount.pagibigMP2List);
          sSSLoanList.push(...sSSLoanAmount.sSSLoanList);
        }
      });
      payrollDeductions.map((deduction) => {
        if (
          emp.payroll_list_employee_id === deduction.deduction_employee_id && // employee id
          deduction.deduction_is_paid === 0 && // not paid
          deduction.deduction_is_installment !== everyPayrollNumber && //onetime or installment
          deduction.deduction_number_of_installment >
            deduction.deduction_num_pay //number of payment
        ) {
          tuitionAmount = payComputeTuition(emp, deduction);
          totalTuition += tuitionAmount.finalAmount;

          tithesAmount = payComputeTithes(emp, deduction);
          totalTithes += tithesAmount.finalAmount;

          otherDeductionAmount = payComputeOtherDeduction(emp, deduction);
          totalOtherDeduction += otherDeductionAmount.finalAmount;

          // pagibigLoanAmount = payComputePagibigLoan(emp, deduction);
          // totalPagibigLoan += pagibigLoanAmount.finalAmount;

          // pagibigMP2Amount = payComputePagibigMP2(emp, deduction);
          // totalPagibigMP2 += pagibigMP2Amount.finalAmount;

          // sSSLoanAmount = payComputeSSSLoan(emp, deduction);
          // totalSSSLoan += sSSLoanAmount.finalAmount;

          // for updating number of pay if installment or one time
          deducNumInstallmentList.push({
            deduction_num_pay: deduction.deduction_num_pay + 1,
            deduction_is_paid:
              deduction.deduction_num_pay + 1 ===
              deduction.deduction_number_of_installment
                ? 1
                : 0,
            deduction_employee_id: emp.payroll_list_employee_id,
            deduction_payitem_id: deduction.deduction_payitem_id,
          });

          // list of installment
          // deduction
          tuitionList.push(...tuitionAmount.tuitionList);
          tithesList.push(...tithesAmount.tithesList);
          otherDeductionList.push(...otherDeductionAmount.otherDeductionList);
          // pagibigLoanList.push(...pagibigLoanAmount.pagibigLoanList);
          // pagibigMP2List.push(...pagibigMP2Amount.pagibigMP2List);
          // sSSLoanList.push(...sSSLoanAmount.sSSLoanList);
        }
        // console.log("tuitionList", tuitionAmount.tuitionList);
      });

      // compute tax due
      tax = payComputeTaxDue(
        emp,
        grossAmount,
        semiTax,
        totalBenefits,
        totalMadatoryEe,
        totalDiminimis
      );
      totalTaxAmount = Number(tax.taxDue.toFixed(2));
      deductionAmount =
        totalTaxAmount +
        totalMadatoryEe +
        totalTuition +
        totalTithes +
        totalOtherDeduction +
        totalPagibigLoan +
        totalPagibigMP2 +
        totalSSSLoan;

      netPay = grossAmount + totalBenefits - deductionAmount;
      payrollTotalAmount += netPay;
      // console.log(totalAdjustmentAmount);
      // data to send to server
      payrollList.push({
        payroll_category: payrollCategorySalaryId,
        payroll_list_employee_id: emp.payroll_list_employee_id,
        payroll_list_employee_name: emp.payroll_list_employee_name,
        payroll_list_gross: grossAmount.toFixed(2),
        payroll_list_deduction: deductionAmount.toFixed(2),
        payroll_list_net_pay: netPay.toFixed(2),
        payroll_list_basic_pay: totalBasicPay.toFixed(2),
        payroll_list_overtime_pay: totalOtAmount.toFixed(2),
        payroll_list_overtime_hrs: totalOtHrs.toFixed(4),
        payroll_list_leave_pay: totalLeaveAmount.toFixed(2),
        payroll_list_leave_hrs: totalLeaveHrs,
        payroll_list_holiday: totalHolidayAmount.toFixed(2),
        payroll_list_holiday_hrs: totalHolidayHrs,
        payroll_list_inlfation_adjustment: totalInflationAmount.toFixed(2),
        payroll_list_adjustment_pay: totalAdjustmentAmount.toFixed(2),
        payroll_list_night_shift_differential: totalNightDiffAmount.toFixed(2),
        payroll_list_nd_hrs: totalNightDiffHrs.toFixed(2),
        payroll_list_hazard_pay: totalHazardPayAmount.toFixed(2),
        payroll_list_absences: totalAbsencesAmount.toFixed(2),
        payroll_list_absences_hrs: totalAbsencesHrs,
        payroll_list_deminimis: totalDiminimis,
        payroll_list_13th_month: zero,
        payroll_list_bonus: totalBonus.toFixed(2),
        payroll_list_employee_referral_bonus:
          totalEmployeeReferralBonus.toFixed(2),
        payroll_list_bereavement: totalBereavement.toFixed(2),
        payroll_list_separation_pay: totalSeparationPay.toFixed(2),
        payroll_list_other_allowances: totalOtherAllowances.toFixed(2),
        payroll_list_total_benefits: totalBenefits.toFixed(2),
        payroll_list_sss_er: sssAmount.sssEr.toFixed(2),
        payroll_list_philhealth_er: philAmount.philhealthEr.toFixed(2),
        payroll_list_pagibig_er: pagibigAmount.pagibigEr.toFixed(2),
        payroll_list_hmo_er: zero,
        payroll_list_sss_ee: sssAmount.sssEe.toFixed(2),
        payroll_list_philhealth_ee: philAmount.philhealthEe.toFixed(2),
        payroll_list_pagibig_ee: pagibigAmount.pagibigEe.toFixed(2),
        payroll_list_hmo_ee: zero,
        payroll_list_sss_loan: totalSSSLoan.toFixed(2),
        payroll_list_pagibig_loan: totalPagibigLoan.toFixed(2),
        payroll_list_pagibig_mp2: totalPagibigMP2.toFixed(2),
        payroll_list_fwc_tithes: totalTithes.toFixed(2),
        payroll_list_fca_tuition: totalTuition.toFixed(2),
        payroll_list_other_deduction: totalOtherDeduction.toFixed(2),
        payroll_list_madatory_ee: totalMadatoryEe.toFixed(2),
        payroll_list_tax: totalTaxAmount.toFixed(2),
        payroll_list_undertime: totalUndertimeAmount.toFixed(2),
        payrollTotalAmount: payrollTotalAmount.toFixed(2),
      });

      // tax List
      taxList.push(...tax.taxList);
      // SSS List
      sssList.push(...sssAmount.sssList);
      // pagibig List
      pagibigList.push(...pagibigAmount.pagibigList);
      // pagibig List
      philhealthList.push(...philAmount.philhealthList);
      // ND List
      ndList.push(...nightDiffAmount.ndList);
      // holiday List
      holidayList.push(...holidayAmount.holidayList);
      // deminimis List
      deminimisList.push(...diminimisAmount.deminimisList);

      // reset wages variables
      grossAmount = 0;
      deductionAmount = 0;
      netPay = 0;
      totalBasicPay = 0;
      totalOtAmount = 0;
      totalOtHrs = 0;
      totalLeaveAmount = 0;
      totalLeaveHrs = 0;
      totalHolidayAmount = 0;
      totalHolidayHrs = 0;
      totalInflationAmount = 0;
      totalAdjustmentAmount = 0;
      totalNightDiffAmount = 0;
      totalHazardPayAmount = 0;
      totalAbsencesAmount = 0;
      totalAbsencesHrs = 0;
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
  }

  return {
    payrollList,
    holidayList,
    sssList,
    ndList,
    pagibigList,
    philhealthList,
    taxList,
    deminimisList,
    bereavementList,
    bonusList,
    eRBonusList,
    separationPayList,
    otherAllowancesList,
    tuitionList,
    tithesList,
    otherDeductionList,
    pagibigLoanList,
    pagibigMP2List,
    sSSLoanList,
    earningsNumInstallmentList,
    deducNumInstallmentList,
  };
};

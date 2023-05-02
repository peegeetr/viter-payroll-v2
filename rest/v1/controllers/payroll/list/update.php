<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payrollList = new PayrollList($conn);
$response = new Response();
// get $_GET data
// check if listpayrollid is in the url e.g. /listpayrollid/1
$error = [];
$returnData = [];
if (array_key_exists("listpayrollid", $_GET)) {
    // check data
    checkPayload($data);
    // get data

    $payrollList->payroll_list_payroll_id = $_GET['listpayrollid'];
    $payrollList->created = date("Y-m-d H:i:s");
    $payrollList->payroll_list_datetime = date("Y-m-d H:i:s");

    //check to see if payroll id (PR-001) in query string is not empty and less than 50 chars
    checkKeyword($payrollList->payroll_list_payroll_id);

    // payroll run
    $allPayrollPayList = $data["payrollPayList"];
    $allHolidayList = $data["holidayList"];
    $allNdList = $data["ndList"];
    $allSssList = $data["sssList"];
    $allPagibigList = $data["pagibigList"];
    $allPhilhealthList = $data["philhealthList"];
    $allTaxList = $data["taxList"];
    $allDeminimis = $data["deminimisList"];

    $categoryBunosId = $data["categoryBunosId"];

    // installment 
    // list of installment Earnings 
    $allBereavementList = $data["bereavementList"];
    $allBonusList = $data["bonusList"];
    $allERBonusList = $data["eRBonusList"];
    $allSeparationPayList = $data["separationPayList"];
    $allOtherAllowancesList = $data["otherAllowancesList"];

    // list of installment Deductions 
    $allTuitionList = $data["tuitionList"];
    $allTithesList = $data["tithesList"];
    $allOtherDeductionList = $data["otherDeductionList"];
    $allPagibigLoanList = $data["pagibigLoanList"];
    $allPagibigMP2List = $data["pagibigMP2List"];
    $allSSSLoanList = $data["sSSLoanList"];
    $payroll_category = null;
    $payrollTotalAmount = 0;

    // update payroll list
    for ($pl = 0; $pl < count($allPayrollPayList); $pl++) {
        $payroll_category = $allPayrollPayList[$pl]["payroll_category"];
        $payrollList->payroll_list_employee_id = $allPayrollPayList[$pl]["payroll_list_employee_id"];
        $payrollList->payroll_list_deduction = $allPayrollPayList[$pl]["payroll_list_deduction"];
        $payrollList->payroll_list_gross =  $allPayrollPayList[$pl]["payroll_list_gross"];
        $payrollList->payroll_list_net_pay =  $allPayrollPayList[$pl]["payroll_list_net_pay"];
        $payrollList->payroll_list_basic_pay =  $allPayrollPayList[$pl]["payroll_list_basic_pay"];
        $payrollList->payroll_list_overtime_pay =  $allPayrollPayList[$pl]["payroll_list_overtime_pay"];
        $payrollList->payroll_list_overtime_hrs =  $allPayrollPayList[$pl]["payroll_list_overtime_hrs"];
        $payrollList->payroll_list_leave_pay =  $allPayrollPayList[$pl]["payroll_list_leave_pay"];
        $payrollList->payroll_list_leave_hrs =  $allPayrollPayList[$pl]["payroll_list_leave_hrs"];
        $payrollList->payroll_list_holiday =  $allPayrollPayList[$pl]["payroll_list_holiday"];
        $payrollList->payroll_list_holiday_hrs =  $allPayrollPayList[$pl]["payroll_list_holiday_hrs"];
        $payrollList->payroll_list_inlfation_adjustment =  $allPayrollPayList[$pl]["payroll_list_inlfation_adjustment"];
        $payrollList->payroll_list_adjustment_pay =  $allPayrollPayList[$pl]["payroll_list_adjustment_pay"];
        $payrollList->payroll_list_night_shift_differential = $allPayrollPayList[$pl]["payroll_list_night_shift_differential"];
        $payrollList->payroll_list_nd_hrs = $allPayrollPayList[$pl]["payroll_list_nd_hrs"];
        $payrollList->payroll_list_hazard_pay = $allPayrollPayList[$pl]["payroll_list_hazard_pay"];
        $payrollList->payroll_list_absences = $allPayrollPayList[$pl]["payroll_list_absences"];
        $payrollList->payroll_list_absences_hrs = $allPayrollPayList[$pl]["payroll_list_absences_hrs"];
        $payrollList->payroll_list_13th_month = $allPayrollPayList[$pl]["payroll_list_13th_month"];
        $payrollList->payroll_list_bonus = $allPayrollPayList[$pl]["payroll_list_bonus"];
        $payrollList->payroll_list_employee_referral_bonus = $allPayrollPayList[$pl]["payroll_list_employee_referral_bonus"];
        $payrollList->payroll_list_bereavement = $allPayrollPayList[$pl]["payroll_list_bereavement"];
        $payrollList->payroll_list_separation_pay = $allPayrollPayList[$pl]["payroll_list_separation_pay"];
        $payrollList->payroll_list_other_allowances = $allPayrollPayList[$pl]["payroll_list_other_allowances"];
        $payrollList->payroll_list_total_benefits = $allPayrollPayList[$pl]["payroll_list_total_benefits"];
        $payrollList->payroll_list_sss_er = $allPayrollPayList[$pl]["payroll_list_sss_er"];
        $payrollList->payroll_list_philhealth_er = $allPayrollPayList[$pl]["payroll_list_philhealth_er"];
        $payrollList->payroll_list_pagibig_er = $allPayrollPayList[$pl]["payroll_list_pagibig_er"];
        $payrollList->payroll_list_hmo_er = $allPayrollPayList[$pl]["payroll_list_hmo_er"];
        $payrollList->payroll_list_sss_ee = $allPayrollPayList[$pl]["payroll_list_sss_ee"];
        $payrollList->payroll_list_philhealth_ee = $allPayrollPayList[$pl]["payroll_list_philhealth_ee"];
        $payrollList->payroll_list_pagibig_ee = $allPayrollPayList[$pl]["payroll_list_pagibig_ee"];
        $payrollList->payroll_list_hmo_ee = $allPayrollPayList[$pl]["payroll_list_hmo_ee"];
        $payrollList->payroll_list_sss_loan = $allPayrollPayList[$pl]["payroll_list_sss_loan"];
        $payrollList->payroll_list_pagibig_loan = $allPayrollPayList[$pl]["payroll_list_pagibig_loan"];
        $payrollList->payroll_list_pagibig_mp2 = $allPayrollPayList[$pl]["payroll_list_pagibig_mp2"];
        $payrollList->payroll_list_fwc_tithes = $allPayrollPayList[$pl]["payroll_list_fwc_tithes"];
        $payrollList->payroll_list_fca_tuition = $allPayrollPayList[$pl]["payroll_list_fca_tuition"];
        $payrollList->payroll_list_other_deduction = $allPayrollPayList[$pl]["payroll_list_other_deduction"];
        $payrollList->payroll_list_madatory_ee = $allPayrollPayList[$pl]["payroll_list_madatory_ee"];
        $payrollList->payroll_list_undertime = $allPayrollPayList[$pl]["payroll_list_undertime"];
        $payrollList->payroll_list_tax = $allPayrollPayList[$pl]["payroll_list_tax"];
        $payrollTotalAmount = $allPayrollPayList[$pl]["payrollTotalAmount"];
        $query = checkUpdate($payrollList);
    }

    // delete employee without bonus based on prid
    if ($payroll_category === $categoryBunosId) {
        checkDeleteDontHaveBonusPayrollList($payrollList);
    }

    // delete earning first existing PR ID and pay item id de Minimis
    $payrollList->payitem_id = $data["payItemDeminimisId"];
    checkId($payrollList->payitem_id);
    checkDeleteNotInstallmentEarnings($payrollList);
    if (count($allDeminimis) > 0) {
        for ($d = 0; $d < count($allDeminimis); $d++) {
            $payrollList->payroll_type_id = $allDeminimis[$d]["earnings_payroll_type_id"];
            $payrollList->num_pay = 1;
            $payrollList->payroll_list_employee_name = $allDeminimis[$d]["earnings_employee"];
            $payrollList->payroll_list_employee_id = $allDeminimis[$d]["earnings_employee_id"];
            $payrollList->paytype_id = $allDeminimis[$d]["earnings_paytype_id"];
            $payrollList->payitem_id = $allDeminimis[$d]["earnings_payitem_id"];
            $payrollList->amount = $allDeminimis[$d]["earnings_amount"];
            $payrollList->frequency = $allDeminimis[$d]["earnings_frequency"];
            $payrollList->is_installment = $allDeminimis[$d]["earnings_is_installment"];
            $payrollList->number_of_installment = $allDeminimis[$d]["earnings_number_of_installment"];
            $payrollList->start_pay_date = $allDeminimis[$d]["earnings_start_pay_date"];
            $payrollList->end_pay_date = $allDeminimis[$d]["earnings_end_pay_date"];
            $payrollList->details = $allDeminimis[$d]["earnings_details"];
            $payrollList->hris_date = "";
            $payrollList->earnings_rate = "";
            $payrollList->earnings_hrs = "";
            $payrollList->installment_extra = "0";
            $query = checkCreateEarnings($payrollList);
        }
    }

    // delete earning first existing PR ID and pay item id holiday
    $payrollList->payitem_id = $data["payItemHolidayId"];
    checkId($payrollList->payitem_id);
    checkDeleteNotInstallmentEarnings($payrollList);
    if (count($allHolidayList) > 0) {
        for ($h = 0; $h < count($allHolidayList); $h++) {
            $payrollList->payroll_type_id = $allHolidayList[$h]["earnings_payroll_type_id"];
            $payrollList->num_pay = 1;
            $payrollList->payroll_list_employee_name = $allHolidayList[$h]["earnings_employee"];
            $payrollList->payroll_list_employee_id = $allHolidayList[$h]["earnings_employee_id"];
            $payrollList->paytype_id = $allHolidayList[$h]["earnings_paytype_id"];
            $payrollList->payitem_id = $allHolidayList[$h]["earnings_payitem_id"];
            $payrollList->amount = $allHolidayList[$h]["earnings_amount"];
            $payrollList->details = $allHolidayList[$h]["earnings_details"];
            $payrollList->frequency = $allHolidayList[$h]["earnings_frequency"];
            $payrollList->is_installment = $allHolidayList[$h]["earnings_is_installment"];
            $payrollList->number_of_installment = $allHolidayList[$h]["earnings_number_of_installment"];
            $payrollList->start_pay_date = $allHolidayList[$h]["earnings_start_pay_date"];
            $payrollList->end_pay_date = $allHolidayList[$h]["earnings_end_pay_date"];
            $payrollList->hris_date = $allHolidayList[$h]["earnings_hris_date"];
            $payrollList->earnings_rate = $allHolidayList[$h]["earnings_rate"];
            $payrollList->earnings_hrs = $allHolidayList[$h]["earnings_hrs"];
            $payrollList->installment_extra = "0";
            $query = checkCreateEarnings($payrollList);
        }
    }

    // delete earning first existing PR ID and pay item id night diff
    $payrollList->payitem_id = $data["payItemNightDiffId"];
    checkId($payrollList->payitem_id);
    checkDeleteNotInstallmentEarnings($payrollList);
    if (count($allNdList) > 0) {
        for ($nd = 0; $nd < count($allNdList); $nd++) {
            $payrollList->payroll_type_id = $allNdList[$nd]["earnings_payroll_type_id"];
            $payrollList->num_pay = 1;
            $payrollList->payroll_list_employee_name = $allNdList[$nd]["earnings_employee"];
            $payrollList->payroll_list_employee_id = $allNdList[$nd]["earnings_employee_id"];
            $payrollList->paytype_id = $allNdList[$nd]["earnings_paytype_id"];
            $payrollList->payitem_id = $allNdList[$nd]["earnings_payitem_id"];
            $payrollList->amount = $allNdList[$nd]["earnings_amount"];
            $payrollList->details = $allNdList[$nd]["earnings_details"];
            $payrollList->frequency = $allNdList[$nd]["earnings_frequency"];
            $payrollList->is_installment = $allNdList[$nd]["earnings_is_installment"];
            $payrollList->number_of_installment = $allNdList[$nd]["earnings_number_of_installment"];
            $payrollList->start_pay_date = $allNdList[$nd]["earnings_start_pay_date"];
            $payrollList->end_pay_date = $allNdList[$nd]["earnings_end_pay_date"];
            $payrollList->hris_date = "";
            $payrollList->earnings_rate = $allNdList[$nd]["earnings_rate"];
            $payrollList->earnings_hrs = $allNdList[$nd]["earnings_hrs"];
            $payrollList->installment_extra = "0";
            $query = checkCreateEarnings($payrollList);
        }
    }

    // delete earning first existing PR ID and pay item id SSS ER
    $payrollList->payitem_id = $data["payItemSssErId"];
    checkId($payrollList->payitem_id);
    checkDeleteNotInstallmentEarnings($payrollList);

    // delete deduction first PR ID and pay item id SSS EE
    $payrollList->deduction_payitem_id = $data["payItemNSssEeId"];
    checkId($payrollList->deduction_payitem_id);
    checkDeleteNotInstallmentDeductions($payrollList);

    // earnings sss EE and deductions sss ER
    if (count($allSssList) > 0) {
        for ($sss = 0; $sss < count($allSssList); $sss++) {
            $payrollList->payroll_type_id = $allSssList[$sss]["earnings_payroll_type_id"];
            $payrollList->num_pay = 1;
            $payrollList->payroll_list_employee_name = $allSssList[$sss]["earnings_employee"];
            $payrollList->payroll_list_employee_id = $allSssList[$sss]["earnings_employee_id"];
            $payrollList->deduction_paytype_id = $allSssList[$sss]["deduction_paytype_id"];
            $payrollList->paytype_id = $allSssList[$sss]["earnings_paytype_id"];
            $payrollList->payitem_id = $allSssList[$sss]["earnings_payitem_id"];
            $payrollList->amount = $allSssList[$sss]["earnings_amount"];
            $payrollList->deduction_payitem_id = $allSssList[$sss]["deduction_payitem_id"];
            $payrollList->deduction_amount = $allSssList[$sss]["deduction_amount"];
            $payrollList->details = $allSssList[$sss]["earnings_details"];
            $payrollList->deduction_details = $allSssList[$sss]["deduction_details"];
            $payrollList->frequency = $allSssList[$sss]["earnings_frequency"];
            $payrollList->is_installment = $allSssList[$sss]["earnings_is_installment"];
            $payrollList->number_of_installment = $allSssList[$sss]["earnings_number_of_installment"];
            $payrollList->start_pay_date = $allSssList[$sss]["earnings_start_pay_date"];
            $payrollList->end_pay_date = $allSssList[$sss]["earnings_end_pay_date"];
            $payrollList->hris_date = "";
            $payrollList->earnings_rate = "";
            $payrollList->earnings_hrs = "";
            $payrollList->installment_extra = "0";
            $query = checkCreateEarnings($payrollList);
            $query = checkCreateDeductions($payrollList);
        }
    }

    // delete earning first existing PR ID and pay item id pagibig ER
    $payrollList->payitem_id = $data["payItemPagibigErId"];
    checkId($payrollList->payitem_id);
    checkDeleteNotInstallmentEarnings($payrollList);

    // delete deduction firstPR ID and pay item id pagibig EE
    $payrollList->deduction_payitem_id = $data["payItemPagibigEeId"];
    checkId($payrollList->deduction_payitem_id);
    checkDeleteNotInstallmentDeductions($payrollList);
    // earnings Pagibig EE and deductions Pagibig ER
    if (count($allPagibigList) > 0) {
        for ($pgbg = 0; $pgbg < count($allPagibigList); $pgbg++) {
            $payrollList->payroll_type_id = $allPagibigList[$pgbg]["earnings_payroll_type_id"];
            $payrollList->num_pay = 1;
            $payrollList->payroll_list_employee_name = $allPagibigList[$pgbg]["earnings_employee"];
            $payrollList->payroll_list_employee_id = $allPagibigList[$pgbg]["earnings_employee_id"];
            $payrollList->deduction_paytype_id = $allPagibigList[$pgbg]["deduction_paytype_id"];
            $payrollList->paytype_id = $allPagibigList[$pgbg]["earnings_paytype_id"];
            $payrollList->payitem_id = $allPagibigList[$pgbg]["earnings_payitem_id"];
            $payrollList->amount = $allPagibigList[$pgbg]["earnings_amount"];
            $payrollList->deduction_payitem_id = $allPagibigList[$pgbg]["deduction_payitem_id"];
            $payrollList->deduction_amount = $allPagibigList[$pgbg]["deduction_amount"];
            $payrollList->details = $allPagibigList[$pgbg]["earnings_details"];
            $payrollList->deduction_details = $allPagibigList[$pgbg]["deduction_details"];
            $payrollList->frequency = $allPagibigList[$pgbg]["earnings_frequency"];
            $payrollList->is_installment = $allPagibigList[$pgbg]["earnings_is_installment"];
            $payrollList->number_of_installment = $allPagibigList[$pgbg]["earnings_number_of_installment"];
            $payrollList->start_pay_date = $allPagibigList[$pgbg]["earnings_start_pay_date"];
            $payrollList->end_pay_date = $allPagibigList[$pgbg]["earnings_end_pay_date"];
            $payrollList->hris_date = "";
            $payrollList->earnings_rate = "";
            $payrollList->earnings_hrs = "";
            $payrollList->installment_extra = "0";
            $query = checkCreateEarnings($payrollList);
            $query = checkCreateDeductions($payrollList);
        }
    }

    // delete earning first existing PR ID and pay item id phic ER
    $payrollList->payitem_id = $data["payItemPhilhealthErId"];
    checkId($payrollList->payitem_id);
    checkDeleteNotInstallmentEarnings($payrollList);

    // delete deduction first PR ID and pay item id phic EE
    $payrollList->deduction_payitem_id = $data["payItemPhilhealthEeId"];
    checkId($payrollList->deduction_payitem_id);
    checkDeleteNotInstallmentDeductions($payrollList);
    // earnings Phil EE and deductions Phil ER
    if (count($allPhilhealthList) > 0) {
        for ($phil = 0; $phil < count($allPhilhealthList); $phil++) {
            $payrollList->payroll_type_id = $allPhilhealthList[$phil]["earnings_payroll_type_id"];
            $payrollList->num_pay = 1;
            $payrollList->payroll_list_employee_name = $allPhilhealthList[$phil]["earnings_employee"];
            $payrollList->payroll_list_employee_id = $allPhilhealthList[$phil]["earnings_employee_id"];
            $payrollList->deduction_paytype_id = $allPhilhealthList[$phil]["deduction_paytype_id"];
            $payrollList->paytype_id = $allPhilhealthList[$phil]["earnings_paytype_id"];
            $payrollList->payitem_id = $allPhilhealthList[$phil]["earnings_payitem_id"];
            $payrollList->amount = $allPhilhealthList[$phil]["earnings_amount"];
            $payrollList->deduction_payitem_id = $allPhilhealthList[$phil]["deduction_payitem_id"];
            $payrollList->deduction_amount = $allPhilhealthList[$phil]["deduction_amount"];
            $payrollList->details = $allPhilhealthList[$phil]["earnings_details"];
            $payrollList->deduction_details = $allPhilhealthList[$phil]["deduction_details"];
            $payrollList->frequency = $allPhilhealthList[$phil]["earnings_frequency"];
            $payrollList->is_installment = $allPhilhealthList[$phil]["earnings_is_installment"];
            $payrollList->number_of_installment = $allPhilhealthList[$phil]["earnings_number_of_installment"];
            $payrollList->start_pay_date = $allPhilhealthList[$phil]["earnings_start_pay_date"];
            $payrollList->end_pay_date = $allPhilhealthList[$phil]["earnings_end_pay_date"];
            $payrollList->hris_date = "";
            $payrollList->earnings_rate = "";
            $payrollList->earnings_hrs = "";
            $payrollList->installment_extra = "0";
            $query = checkCreateEarnings($payrollList);
            $query = checkCreateDeductions($payrollList);
        }
    }
    // delete deduction first PR ID and pay item id tax
    $payrollList->deduction_payitem_id = $data["payItemTaxId"];
    checkId($payrollList->deduction_payitem_id);
    checkDeleteNotInstallmentDeductions($payrollList);
    if (count($allTaxList) > 0) {
        for ($tax = 0; $tax < count($allTaxList); $tax++) {
            $payrollList->payroll_type_id = $allTaxList[$tax]["deduction_payroll_type_id"];
            $payrollList->num_pay = 1;
            $payrollList->payroll_list_employee_name = $allTaxList[$tax]["deduction_employee"];
            $payrollList->payroll_list_employee_id = $allTaxList[$tax]["deduction_employee_id"];
            $payrollList->deduction_paytype_id = $allTaxList[$tax]["deduction_paytype_id"];
            $payrollList->deduction_payitem_id = $allTaxList[$tax]["deduction_payitem_id"];
            $payrollList->deduction_amount = $allTaxList[$tax]["deduction_amount"];
            $payrollList->deduction_details = $allTaxList[$tax]["deduction_details"];
            $payrollList->frequency = $allTaxList[$tax]["deduction_frequency"];
            $payrollList->is_installment = $allTaxList[$tax]["deduction_is_installment"];
            $payrollList->number_of_installment = $allTaxList[$tax]["deduction_number_of_installment"];
            $payrollList->start_pay_date = $allTaxList[$tax]["deduction_start_pay_date"];
            $payrollList->end_pay_date = $allTaxList[$tax]["deduction_end_pay_date"];
            $payrollList->hris_date = "";
            $payrollList->earnings_rate = "";
            $payrollList->earnings_hrs = "";
            $payrollList->installment_extra = "0";
            $query = checkCreateDeductions($payrollList);
        }
    }

    // installment
    // list of installment  Earnings 
    // berevements 
    if (count($allBereavementList) > 0) {

        for ($be = 0; $be < count($allBereavementList); $be++) {
            if ($allBereavementList[$be]["installment_extra"] === 1) {
                $payrollList->payroll_type_id = $allBereavementList[$be]["earnings_payroll_type_id"];
                $payrollList->num_pay = 1;
                $payrollList->payroll_list_employee_name = $allBereavementList[$be]["earnings_employee"];
                $payrollList->payroll_list_employee_id = $allBereavementList[$be]["earnings_employee_id"];
                $payrollList->paytype_id = $allBereavementList[$be]["earnings_paytype_id"];
                $payrollList->payitem_id = $allBereavementList[$be]["earnings_payitem_id"];
                $payrollList->amount = $allBereavementList[$be]["earnings_amount"];
                $payrollList->frequency = $allBereavementList[$be]["earnings_frequency"];
                $payrollList->is_installment = $allBereavementList[$be]["earnings_is_installment"];
                $payrollList->number_of_installment = $allBereavementList[$be]["earnings_number_of_installment"];
                $payrollList->start_pay_date = $allBereavementList[$be]["earnings_start_pay_date"];
                $payrollList->end_pay_date = $allBereavementList[$be]["earnings_end_pay_date"];
                $payrollList->details = $allBereavementList[$be]["earnings_details"];
                $payrollList->installment_extra = $allBereavementList[$be]["installment_extra"];
                $payrollList->hris_date = "";
                $payrollList->earnings_rate = "";
                $payrollList->earnings_hrs = "";
                // delete first existing PR ID and pay item id pagibig ER 
                checkDeleteNotInstallmentEarningsByEmpId($payrollList);
                // create extra 
                $query = checkCreateEarnings($payrollList);
            }
        }
    }

    // list of installment  Earnings 
    // bonus
    if (count($allBonusList) > 0) {
        for ($bonus = 0; $bonus < count($allBonusList); $bonus++) {
            if ($allBonusList[$bonus]["installment_extra"] === 1) {
                $payrollList->payroll_type_id = $allBonusList[$bonus]["earnings_payroll_type_id"];
                $payrollList->num_pay = 1;
                $payrollList->payroll_list_employee_name = $allBonusList[$bonus]["earnings_employee"];
                $payrollList->payroll_list_employee_id = $allBonusList[$bonus]["earnings_employee_id"];
                $payrollList->paytype_id = $allBonusList[$bonus]["earnings_paytype_id"];
                $payrollList->payitem_id = $allBonusList[$bonus]["earnings_payitem_id"];
                $payrollList->amount = $allBonusList[$bonus]["earnings_amount"];
                $payrollList->frequency = $allBonusList[$bonus]["earnings_frequency"];
                $payrollList->is_installment = $allBonusList[$bonus]["earnings_is_installment"];
                $payrollList->number_of_installment = $allBonusList[$bonus]["earnings_number_of_installment"];
                $payrollList->start_pay_date = $allBonusList[$bonus]["earnings_start_pay_date"];
                $payrollList->end_pay_date = $allBonusList[$bonus]["earnings_end_pay_date"];
                $payrollList->details = $allBonusList[$bonus]["earnings_details"];
                $payrollList->installment_extra = $allBonusList[$bonus]["installment_extra"];
                $payrollList->hris_date = "";
                $payrollList->earnings_rate = "";
                $payrollList->earnings_hrs = "";
                // delete first existing PR ID and pay item id pagibig ER 
                checkDeleteNotInstallmentEarningsByEmpId($payrollList);
                // create extra 
                $query = checkCreateEarnings($payrollList);
            }
        }
    }

    // list of installment Earnings 
    // Employee Referal  
    if (count($allERBonusList) > 0) {
        for ($erb = 0; $erb < count($allERBonusList); $erb++) {
            if ($allERBonusList[$erb]["installment_extra"] === 1) {
                $payrollList->payroll_type_id = $allERBonusList[$erb]["earnings_payroll_type_id"];
                $payrollList->num_pay = 1;
                $payrollList->payroll_list_employee_name = $allERBonusList[$erb]["earnings_employee"];
                $payrollList->payroll_list_employee_id = $allERBonusList[$erb]["earnings_employee_id"];
                $payrollList->paytype_id = $allERBonusList[$erb]["earnings_paytype_id"];
                $payrollList->payitem_id = $allERBonusList[$erb]["earnings_payitem_id"];
                $payrollList->amount = $allERBonusList[$erb]["earnings_amount"];
                $payrollList->frequency = $allERBonusList[$erb]["earnings_frequency"];
                $payrollList->is_installment = $allERBonusList[$erb]["earnings_is_installment"];
                $payrollList->number_of_installment = $allERBonusList[$erb]["earnings_number_of_installment"];
                $payrollList->start_pay_date = $allERBonusList[$erb]["earnings_start_pay_date"];
                $payrollList->end_pay_date = $allERBonusList[$erb]["earnings_end_pay_date"];
                $payrollList->details = $allERBonusList[$erb]["earnings_details"];
                $payrollList->installment_extra = $allERBonusList[$erb]["installment_extra"];
                $payrollList->hris_date = "";
                $payrollList->earnings_rate = "";
                $payrollList->earnings_hrs = "";
                // delete first existing PR ID and pay item id pagibig ER 
                checkDeleteNotInstallmentEarningsByEmpId($payrollList);
                // create extra 
                $query = checkCreateEarnings($payrollList);
            }
        }
    }

    // list of installment Earnings  
    // Separation Pay  
    if (count($allSeparationPayList) > 0) {
        for ($sp = 0; $sp < count($allSeparationPayList); $sp++) {
            if ($allSeparationPayList[$sp]["installment_extra"] === 1) {
                $payrollList->payroll_type_id = $allSeparationPayList[$sp]["earnings_payroll_type_id"];
                $payrollList->num_pay = 1;
                $payrollList->payroll_list_employee_name = $allSeparationPayList[$sp]["earnings_employee"];
                $payrollList->payroll_list_employee_id = $allSeparationPayList[$sp]["earnings_employee_id"];
                $payrollList->paytype_id = $allSeparationPayList[$sp]["earnings_paytype_id"];
                $payrollList->payitem_id = $allSeparationPayList[$sp]["earnings_payitem_id"];
                $payrollList->amount = $allSeparationPayList[$sp]["earnings_amount"];
                $payrollList->frequency = $allSeparationPayList[$sp]["earnings_frequency"];
                $payrollList->is_installment = $allSeparationPayList[$sp]["earnings_is_installment"];
                $payrollList->number_of_installment = $allSeparationPayList[$sp]["earnings_number_of_installment"];
                $payrollList->start_pay_date = $allSeparationPayList[$sp]["earnings_start_pay_date"];
                $payrollList->end_pay_date = $allSeparationPayList[$sp]["earnings_end_pay_date"];
                $payrollList->details = $allSeparationPayList[$sp]["earnings_details"];
                $payrollList->installment_extra = $allSeparationPayList[$sp]["installment_extra"];
                $payrollList->hris_date = "";
                $payrollList->earnings_rate = "";
                $payrollList->earnings_hrs = "";
                // delete first existing PR ID and pay item id pagibig ER 
                checkDeleteNotInstallmentEarningsByEmpId($payrollList);
                // create extra 
                $query = checkCreateEarnings($payrollList);
            }
        }
    }

    // list of installment Earnings 
    // Other Allowances  
    if (count($allOtherAllowancesList) > 0) {
        for ($oa = 0; $oa < count($allOtherAllowancesList); $oa++) {
            if ($allOtherAllowancesList[$oa]["installment_extra"] === 1) {
                $payrollList->payroll_type_id = $allOtherAllowancesList[$oa]["earnings_payroll_type_id"];
                $payrollList->num_pay = 1;
                $payrollList->payroll_list_employee_name = $allOtherAllowancesList[$oa]["earnings_employee"];
                $payrollList->payroll_list_employee_id = $allOtherAllowancesList[$oa]["earnings_employee_id"];
                $payrollList->paytype_id = $allOtherAllowancesList[$oa]["earnings_paytype_id"];
                $payrollList->payitem_id = $allOtherAllowancesList[$oa]["earnings_payitem_id"];
                $payrollList->amount = $allOtherAllowancesList[$oa]["earnings_amount"];
                $payrollList->frequency = $allOtherAllowancesList[$oa]["earnings_frequency"];
                $payrollList->is_installment = $allOtherAllowancesList[$oa]["earnings_is_installment"];
                $payrollList->number_of_installment = $allOtherAllowancesList[$oa]["earnings_number_of_installment"];
                $payrollList->start_pay_date = $allOtherAllowancesList[$oa]["earnings_start_pay_date"];
                $payrollList->end_pay_date = $allOtherAllowancesList[$oa]["earnings_end_pay_date"];
                $payrollList->details = $allOtherAllowancesList[$oa]["earnings_details"];
                $payrollList->installment_extra = $allOtherAllowancesList[$oa]["installment_extra"];
                $payrollList->hris_date = "";
                $payrollList->earnings_rate = "";
                $payrollList->earnings_hrs = "";
                // delete first existing PR ID and pay item id pagibig ER 
                checkDeleteNotInstallmentEarningsByEmpId($payrollList);
                // create extra 
                $query = checkCreateEarnings($payrollList);
            }
        }
    }

    // list of installment Deduction
    // Tuition  
    if (count($allTuitionList) > 0) {
        for ($tu = 0; $tu < count($allTuitionList); $tu++) {
            if ($allTuitionList[$tu]["installment_extra"] === 1) {
                $payrollList->payroll_type_id = $allTuitionList[$tu]["deduction_payroll_type_id"];
                $payrollList->num_pay = 1;
                $payrollList->payroll_list_employee_name = $allTuitionList[$tu]["deduction_employee"];
                $payrollList->payroll_list_employee_id = $allTuitionList[$tu]["deduction_employee_id"];
                $payrollList->deduction_paytype_id = $allTuitionList[$tu]["deduction_paytype_id"];
                $payrollList->deduction_payitem_id = $allTuitionList[$tu]["deduction_payitem_id"];
                $payrollList->deduction_amount = $allTuitionList[$tu]["deduction_amount"];
                $payrollList->deduction_details = $allTuitionList[$tu]["deduction_details"];
                $payrollList->frequency = $allTuitionList[$tu]["deduction_frequency"];
                $payrollList->is_installment = $allTuitionList[$tu]["deduction_is_installment"];
                $payrollList->number_of_installment = $allTuitionList[$tu]["deduction_number_of_installment"];
                $payrollList->start_pay_date = $allTuitionList[$tu]["deduction_start_pay_date"];
                $payrollList->end_pay_date = $allTuitionList[$tu]["deduction_end_pay_date"];
                $payrollList->installment_extra = $allTuitionList[$tu]["installment_extra"];

                // delete first existing PR ID and pay item id pagibig ER 
                checkDeleteNotInstallmentDeductionsByEmpId($payrollList);
                // create extra 
                $query = checkCreateDeductions($payrollList);
            }
        }
    }

    // list of installment Deduction
    // Tithes  
    if (count($allTithesList) > 0) {
        for ($ti = 0; $ti < count($allTithesList); $ti++) {
            if ($allTithesList[$ti]["installment_extra"] === 1) {
                $payrollList->payroll_type_id = $allTithesList[$ti]["deduction_payroll_type_id"];
                $payrollList->num_pay = 1;
                $payrollList->payroll_list_employee_name = $allTithesList[$ti]["deduction_employee"];
                $payrollList->payroll_list_employee_id = $allTithesList[$ti]["deduction_employee_id"];
                $payrollList->deduction_paytype_id = $allTithesList[$ti]["deduction_paytype_id"];
                $payrollList->deduction_payitem_id = $allTithesList[$ti]["deduction_payitem_id"];
                $payrollList->deduction_amount = $allTithesList[$ti]["deduction_amount"];
                $payrollList->deduction_details = $allTithesList[$ti]["deduction_details"];
                $payrollList->frequency = $allTithesList[$ti]["deduction_frequency"];
                $payrollList->is_installment = $allTithesList[$ti]["deduction_is_installment"];
                $payrollList->number_of_installment = $allTithesList[$ti]["deduction_number_of_installment"];
                $payrollList->start_pay_date = $allTithesList[$ti]["deduction_start_pay_date"];
                $payrollList->end_pay_date = $allTithesList[$ti]["deduction_end_pay_date"];
                $payrollList->installment_extra = $allTithesList[$ti]["installment_extra"];
                // delete first existing PR ID and pay item id pagibig ER 
                checkDeleteNotInstallmentDeductionsByEmpId($payrollList);
                // create extra 
                $query = checkCreateDeductions($payrollList);
            }
        }
    }

    // list of installment Deduction
    // Other Deduction  
    if (count($allOtherDeductionList) > 0) {
        for ($od = 0; $od < count($allOtherDeductionList); $od++) {
            if ($allOtherDeductionList[$od]["installment_extra"] === 1) {

                $payrollList->payroll_type_id = $allOtherDeductionList[$od]["deduction_payroll_type_id"];
                $payrollList->num_pay = 1;
                $payrollList->payroll_list_employee_name = $allOtherDeductionList[$od]["deduction_employee"];
                $payrollList->payroll_list_employee_id = $allOtherDeductionList[$od]["deduction_employee_id"];
                $payrollList->deduction_paytype_id = $allOtherDeductionList[$od]["deduction_paytype_id"];
                $payrollList->deduction_payitem_id = $allOtherDeductionList[$od]["deduction_payitem_id"];
                $payrollList->deduction_amount = $allOtherDeductionList[$od]["deduction_amount"];
                $payrollList->deduction_details = $allOtherDeductionList[$od]["deduction_details"];
                $payrollList->frequency = $allOtherDeductionList[$od]["deduction_frequency"];
                $payrollList->is_installment = $allOtherDeductionList[$od]["deduction_is_installment"];
                $payrollList->number_of_installment = $allOtherDeductionList[$od]["deduction_number_of_installment"];
                $payrollList->start_pay_date = $allOtherDeductionList[$od]["deduction_start_pay_date"];
                $payrollList->end_pay_date = $allOtherDeductionList[$od]["deduction_end_pay_date"];
                $payrollList->installment_extra =  $allOtherDeductionList[$od]["installment_extra"];

                // delete first existing PR ID and pay item id pagibig ER 
                checkDeleteNotInstallmentDeductionsByEmpId($payrollList);
                // create extra  
                $query = checkCreateDeductions($payrollList);
            }
        }
    }

    // list of installment Deduction
    // Pagibig Loan  
    if (count($allPagibigLoanList) > 0) {
        for ($pgbg = 0; $pgbg < count($allPagibigLoanList); $pgbg++) {
            if ($allPagibigLoanList[$pgbg]["installment_extra"] === 1) {
                $payrollList->payroll_type_id = $allPagibigLoanList[$pgbg]["deduction_payroll_type_id"];
                $payrollList->num_pay = 1;
                $payrollList->payroll_list_employee_name = $allPagibigLoanList[$pgbg]["deduction_employee"];
                $payrollList->payroll_list_employee_id = $allPagibigLoanList[$pgbg]["deduction_employee_id"];
                $payrollList->deduction_paytype_id = $allPagibigLoanList[$pgbg]["deduction_paytype_id"];
                $payrollList->deduction_payitem_id = $allPagibigLoanList[$pgbg]["deduction_payitem_id"];
                $payrollList->deduction_amount = $allPagibigLoanList[$pgbg]["deduction_amount"];
                $payrollList->deduction_details = $allPagibigLoanList[$pgbg]["deduction_details"];
                $payrollList->frequency = $allPagibigLoanList[$pgbg]["deduction_frequency"];
                $payrollList->is_installment = $allPagibigLoanList[$pgbg]["deduction_is_installment"];
                $payrollList->number_of_installment = $allPagibigLoanList[$pgbg]["deduction_number_of_installment"];
                $payrollList->start_pay_date = $allPagibigLoanList[$pgbg]["deduction_start_pay_date"];
                $payrollList->end_pay_date = $allPagibigLoanList[$pgbg]["deduction_end_pay_date"];
                $payrollList->installment_extra = $allPagibigLoanList[$pgbg]["installment_extra"];
                // delete first existing PR ID and pay item id pagibig ER 
                checkDeleteNotInstallmentDeductionsByEmpId($payrollList);
                // create extra  
                $query = checkCreateDeductions($payrollList);
            }
        }
    }

    // list of installment Deduction
    // Pagibig MP2  
    if (count($allPagibigMP2List) > 0) {
        for ($mpt = 0; $mpt < count($allPagibigMP2List); $mpt++) {
            if ($allPagibigMP2List[$mpt]["installment_extra"] === 1) {
                $payrollList->payroll_type_id = $allPagibigMP2List[$mpt]["deduction_payroll_type_id"];
                $payrollList->num_pay = 1;
                $payrollList->payroll_list_employee_name = $allPagibigMP2List[$mpt]["deduction_employee"];
                $payrollList->payroll_list_employee_id = $allPagibigMP2List[$mpt]["deduction_employee_id"];
                $payrollList->deduction_paytype_id = $allPagibigMP2List[$mpt]["deduction_paytype_id"];
                $payrollList->deduction_payitem_id = $allPagibigMP2List[$mpt]["deduction_payitem_id"];
                $payrollList->deduction_amount = $allPagibigMP2List[$mpt]["deduction_amount"];
                $payrollList->deduction_details = $allPagibigMP2List[$mpt]["deduction_details"];
                $payrollList->frequency = $allPagibigMP2List[$mpt]["deduction_frequency"];
                $payrollList->is_installment = $allPagibigMP2List[$mpt]["deduction_is_installment"];
                $payrollList->number_of_installment = $allPagibigMP2List[$mpt]["deduction_number_of_installment"];
                $payrollList->start_pay_date = $allPagibigMP2List[$mpt]["deduction_start_pay_date"];
                $payrollList->end_pay_date = $allPagibigMP2List[$mpt]["deduction_end_pay_date"];
                $payrollList->installment_extra = $allPagibigMP2List[$mpt]["installment_extra"];
                // delete first existing PR ID and pay item id pagibig ER 
                checkDeleteNotInstallmentDeductionsByEmpId($payrollList);
                // create extra  
                $query = checkCreateDeductions($payrollList);
            }
        }
    }

    // list of installment Deduction
    // SSS loan  
    if (count($allSSSLoanList) > 0) {
        for ($sss = 0; $sss < count($allSSSLoanList); $sss++) {
            if ($allSSSLoanList[$sss]["installment_extra"] === 1) {

                $payrollList->payroll_type_id = $allSSSLoanList[$sss]["deduction_payroll_type_id"];
                $payrollList->num_pay = 1;
                $payrollList->payroll_list_employee_name = $allSSSLoanList[$sss]["deduction_employee"];
                $payrollList->payroll_list_employee_id = $allSSSLoanList[$sss]["deduction_employee_id"];
                $payrollList->deduction_paytype_id = $allSSSLoanList[$sss]["deduction_paytype_id"];
                $payrollList->deduction_payitem_id = $allSSSLoanList[$sss]["deduction_payitem_id"];
                $payrollList->deduction_amount = $allSSSLoanList[$sss]["deduction_amount"];
                $payrollList->deduction_details = $allSSSLoanList[$sss]["deduction_details"];
                $payrollList->frequency = $allSSSLoanList[$sss]["deduction_frequency"];
                $payrollList->is_installment = $allSSSLoanList[$sss]["deduction_is_installment"];
                $payrollList->number_of_installment = $allSSSLoanList[$sss]["deduction_number_of_installment"];
                $payrollList->start_pay_date = $allSSSLoanList[$sss]["deduction_start_pay_date"];
                $payrollList->end_pay_date = $allSSSLoanList[$sss]["deduction_end_pay_date"];
                $payrollList->installment_extra = $allSSSLoanList[$sss]["installment_extra"];
                // delete first existing PR ID and pay item id pagibig ER 
                checkDeleteNotInstallmentDeductionsByEmpId($payrollList);
                // create extra 
                $query = checkCreateDeductions($payrollList);
            }
        }
    }

    // update payroll table with total payroll amount
    // this has values $payrollTotalAmount
    checkUpdatePayrollTotalAmount($payrollList, $payrollTotalAmount);

    returnSuccess($payrollList, "Payroll List", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payrollList = new PayrollList($conn);
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
    $allPayrollList = $data["payrollList"];
    $allHolidayList = $data["holidayList"];
    $allNdList = $data["ndList"];
    $allSssList = $data["sssList"];
    $allPagibigList = $data["pagibigList"];
    $allPhilhealthList = $data["philhealthList"];
    $allTaxList = $data["taxList"];

    for ($pl = 0; $pl < count($allPayrollList); $pl++) {
        $payrollList->payroll_list_employee_id = $allPayrollList[$pl]["payroll_list_employee_id"];
        $payrollList->payroll_list_deduction = $allPayrollList[$pl]["payroll_list_deduction"];
        $payrollList->payroll_list_gross =  $allPayrollList[$pl]["payroll_list_gross"];
        $payrollList->payroll_list_net_pay =  $allPayrollList[$pl]["payroll_list_net_pay"];
        $payrollList->payroll_list_basic_pay =  $allPayrollList[$pl]["payroll_list_basic_pay"];
        $payrollList->payroll_list_overtime_pay =  $allPayrollList[$pl]["payroll_list_overtime_pay"];
        $payrollList->payroll_list_leave_pay =  $allPayrollList[$pl]["payroll_list_leave_pay"];
        $payrollList->payroll_list_holiday =  $allPayrollList[$pl]["payroll_list_holiday"];
        $payrollList->payroll_list_inlfation_adjustment =  $allPayrollList[$pl]["payroll_list_inlfation_adjustment"];
        $payrollList->payroll_list_adjustment_pay =  $allPayrollList[$pl]["payroll_list_adjustment_pay"];
        $payrollList->payroll_list_night_shift_differential = $allPayrollList[$pl]["payroll_list_night_shift_differential"];
        $payrollList->payroll_list_hazard_pay = $allPayrollList[$pl]["payroll_list_hazard_pay"];
        $payrollList->payroll_list_absences = $allPayrollList[$pl]["payroll_list_absences"];
        $payrollList->payroll_list_deminimis = $allPayrollList[$pl]["payroll_list_deminimis"];
        $payrollList->payroll_list_13th_month = $allPayrollList[$pl]["payroll_list_13th_month"];
        $payrollList->payroll_list_bonus = $allPayrollList[$pl]["payroll_list_bonus"];
        $payrollList->payroll_list_employee_referral_bonus = $allPayrollList[$pl]["payroll_list_employee_referral_bonus"];
        $payrollList->payroll_list_bereavement = $allPayrollList[$pl]["payroll_list_bereavement"];
        $payrollList->payroll_list_separation_pay = $allPayrollList[$pl]["payroll_list_separation_pay"];
        $payrollList->payroll_list_other_allowances = $allPayrollList[$pl]["payroll_list_other_allowances"];
        $payrollList->payroll_list_sss_er = $allPayrollList[$pl]["payroll_list_sss_er"];
        $payrollList->payroll_list_philhealth_er = $allPayrollList[$pl]["payroll_list_philhealth_er"];
        $payrollList->payroll_list_pagibig_er = $allPayrollList[$pl]["payroll_list_pagibig_er"];
        $payrollList->payroll_list_hmo_er = $allPayrollList[$pl]["payroll_list_hmo_er"];
        $payrollList->payroll_list_sss_ee = $allPayrollList[$pl]["payroll_list_sss_ee"];
        $payrollList->payroll_list_philhealth_ee = $allPayrollList[$pl]["payroll_list_philhealth_ee"];
        $payrollList->payroll_list_pagibig_ee = $allPayrollList[$pl]["payroll_list_pagibig_ee"];
        $payrollList->payroll_list_hmo_ee = $allPayrollList[$pl]["payroll_list_hmo_ee"];
        $payrollList->payroll_list_sss_loan = $allPayrollList[$pl]["payroll_list_sss_loan"];
        $payrollList->payroll_list_pagibig_loan = $allPayrollList[$pl]["payroll_list_pagibig_loan"];
        $payrollList->payroll_list_pagibig_mp2 = $allPayrollList[$pl]["payroll_list_pagibig_mp2"];
        $payrollList->payroll_list_fwc_tithes = $allPayrollList[$pl]["payroll_list_fwc_tithes"];
        $payrollList->payroll_list_fca_tuition = $allPayrollList[$pl]["payroll_list_fca_tuition"];
        $payrollList->payroll_list_other_deduction = $allPayrollList[$pl]["payroll_list_other_deduction"];
        $payrollList->payroll_list_tax = $allPayrollList[$pl]["payroll_list_tax"];
        $query = checkUpdate($payrollList);
    }

    // delete first existing PR ID and pay item id holiday
    $payrollList->payitem_id = $data["payItemHolidayId"];
    checkId($payrollList->payitem_id);
    checkDeleteEarnings($payrollList);

    if ($allHolidayList !== 0) {

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

            $query = checkCreateEarnings($payrollList);
        }
    }

    // delete first existing PR ID and pay item id night diff
    $payrollList->payitem_id = $data["payItemNightDiffId"];
    checkId($payrollList->payitem_id);
    checkDeleteEarnings($payrollList);
    if ($allNdList !== 0) {
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

            $query = checkCreateEarnings($payrollList);
        }
    }

    // delete first existing PR ID and pay item id SSS ER
    $payrollList->payitem_id = $data["payItemSssErId"];
    checkId($payrollList->payitem_id);
    checkDeleteEarnings($payrollList);
    // delete first deduction PR ID and pay item id SSS EE
    $payrollList->payitem_id = $data["payItemNSssEeId"];
    checkId($payrollList->payitem_id);
    checkDeleteDeductions($payrollList);
    // earnings sss EE and deductions sss ER
    if ($allSssList !== 0) {
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
            $query = checkCreateEarnings($payrollList);
            $query = checkCreateDeductions($payrollList);
        }
    }

    // delete first existing PR ID and pay item id pagibig ER
    $payrollList->payitem_id = $data["payItemPagibigErId"];
    checkId($payrollList->payitem_id);
    checkDeleteEarnings($payrollList);
    // delete first deduction PR ID and pay item id pagibig EE
    $payrollList->payitem_id = $data["payItemPagibigEeId"];
    checkId($payrollList->payitem_id);
    checkDeleteDeductions($payrollList);
    // earnings Pagibig EE and deductions Pagibig ER
    if ($allPagibigList !== 0) {
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
            $query = checkCreateEarnings($payrollList);
            $query = checkCreateDeductions($payrollList);
        }
    }

    // delete first existing PR ID and pay item id pagibig ER
    $payrollList->payitem_id = $data["payItemPhilhealthErId"];
    checkId($payrollList->payitem_id);
    checkDeleteEarnings($payrollList);
    // delete first deduction PR ID and pay item id pagibig EE
    $payrollList->payitem_id = $data["payItemPhilhealthEeId"];
    checkId($payrollList->payitem_id);
    checkDeleteDeductions($payrollList);
    // earnings Phil EE and deductions Phil ER
    if ($allPhilhealthList !== 0) {
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
            $query = checkCreateEarnings($payrollList);
            $query = checkCreateDeductions($payrollList);
        }
    }
    // delete first deduction PR ID and pay item id pagibig EE
    $payrollList->payitem_id = $data["payItemTaxId"];
    checkId($payrollList->payitem_id);
    checkDeleteDeductions($payrollList);
    // earnings Phil EE and deductions Phil ER
    if ($allTaxList !== 0) {
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
            $query = checkCreateDeductions($payrollList);
        }
    }



    returnSuccess($payrollList, "Payroll List", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

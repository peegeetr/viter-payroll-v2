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
    $payrollList->payroll_list_datetime = date("Y-m-d H:i:s");

    //check to see if payroll id (PR-001) in query string is not empty and less than 50 chars
    checkKeyword($payrollList->payroll_list_payroll_id);

    // payroll run
    $allPayrollList = $data["payrollList"];
    $allHolidayList = $data["holidayList"];


    for ($pl = 0; $pl < count($allPayrollList); $pl++) {
        $payrollList->payroll_list_employee_id = $allPayrollList[$pl]["payroll_list_employee_id"];
        $payrollList->payroll_list_deduction = $allPayrollList[$pl]["payroll_list_deduction"];
        $payrollList->payroll_list_gross =  $allPayrollList[$pl]["payroll_list_gross"];
        $payrollList->payroll_list_net_pay =  $allPayrollList[$pl]["payroll_list_net_pay"];
        $payrollList->payroll_list_basic_pay =  $allPayrollList[$pl]["payroll_list_basic_pay"];
        $payrollList->payroll_list_overtime_pay =  $allPayrollList[$pl]["payroll_list_overtime_pay"];
        $payrollList->payroll_list_overtime_hrs =  $allPayrollList[$pl]["payroll_list_overtime_hrs"];
        $payrollList->payroll_list_overtime_rate =  $allPayrollList[$pl]["payroll_list_overtime_rate"];
        $payrollList->payroll_list_leave_pay =  $allPayrollList[$pl]["payroll_list_leave_pay"];
        $payrollList->payroll_list_leave_hrs =  $allPayrollList[$pl]["payroll_list_leave_hrs"];
        $payrollList->payroll_list_leave_rate =  $allPayrollList[$pl]["payroll_list_leave_rate"];
        $payrollList->payroll_list_holiday =  $allPayrollList[$pl]["payroll_list_holiday"];
        $payrollList->payroll_list_holiday_hrs =  $allPayrollList[$pl]["payroll_list_holiday_hrs"];
        $payrollList->payroll_list_holiday_rate =  $allPayrollList[$pl]["payroll_list_holiday_rate"];
        $payrollList->payroll_list_inlfation_adjustment =  $allPayrollList[$pl]["payroll_list_inlfation_adjustment"];
        $payrollList->payroll_list_adjustment_pay =  $allPayrollList[$pl]["payroll_list_adjustment_pay"];
        $payrollList->payroll_list_night_shift_differential = $allPayrollList[$pl]["payroll_list_night_shift_differential"];
        $payrollList->payroll_list_nd_hrs =  $allPayrollList[$pl]["payroll_list_nd_hrs"];
        $payrollList->payroll_list_nd_rate =  $allPayrollList[$pl]["payroll_list_nd_rate"];
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

    // for ($h = 0; $h < count($allHolidayList); $h++) {
    //     $payrollList->earnings_payroll_type_id = $allHolidayList[$h]["earnings_payroll_type_id"];
    //     $payrollList->payroll_list_employee_name = $allHolidayList[$h]["earnings_employee"];
    //     $payrollList->payroll_list_employee_id = $allHolidayList[$h]["earnings_employee_id"];
    //     $payrollList->earnings_paytype_id = $allHolidayList[$h]["earnings_paytype_id"];
    //     $payrollList->earnings_payitem_id = $allHolidayList[$h]["earnings_payitem_id"];
    //     $payrollList->earnings_amount = $allHolidayList[$h]["earnings_amount"];
    //     $payrollList->earnings_details = $allHolidayList[$h]["earnings_details"];
    //     $payrollList->earnings_frequency = $allHolidayList[$h]["earnings_frequency"];
    //     $payrollList->earnings_is_installment = $allHolidayList[$h]["earnings_is_installment"];
    //     $payrollList->earnings_number_of_installment = $allHolidayList[$h]["earnings_number_of_installment"];
    //     $payrollList->earnings_start_pay_date = $allHolidayList[$h]["earnings_start_pay_date"];
    //     $payrollList->earnings_end_pay_date = $allHolidayList[$h]["earnings_end_pay_date"];
    //     $payrollList->earnings_hris_date = $allHolidayList[$h]["earnings_hris_date"];
    //     $payrollList->earnings_created = date("Y-m-d H:i:s");
    //     $query = checkCreateEarnings($payrollList);
    // }

    returnSuccess($payrollList, "Payroll List", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

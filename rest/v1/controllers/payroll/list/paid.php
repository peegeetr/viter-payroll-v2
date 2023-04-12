<?php

// set http header 
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/payroll/list/PayrollList.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payrollList = new PayrollList($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// check if userotherid is in the url e.g. /user/1
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("listpayrollid", $_GET)) {
        // check data
        checkPayload($data);
        // get task id from query string
        $payrollList->payroll_list_payroll_id = $_GET['listpayrollid'];
        $payrollList->payroll_list_is_paid = trim($data["isPaid"]);
        $payrollList->payroll_list_datetime = date("Y-m-d H:i:s");
        $payrollList->created = date("Y-m-d H:i:s");

        //check to see if payroll id (PR-001) in query string is not empty and less than 50 chars
        checkKeyword($payrollList->payroll_list_payroll_id);
        checkUpdateIsPaidPayroll($payrollList);
        $query = checkUpdateIsPaidPayrollList($payrollList);


        $allEarningsNumPayList = $data["earningsNumPayList"];
        $allDeducNumPayList = $data["deducNumPayList"];

        // list of installment
        $allBereavementList = $data["bereavementList"];
        $allBonusList = $data["bonusList"];
        $allERBonusList = $data["eRBonusList"];
        $allSeparationPayList = $data["separationPayList"];
        $allOtherAllowancesList = $data["otherAllowancesList"];

        // payBereavementList
        if ($allEarningsNumPayList !== 0) {
            for ($eNum = 0; $eNum < count($allEarningsNumPayList); $eNum++) {
                $payrollList->payitem_id = $allEarningsNumPayList[$eNum]["earnings_payitem_id"];
                $payrollList->payroll_list_employee_id = $allEarningsNumPayList[$eNum]["earnings_employee_id"];
                $payrollList->num_pay = $allEarningsNumPayList[$eNum]["earnings_num_pay"];
                $payrollList->payroll_list_is_paid = $allEarningsNumPayList[$eNum]["earnings_is_paid"];
                checkUpdateIsPaidEarnings($payrollList);
            }
        }

        if ($allDeducNumPayList !== 0) {
            for ($dNum = 0; $dNum < count($allDeducNumPayList); $dNum++) {
                $payrollList->payitem_id = $allDeducNumPayList[$dNum]["deduction_payitem_id"];
                $payrollList->payroll_list_employee_id = $allDeducNumPayList[$dNum]["deduction_employee_id"];
                $payrollList->num_pay = $allDeducNumPayList[$dNum]["deduction_num_pay"];
                $payrollList->payroll_list_is_paid = $allDeducNumPayList[$dNum]["deduction_is_paid"];
                checkUpdateIsPaidDeduction($payrollList);
            }
        }

        // list of installment 
        // berevements
        if ($allBereavementList !== 0) {

            for ($be = 0; $be < count($allBereavementList); $be++) {
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
                $payrollList->hris_date = "";
                $payrollList->earnings_rate = "";
                $payrollList->earnings_hrs = "";
                $payrollList->earnings_installment_extra = 1;
                $query = checkCreateEarnings($payrollList);
            }
        }

        // list of installment 
        // bonus
        if ($allBonusList !== 0) {

            for ($bonus = 0; $bonus < count($allBonusList); $bonus++) {
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
                $payrollList->hris_date = "";
                $payrollList->earnings_rate = "";
                $payrollList->earnings_hrs = "";
                $payrollList->earnings_installment_extra = 1;
                $query = checkCreateEarnings($payrollList);
            }
        }

        // list of installment 
        // Employee Referal bonus
        if ($allERBonusList !== 0) {

            for ($erb = 0; $erb < count($allERBonusList); $erb++) {
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
                $payrollList->hris_date = "";
                $payrollList->earnings_rate = "";
                $payrollList->earnings_hrs = "";
                $payrollList->earnings_installment_extra = 1;
                $query = checkCreateEarnings($payrollList);
            }
        }

        // list of installment 
        // Separation Pay 
        if ($allSeparationPayList !== 0) {

            for ($sp = 0; $sp < count($allSeparationPayList); $sp++) {
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
                $payrollList->hris_date = "";
                $payrollList->earnings_rate = "";
                $payrollList->earnings_hrs = "";
                $payrollList->earnings_installment_extra = 1;
                $query = checkCreateEarnings($payrollList);
            }
        }

        // list of installment 
        // Separation Pay 
        if ($allOtherAllowancesList !== 0) {

            for ($oa = 0; $oa < count($allOtherAllowancesList); $oa++) {
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
                $payrollList->hris_date = "";
                $payrollList->earnings_rate = "";
                $payrollList->earnings_hrs = "";
                $payrollList->earnings_installment_extra = 1;
                $query = checkCreateEarnings($payrollList);
            }
        }
        http_response_code(200);
        returnSuccess($payrollList, "Payroll type", $query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();

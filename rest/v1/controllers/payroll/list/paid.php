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

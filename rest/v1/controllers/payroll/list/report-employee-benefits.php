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
// get data
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    // check data
    checkPayload($data);
    // get value
    $allValues = $data['value'];

    $payrollList->payroll_list_employee_id = checkIndex($allValues, "employee_aid");
    $payrollList->date_from = checkIndex($allValues, "month");

    // by month
    if ($payrollList->payroll_list_employee_id === '0' && $payrollList->date_from !== "0") {
        $query = checkReadReportBenefitsByMonth($payrollList);
        http_response_code(200);
        getQueriedData($query);
    }

    // by employee id, by month
    if ($payrollList->payroll_list_employee_id !== '0' && $payrollList->date_from !== "0") {
        $query = checkReadReportBenefitsByEmployeeMonth($payrollList);
        http_response_code(200);
        getQueriedData($query);
    }
    $query = checkReadReportBenefitsBenefits($payrollList);
    http_response_code(200);
    getQueriedData($query);
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();

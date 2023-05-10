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
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("startDate", $_GET) && array_key_exists("endDate", $_GET) && array_key_exists("salaryId", $_GET) && array_key_exists("employeeId", $_GET)) {
        // get data
        $payrollList->payroll_list_employee_id = $_GET['employeeId'];
        $payrollList->date_from = $_GET['startDate'];
        $payrollList->date_to = $_GET['endDate'];
        $salaryCategoryId = $_GET['salaryId'];
        // check if id is not empty
        checkId($payrollList->payroll_list_employee_id);
        checkId($salaryCategoryId);
        checkKeyword($payrollList->date_from);
        checkKeyword($payrollList->date_to);
        if ($payrollList->payroll_list_employee_id === '0') {

            // filter Report Summary All Employee By Date
            $query = checkReadReportSummaryAllEmployeeByDate($payrollList, $salaryCategoryId);
            http_response_code(200);
            getQueriedData($query);
        }
        // filter Report Summary By Employee And By Date
        $query = checkReadReportSummaryByEmployeeAndByDate($payrollList, $salaryCategoryId);
        http_response_code(200);
        getQueriedData($query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();

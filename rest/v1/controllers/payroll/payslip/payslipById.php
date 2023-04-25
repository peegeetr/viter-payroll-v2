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

    if (array_key_exists("payrollListId", $_GET) && array_key_exists("empId", $_GET)) {

        // get task id from query string 
        $payrollList->payroll_list_aid = $_GET['payrollListId'];
        $payrollList->payroll_list_employee_id = $_GET['empId'];

        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($payrollList->payroll_list_aid);
        checkId($payrollList->payroll_list_employee_id);
        $query = checkReadHrisPayslipByEmpId($payrollList);
        http_response_code(200);
        getQueriedData($query);
    }

    if (array_key_exists("payrollListId", $_GET)) {

        // get task id from query string 
        $payrollList->payroll_list_aid = $_GET['payrollListId'];

        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($payrollList->payroll_list_aid);
        $query = checkReadPayslipById($payrollList);
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

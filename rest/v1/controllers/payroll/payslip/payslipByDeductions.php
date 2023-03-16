<?php

// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/deductions/Deductions.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$deductions = new Deductions($conn);
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("paytypeId", $_GET) && array_key_exists("empId", $_GET) && array_key_exists("payrollId", $_GET)) {

        // get task id from query string 
        $deductions->deduction_paytype_id = $_GET['paytypeId'];
        $deductions->deduction_payroll_id = $_GET['payrollId'];
        $deductions->deduction_employee_id = $_GET['empId'];

        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($deductions->deduction_paytype_id);
        $query = checkReadPayslipByPaytypeId($deductions);
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

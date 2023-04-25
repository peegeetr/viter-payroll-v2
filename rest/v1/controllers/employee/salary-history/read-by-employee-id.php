<?php
// set http header

// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/employee/SalaryHistory.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$salaryHistory = new SalaryHistory($conn);
$response = new Response();
// get $_GET data 
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("employeeId", $_GET)) {
        // get task id from query string
        $salaryHistory->salary_history_employee_id = $_GET['employeeId'];
        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($salaryHistory->salary_history_employee_id);
        $query = checkReadByEmployeeId($salaryHistory);
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

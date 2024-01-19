<?php

// set http header 
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../models/payroll/Payroll.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payroll = new Payroll($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    // check data
    checkPayload($data);

    // get data
    // get task id from query string
    $payroll->type = checkIndex($data, ("type"));
    $payroll->month = checkIndex($data, ("month"));
    $payroll->year = checkIndex($data, ("year"));

    // month have value only
    if ($payroll->month != "0" && $payroll->year == "0" && $payroll->type == "0") {
        $query = checkReadFilterMonth($payroll);
        http_response_code(200);
        getQueriedData($query);
    }

    // year have value only
    if ($payroll->month == "0" && $payroll->year != "0" && $payroll->type == "0") {
        $query = checkReadFilterYear($payroll);
        http_response_code(200);
        getQueriedData($query);
    }

    // type have value only
    if ($payroll->month == "0" && $payroll->year == "0" && $payroll->type != "0") {
        $query = checkReadFilterType($payroll);
        http_response_code(200);
        getQueriedData($query);
    }

    // type and month have value
    if ($payroll->month != "0" && $payroll->year == "0" && $payroll->type != "0") {
        $query = checkReadFilterMonthAndType($payroll);
        http_response_code(200);
        getQueriedData($query);
    }

    // type, month and year have value
    if ($payroll->month != "0" && $payroll->year != "0" && $payroll->type != "0") {
        // type, month and year
        $query = checkReadFilter($payroll);
        http_response_code(200);
        getQueriedData($query);
    }

    // type, month and year dont have value
    $query = checkReadAll($payroll);
    http_response_code(200);
    getQueriedData($query);
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();

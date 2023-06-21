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
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("listpayrollid", $_GET)) {
        // check data
        checkPayload($data);
        // get data
        // get listpayrollid from query string
        $payrollList->payroll_list_aid = $_GET['listpayrollid'];
        $payrollList->payroll_list_sss_er = checkIndex($data, "payroll_list_sss_er");
        $payrollList->payroll_list_sss_ee = checkIndex($data, "payroll_list_sss_ee");
        $payrollList->payroll_list_pagibig_er = checkIndex($data, "payroll_list_pagibig_er");
        $payrollList->payroll_list_pagibig_ee = checkIndex($data, "payroll_list_pagibig_ee");
        $payrollList->payroll_list_philhealth_er = checkIndex($data, "payroll_list_philhealth_er");
        $payrollList->payroll_list_philhealth_ee = checkIndex($data, "payroll_list_philhealth_ee");
        $payrollList->payroll_list_tax = checkIndex($data, "payroll_list_tax");
        $payrollList->payroll_list_basic_pay = checkIndex($data, "payroll_list_basic_pay");
        $payrollList->payroll_list_gross = checkIndex($data, "payroll_list_gross");
        $payrollList->payroll_list_deduction = checkIndex($data, "payroll_list_deduction");
        $payrollList->payroll_list_net_pay = checkIndex($data, "payroll_list_net_pay");
        $payrollList->payroll_list_datetime = date("Y-m-d H:i:s");

        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($payrollList->payroll_list_aid);
        // update
        $query = checkUpdateAmount($payrollList);
        returnSuccess($payrollList, "Payroll List", $query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();

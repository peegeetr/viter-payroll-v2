<?php

// set http header 
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/payroll/view/PayrollView.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payrollList = new PayrollView($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (
        array_key_exists("start", $_GET) &&
        array_key_exists("total", $_GET) &&
        array_key_exists("listpayrollid", $_GET)
    ) {
        // // get payroll id
        $payrollList->payroll_aid = $_GET['listpayrollid'];
        // get task id from query string
        $payrollList->payrollView_start = $_GET['start'];
        $payrollList->payrollView_total = $_GET['total'];
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($payrollList->payrollView_start, $payrollList->payrollView_total);
        $query = checkReadLimit($payrollList);
        http_response_code(200);
        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["success"] = true;
        $response->setData($returnData);
        $response->send();
        exit;
    }
    // return 404 error if endpoint not available
    checkEnpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();

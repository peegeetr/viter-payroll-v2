<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payrollList = new PayrollList($conn);
// get $_GET data
// check if listpayrollid is in the url e.g. /role/1
$error = [];
$returnData = [];
if (array_key_exists("listpayrollid", $_GET)) {
    // get task id from query string
    $payrollList->payroll_list_payroll_id = $_GET['listpayrollid'];

    // //check to see if task id in query string is not empty and is number, if not return json error
    // checkId($payrollList->payroll_list_payroll_id);
    $query = checkReadById($payrollList);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /role
if (empty($_GET)) {
    $query = checkReadAll($payrollList);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();

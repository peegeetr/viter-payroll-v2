<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payrollType = new PayrollType($conn);
// get $_GET data
// check if departmentid is in the url e.g. /department/1
$error = [];
$returnData = [];
if (array_key_exists("payrolltypeid", $_GET)) {
    // get task id from query string
    $payrollType->payroll_type_aid = $_GET['payrolltypeid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($payrollType->payroll_type_aid);
    $query = checkReadById($payrollType);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /rate
if (empty($_GET)) {
    $query = checkReadAll($payrollType);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();

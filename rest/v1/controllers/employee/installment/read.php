<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$employeeMpTwo = new EmployeeInstallment($conn);
// get $_GET data
// check if employeeid is in the url e.g. /employee/1
$error = [];
$returnData = [];
if (array_key_exists("employeeInstallmentId", $_GET)) {
    // get task id from query string
    $employeeMpTwo->employee_installment_aid = $_GET['employeeInstallmentId'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($employeeMpTwo->employee_installment_aid);
    $query = checkReadById($employeeMpTwo);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /employee
if (empty($_GET)) {
    $query = checkReadAll($employeeMpTwo);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();

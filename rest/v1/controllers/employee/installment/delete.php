<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$installment = new EmployeeInstallment($conn);
// get $_GET data
// check if employeeid is in the url e.g. /employee/1
$error = [];
$returnData = [];
if (array_key_exists("employeeInstallmentId", $_GET)) {
    // get data
    // get task id from query string
    $installment->employee_installment_aid  = $_GET['employeeInstallmentId'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($installment->employee_installment_aid);
    $query = checkDelete($installment);
    returnSuccess($installment, "deduction installment", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

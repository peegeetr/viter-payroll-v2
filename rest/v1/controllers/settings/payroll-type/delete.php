<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payrollType = new PayrollType($conn);
// get should not be present

// check if departmentid is in the url e.g. /department/1
$error = [];
$returnData = [];
if (array_key_exists("payrolltypeid", $_GET)) {

    // get data
    // get task id from query string
    $payrollType->payroll_type_aid = $_GET['payrolltypeid'];
    $name = checkIndex($data, "name");
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($payrollType->payroll_type_aid);
    isAssociated($payrollType, $name);
    $query = checkDelete($payrollType);

    returnSuccess($payrollType, "Payroll Type", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

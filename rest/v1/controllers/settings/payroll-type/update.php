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
    // check data
    checkPayload($data);
    // get data
    // get departmentid from query string
    $payrollType->payroll_type_aid = $_GET['payrolltypeid'];
    $payrollType->payroll_type_name = checkIndex($data, "payroll_type_name");
    $payrollType->payroll_type_active = 1;
    $payrollType->payroll_type_datetime = date("Y-m-d H:i:s");
    $payroll_type_name_old = strtolower($data["payroll_type_name_old"]);



    //$department_name_old = checkIndex($data, "department_name_old");
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($payrollType->payroll_type_aid);
    // check name

    compareName($payrollType, $payroll_type_name_old, $payrollType->payroll_type_name);
    // update
    $query = checkUpdate($payrollType);

    returnSuccess($payrollType, "Payroll Type", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payroll = new Payroll($conn);
// get $_GET data
// check if payrollid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("payrollid", $_GET)) {

    // get task id from query string
    $payroll->payroll_aid = $_GET['payrollid'];
    $payroll->payroll_id = trim($data["column_name"]);

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($payroll->payroll_aid);

    checkDeletePayrollList($payroll);
    // delete
    $query = checkDelete($payroll);
    $returnData["data"] = [];
    $returnData["count"] = $query->rowCount();
    $returnData["payroll ID"] = $payroll->payroll_aid;
    $returnData["success"] = true;
    return $returnData;
}

// return 404 error if endpoint not available
checkEnpoint();

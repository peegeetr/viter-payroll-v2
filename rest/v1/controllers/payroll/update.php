<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payroll = new Payroll($conn);
// get $_GET data
// check if earningsid is in the url e.g. /earningsid/1
$error = [];
$returnData = [];
if (array_key_exists("earningsid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get earningsid from query string
    $payroll->payroll_aid = $_GET['earningsid'];
    $payroll->payroll_start_date = checkIndex($data, "payroll_start_date");
    $payroll->payroll_end_date = checkIndex($data, "payroll_end_date");
    $payroll->payroll_pay_date = addslashes(trim($data["payroll_pay_date"]));
    $payroll->payroll_earning_type = checkIndex($data, "payroll_earning_type");
    $payroll->payroll_datetime = date("Y-m-d H:i:s");

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($payroll->payroll_aid);
    // update
    $query = checkUpdate($payroll);
    $returnData["data"] = [];
    $returnData["count"] = $query->rowCount();
    $returnData["role ID"] = $payroll->payroll_aid;
    $returnData["success"] = true;
    return $returnData;
}

// return 404 error if endpoint not available
checkEnpoint();

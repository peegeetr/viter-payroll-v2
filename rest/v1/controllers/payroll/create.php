<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payroll = new Payroll($conn);
// get should not be present
if (array_key_exists("payrollid", $_GET)) {
    $response->setSuccess(false);
    $error['code'] = "404";
    $error['message'] = "Endpoint not found.";
    $error["success"] = false;
    return $error;
}
// check data
checkPayload($data);
// get data

$payroll->payroll_id = checkIndex($data, "payroll_id");
$payroll->payroll_start_date = checkIndex($data, "payroll_start_date");
$payroll->payroll_end_date = checkIndex($data, "payroll_end_date");
$payroll->payroll_pay_date = checkIndex($data, "payroll_pay_date");
$payroll->payroll_earning_type = checkIndex($data, "payroll_earning_type");
$payroll->payroll_is_paid = 0;
$payroll->payroll_created = date("Y-m-d");
$payroll->payroll_datetime = date("Y-m-d H:i:s");


// create
$query = checkCreate($payroll);

$returnData = [];
$returnData["data"] = [];
$returnData["count"] = $query->rowCount();
$returnData["Role ID"] = $payroll->lastInsertedId;
$returnData["GET"] = $_GET;
$returnData["success"] = true;
return $returnData;

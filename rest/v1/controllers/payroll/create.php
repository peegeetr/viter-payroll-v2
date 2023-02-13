<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payroll = new Payroll($conn);
// get should not be present
if (array_key_exists("payrollid", $_GET)) {
    checkEnpoint();
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
$payroll->payroll_created = date("Y-m-d H:i:s");
$payroll->payroll_datetime = date("Y-m-d H:i:s");


$allEmployee = $data["employee"];

// validation if salary is draft 
isEarningType($payroll, $payroll->payroll_earning_type);

// create employee name and id
for ($i = 0; $i < count($allEmployee); $i++) {
    $employee_lname = $allEmployee[$i]["employee_lname"];
    $employee_fname = $allEmployee[$i]["employee_fname"];

    $payroll->payroll_list_employee_name = "$employee_lname $employee_fname";
    $payroll->payroll_list_employee_id = $allEmployee[$i]["employee_aid"];
    // create payroll list
    checkCreatePayrollList($payroll);
}
// create
$query = checkCreate($payroll);

$returnData = [];
$returnData["data"] = [];
$returnData["count"] = $query->rowCount();
$returnData["payroll ID"] = $payroll->lastInsertedId;
$returnData["GET"] = $_GET;
$returnData["success"] = true;
return $returnData;

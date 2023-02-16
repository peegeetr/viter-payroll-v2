<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payrollType = new PayrollType($conn);
// get should not be present
if (array_key_exists("payrolltypeid", $_GET)) {
    checkEnpoint();
}
// check data
checkPayload($data);
// get data
$payrollType->payroll_type_name = checkIndex($data, "payroll_type_name");
$payrollType->payroll_type_active = 1;
$payrollType->payroll_type_created = date("Y-m-d");
$payrollType->payroll_type_datetime = date("Y-m-d H:i:s");
// check name

isNameExist($payrollType, $payrollType->payroll_type_name);

$query = checkCreate($payrollType);
returnSuccess($payrollType, "Payroll Type", $query);

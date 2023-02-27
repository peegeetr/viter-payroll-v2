<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payroll = new Payroll($conn);
// get should not be present
if (array_key_exists("payrollid", $_GET)) {
    checkEndpoint();
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

// check if there's an existing payroll draft
isEarningType($payroll, $payroll->payroll_earning_type);

// create employee name and id
for ($i = 0; $i < count($allEmployee); $i++) {
    $employee_lname = $allEmployee[$i]["employee_lname"];
    $employee_fname = $allEmployee[$i]["employee_fname"];

    $payroll->payroll_list_employee_name = "$employee_lname $employee_fname";
    $payroll->payroll_list_employee_id = $allEmployee[$i]["employee_aid"];
    $payroll->payroll_list_employee_salary = $allEmployee[$i]["employee_job_salary"];
    $payroll->payroll_list_night_diff_per_day = $allEmployee[$i]["employee_job_nd_per_day"];
    $payroll->payroll_list_employee_work_on_holiday = $allEmployee[$i]["employee_job_work_reg_hol"];
    // create payroll list
    checkCreatePayrollList($payroll);
}
// create
$query = checkCreate($payroll);


returnSuccess($payroll, "Payroll", $query);

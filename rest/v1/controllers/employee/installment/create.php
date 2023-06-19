<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$installment = new EmployeeInstallment($conn);
// get should not be present
if (array_key_exists("employeeInstallmentId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$installment->employee_installment_employee_id = checkIndex($data, "employee_installment_employee_id");
$installment->employee_installment_paytype_id = checkIndex($data, "employee_installment_paytype_id");
$installment->employee_installment_amount = checkIndex($data, "employee_installment_amount");
$installment->employee_installment_details = checkIndex($data, "employee_installment_details");
$installment->employee_installment_number_of_months = checkIndex($data, "employee_installment_number_of_months");
$installment->employee_installment_actual_pay_date = checkIndex($data, "employee_installment_actual_pay_date");
$installment->employee_installment_start_date = checkIndex($data, "employee_installment_start_date");
$installment->employee_installment_end_date = checkIndex($data, "employee_installment_end_date");
$installment->employee_installment_number_of_payrun = 0;
$installment->employee_installment_created = date("Y-m-d H:i:s");
$installment->employee_installment_datetime = date("Y-m-d H:i:s");

$total_month = checkIndex($data, "total_month");

if ($total_month > $installment->employee_installment_number_of_months) {
    $installment->employee_installment_status = 2;
} else {
    $installment->employee_installment_status = 0;
}

// create
$query = checkCreate($installment);
returnSuccess($installment, "Employee Installment", $query);

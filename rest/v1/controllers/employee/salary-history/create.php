<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$salaryHistory = new SalaryHistory($conn);
// get should not be present
if (array_key_exists("salaryHistoryId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$salaryHistory->salary_history_employee_id = checkIndex($data, "salary_history_employee_id");
$salaryHistory->salary_history_salary_amount = checkIndex($data, "salary_history_salary_amount");
$salaryHistory->salary_history_date = checkIndex($data, "salary_history_date");
$salaryHistory->salary_history_created = date("Y-m-d H:i:s");
$salaryHistory->salary_history_datetime = date("Y-m-d H:i:s");

// check email
isDateExist($salaryHistory, $salaryHistory->salary_history_date);

// create
$query = checkCreate($salaryHistory);
returnSuccess($salaryHistory, "Salary History", $query);

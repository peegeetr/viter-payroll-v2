<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$salaryHistory = new SalaryHistory($conn);
// get $_GET data
// check if salaryHistoryid is in the url e.g. /salaryHistory/1
$error = [];
$returnData = [];
if (array_key_exists("salaryHistoryId", $_GET)) {
    // check data
    checkPayload($data);
    // get data

    $salaryHistory->salary_history_aid = $_GET['salaryHistoryId'];
    $salaryHistory->salary_history_employee_id = checkIndex($data, "salary_history_employee_id");
    $salaryHistory->salary_history_salary_amount = checkIndex($data, "salary_history_salary_amount");
    $salaryHistory->salary_history_date = checkIndex($data, "salary_history_date");
    $salaryHistory->salary_history_datetime = date("Y-m-d H:i:s");

    $salary_history_date_old = checkIndex($data, "salary_history_date_old");
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($salaryHistory->salary_history_aid);
    // check name
    compareDate($salaryHistory, $salary_history_date_old, $salaryHistory->salary_history_date);
    // update
    $query = checkUpdate($salaryHistory);
    returnSuccess($salaryHistory, "Salary History", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

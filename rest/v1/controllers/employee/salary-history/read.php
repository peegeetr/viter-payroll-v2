<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$salaryHistory = new SalaryHistory($conn);
// get $_GET data
// check if salaryHistoryId is in the url e.g. /salaryHistory/1
$error = [];
$returnData = [];
if (array_key_exists("salaryHistoryId", $_GET)) {
    // get task id from query string
    $salaryHistory->salary_history_aid = $_GET['salaryHistoryId'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($salaryHistory->salary_history_aid);
    $query = checkReadById($salaryHistory);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /salaryHistory
if (empty($_GET)) {
    $query = checkReadAll($salaryHistory);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();

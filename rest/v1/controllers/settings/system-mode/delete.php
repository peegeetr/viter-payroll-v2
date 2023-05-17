<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$systemMode = new SystemMode($conn);
// get $_GET data
// check if holidaysid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("systemModeId", $_GET)) {

    // get task id from query string
    $systemMode->settings_system_mode_aid = $_GET['systemModeId'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($systemMode->settings_system_mode_aid);

    // delete
    $query = checkDelete($systemMode);

    returnSuccess($systemMode, "system mode", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

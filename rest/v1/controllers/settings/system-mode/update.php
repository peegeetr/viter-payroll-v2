<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$systemMode = new SystemMode($conn);
// get $_GET data
// check if departmentid is in the url e.g. /department/1
$error = [];
$returnData = [];
if (array_key_exists("systemModeId", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get departmentid from query string
    $systemMode->settings_system_mode_aid = $_GET['systemModeId'];
    $systemMode->settings_system_mode_name = checkIndex($data, "settings_system_mode_name");
    $systemMode->settings_system_mode_datetime = date("Y-m-d H:i:s");

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($systemMode->settings_system_mode_aid);
    // update
    $query = checkUpdate($systemMode);

    returnSuccess($systemMode, "system mode", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

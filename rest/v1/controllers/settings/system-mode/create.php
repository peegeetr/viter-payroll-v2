<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$systemMode = new SystemMode($conn);
// get should not be present
if (array_key_exists("systemModeId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$systemMode->settings_system_mode_name = checkIndex($data, "settings_system_mode_name");
$systemMode->settings_system_mode_is_on = 0;
$systemMode->settings_system_mode_created = date("Y-m-d H:i:s");
$systemMode->settings_system_mode_datetime = date("Y-m-d H:i:s");

// create
$query = checkCreate($systemMode);


returnSuccess($systemMode, "system mode", $query);

<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/settings/system-mode/SystemMode.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$systemMode = new SystemMode($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// check if systemModeId is in the url e.g. /jobtitle/1 
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("systemModeId", $_GET)) {
        // check data
        checkPayload($data);
        // get task id from query string
        $systemMode->settings_system_mode_aid = $_GET['systemModeId'];
        $systemMode->settings_system_mode_is_on = trim($data["isActive"]);
        $systemMode->settings_system_mode_datetime = date("Y-m-d H:i:s");
        //check to see if task id in query string is not empty and is number, if not return json error 
        checkId($systemMode->settings_system_mode_aid);

        $query = checkActive($systemMode);
        http_response_code(200);

        returnSuccess($systemMode, "system mode", $query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();

<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$exemption = new HolidayExemptions($conn);
// get $_GET data
// check if exemptionId is in the url e.g. /role/1
$error = [];
$returnData = [];
if (array_key_exists("exemptionId", $_GET)) {
    // get task id from query string
    $exemption->holiday_exemption_aid = $_GET['exemptionId'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($exemption->holiday_exemption_aid);
    $query = checkReadById($exemption);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /role
if (empty($_GET)) {
    $query = checkReadAll($exemption);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();

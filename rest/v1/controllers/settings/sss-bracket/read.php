<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$sss_bracket = new SssBracket($conn);
// get $_GET data
// check if departmentid is in the url e.g. /department/1
$error = [];
$returnData = [];
if (array_key_exists("sssbracketid", $_GET)) {
    // get task id from query string
    $sss_bracket->sss_bracket_aid = $_GET['sssbracketid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($sss_bracket->sss_bracket_aid);
    $query = checkReadById($sss_bracket);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /rate
if (empty($_GET)) {
    $query = checkReadAll($sss_bracket);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();

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
    // get data
    // get task id from query string
    $sss_bracket->sss_bracket_aid = $_GET['sssbracketid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($sss_bracket->sss_bracket_aid);
    $query = checkDelete($sss_bracket);

    returnSuccess($sss_bracket, "SSS Bracket", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

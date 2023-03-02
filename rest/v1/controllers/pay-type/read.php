<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payType = new PayType($conn);
// get $_GET data
// check if paytypeid is in the url e.g. /role/1
$error = [];
$returnData = [];
if (array_key_exists("paytypeid", $_GET)) {
    // get task id from query string
    $payType->paytype_aid = $_GET['paytypeid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($payType->paytype_aid);
    $query = checkReadById($payType);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /role
if (empty($_GET)) {
    $query = checkReadAll($payType);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();

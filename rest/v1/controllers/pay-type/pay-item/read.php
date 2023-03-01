<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payItem = new PayItem($conn);
// get $_GET data
// check if payitemid is in the url e.g. /role/1
$error = [];
$returnData = [];
if (array_key_exists("payitemid", $_GET)) {
    // get task id from query string
    $payItem->payitem_aid = $_GET['payitemid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($payItem->payitem_aid);
    $query = checkReadById($payItem);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /role
if (empty($_GET)) {
    $query = checkReadAll($payItem);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();

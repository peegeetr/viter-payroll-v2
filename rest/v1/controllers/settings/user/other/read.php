<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user_other = new UserOther($conn);
// get $_GET data
// check if userotherid is in the url e.g. /user/1
$error = [];
$returnData = [];
if (array_key_exists("userotherid", $_GET)) {
    // get task id from query string
    $user_other->user_other_aid = $_GET['userotherid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($user_other->user_other_aid);
    $query = checkReadById($user_other);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /user
if (empty($_GET)) {
    $query = checkReadAll($user_other);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();

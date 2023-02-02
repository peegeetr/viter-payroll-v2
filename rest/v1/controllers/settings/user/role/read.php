<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$role = new Role($conn);
// get $_GET data
// check if roleid is in the url e.g. /role/1
$error = [];
$returnData = [];
if (array_key_exists("roleid", $_GET)) {
    // get task id from query string
    $role->role_aid = $_GET['roleid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($role->role_aid);
    $query = checkReadById($role);
    http_response_code(200);
    $returnData["data"] = getResultData($query);
    $returnData["count"] = $query->rowCount();
    $returnData["success"] = true;
    return $returnData;
}

// if request is a GET e.g. /role
if (empty($_GET)) {
    $query = checkReadAll($role);
    http_response_code(200);
    $returnData["data"] = getResultData($query);
    $returnData["count"] = $query->rowCount();
    $returnData["success"] = true;
    return $returnData;
}

// return 404 error if endpoint not available
checkEnpoint();

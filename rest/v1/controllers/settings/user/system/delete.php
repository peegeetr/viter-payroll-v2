<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user_system = new UserSystem($conn);
// get $_GET data
// check if usersystemid is in the url e.g. /user/1
$error = [];
$returnData = [];
if (array_key_exists("usersystemid", $_GET)) {
    // get data
    // get task id from query string
    $user_system->user_system_aid = $_GET['usersystemid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($user_system->user_system_aid);
    // delete
    $query = checkDelete($user_system);
    $returnData["data"] = [];
    $returnData["count"] = $query->rowCount();
    $returnData["User ID"] = $user_system->user_system_aid;
    $returnData["success"] = true;
    return $returnData;
}

// return 404 error if endpoint not available
checkEnpoint();

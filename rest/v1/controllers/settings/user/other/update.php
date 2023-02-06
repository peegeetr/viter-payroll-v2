<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user_other = new UserOther($conn);
// get $_GET data
// check if userotherid is in the url e.g. /userotherid/1
$error = [];
$returnData = [];
if (array_key_exists("userotherid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get userotherid from query string
    $user_other->user_other_aid = $_GET['userotherid'];
    $user_other->user_other_name = addslashes(trim($data["user_other_name"]));
    $user_other->user_other_email = addslashes(trim($data["user_other_email"])); 
    $user_other->user_other_datetime = date("Y-m-d H:i:s");
 
    $user_other_name_old = addslashes(trim($data["user_other_name_old"]));
    $user_other_email_old = addslashes(trim($data["user_other_email_old"]));
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($user_other->user_other_aid); 
    
    // check email
    compareEmail($user_other, $user_other_email_old, $user_other->user_other_email);
    // update
    $query = checkUpdate($user_other);
    $returnData["data"] = [];
    $returnData["count"] = $query->rowCount();
    $returnData["user ID"] = $user_other->user_other_aid;
    $returnData["success"] = true;
    return $returnData;
}

// return 404 error if endpoint not available
checkEnpoint();

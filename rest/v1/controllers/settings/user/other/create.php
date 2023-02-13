<?php
// check database connection
require '../../../../core/Encryption.php';
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user_other = new UserOther($conn);
$encrypt = new Encryption();
// get should not be present
if (array_key_exists("userotherid", $_GET)) {
    checkEnpoint();
}
// check data
checkPayload($data);
// get data
$user_other->user_other_is_active = 1;
$user_other->user_other_name = addslashes(trim($data["user_other_name"]));
$user_other->user_other_email = addslashes(trim($data["user_other_email"]));
$user_other->user_other_role_id = addslashes(trim($data["user_other_role_id"]));
$user_other->user_other_key = $encrypt->doHash(rand());
$user_other->user_other_created = date("Y-m-d");
$user_other->user_other_datetime = date("Y-m-d H:i:s");
// check email 
isEmailExist($user_other, $user_other->user_other_email);
// create
$query = checkCreate($user_other);
$returnData = [];
$returnData["data"] = [];
$returnData["count"] = $query->rowCount();
$returnData["User ID"] = $user_other->lastInsertedId;
$returnData["GET"] = $_GET;
$returnData["success"] = true;
return $returnData;

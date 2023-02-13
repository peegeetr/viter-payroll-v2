<?php
// check database connection
require '../../../../core/Encryption.php';
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user_system = new UserSystem($conn);
$encrypt = new Encryption();
// get should not be present
if (array_key_exists("usersystemid", $_GET)) {
    checkEnpoint();
}
// check data
checkPayload($data);
// get data
$user_system->user_system_name = addslashes(trim($data["user_system_name"]));
$user_system->user_system_is_active = 1;
$user_system->user_system_email = addslashes(trim($data["user_system_email"]));
$user_system->user_system_role_id = addslashes(trim($data["user_system_role_id"]));
$user_system->user_system_key = $encrypt->doHash(rand());
$user_system->user_system_created = date("Y-m-d");
$user_system->user_system_datetime = date("Y-m-d H:i:s");

// check email
isEmailExist($user_system, $user_system->user_system_email);
// create
$query = checkCreate($user_system);
$returnData = [];
$returnData["data"] = [];
$returnData["count"] = $query->rowCount();
$returnData["User ID"] = $user_system->lastInsertedId;
$returnData["GET"] = $_GET;
$returnData["success"] = true;
return $returnData;

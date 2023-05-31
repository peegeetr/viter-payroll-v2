<?php
// use notification template
require '../../../../notification/email-confirm.php';
// check database connection
require '../../../../core/Encryption.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user_system = new UserSystem($conn);
$encrypt = new Encryption();
// get $_GET data
// check if usersystemid is in the url e.g. /usersystemid/1
$error = [];
$returnData = [];
if (array_key_exists("usersystemid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get usersystemid from query string
    $user_system->user_system_aid = $_GET['usersystemid'];
    $user_system->user_system_name = addslashes(trim($data["user_system_name"]));
    $user_system->user_system_new_email = addslashes(trim($data["user_system_email"]));
    $user_system->user_system_key = $encrypt->doHash(rand());
    $user_system->user_system_datetime = date("Y-m-d H:i:s");
    $password_link = "/system/confirm-email-changes";

    $user_system_name_old = strtolower($data["user_system_name_old"]);
    $user_system_email_old = strtolower($data["user_system_email_old"]);
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($user_system->user_system_aid);

    // check email
    compareEmail($user_system, $user_system_email_old, $user_system->user_system_new_email);
    compareName($user_system, $user_system_name_old, $user_system->user_system_name);

    if ($user_system_email_old !== $user_system->user_system_new_email) {
        sendEmail(
            $user_system_email_old,
            $password_link,
            $user_system->user_system_name,
            $user_system->user_system_new_email,
            $user_system->user_system_key
        );
    }
    // update
    $query = checkUpdate($user_system);

    returnSuccess($user_system, "User system", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

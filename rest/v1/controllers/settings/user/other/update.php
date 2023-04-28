<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user_other = new UserOther($conn);
$encrypt = new Encryption();
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
    $user_other->user_other_new_email = addslashes(trim($data["user_other_email"]));
    $user_other->user_other_key = $encrypt->doHash(rand());
    $user_other->user_other_datetime = date("Y-m-d H:i:s");
    $password_link = "/confirm-email-changes";

    $user_other_name_old = addslashes(trim($data["user_other_name_old"]));
    $user_other_email_old = addslashes(trim($data["user_other_email_old"]));
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($user_other->user_other_aid);

    // check email
    compareEmail($user_other, $user_other_email_old, $user_other->user_other_new_email);
    compareName($user_other, $user_other_name_old, $user_other->user_other_name);

    if ($user_other_email_old !== $user_other->user_other_new_email) {
        sendEmail(
            $user_other_email_old,
            $password_link,
            $user_other->user_other_name,
            $user_other->user_other_new_email,
            $user_other->user_other_key
        );
    }

    // update
    $query = checkUpdate($user_other);

    returnSuccess($user_other, "User other", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/settings/user/other/UserOther.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user_other = new UserOther($conn);
$response = new Response();
// get $_GET data
// check if userotherkey is in the url e.g. /userotherkey/1
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("userotherkey", $_GET)) {
        // get data
        // get userotherid from query string  
        $user_other->user_other_key = $_GET['userotherkey'];
        $user_other->user_other_datetime = date("Y-m-d H:i:s");

        // check email is exist
        $readKey = $user_other->readKeyChangeEmail();

        // check if reload or key empty 
        $newCount = 0;

        // update if first load
        if ($readKey->rowCount() > 0) {
            $row = $readKey->fetch(PDO::FETCH_ASSOC);
            extract($row);
            $user_other->user_other_email = $user_other_new_email;
            // update
            $query = checkUpdateEmail($user_other);
            returnSuccess($user_other, "User Other", $query);
        }

        $returnData["count"] = $newCount;
        $returnData["success"] = true;
        $returnData["added"] = $newCount;
        $response->setData($returnData);
        $response->send();
        exit;
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();

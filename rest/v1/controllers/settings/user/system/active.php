<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use needed classes
require '../../../../models/settings/user/system/UserSystem.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user_system = new UserSystem($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// check if usersystemid is in the url e.g. /user/1
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("usersystemid", $_GET)) {
        // check data
        checkPayload($data);
        // get task id from query string
        $user_system->user_system_aid = $_GET['usersystemid'];
        $user_system->user_system_is_active = trim($data["isActive"]);
        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($user_system->user_system_aid);
        $query = checkActive($user_system);
        http_response_code(200);
        $returnData["data"] = [];
        $returnData["count"] = $query->rowCount();
        $returnData["User system ID"] = $user_system->user_system_aid;
        $returnData["success"] = true;
        $response->setData($returnData);
        $response->send();
        exit;
    }
    // return 404 error if endpoint not available
    checkEnpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
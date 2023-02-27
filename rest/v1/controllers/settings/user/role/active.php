<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/settings/user/role/Role.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$role = new Role($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// check if roleid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("roleid", $_GET)) {
        // check data
        checkPayload($data);
        // get task id from query string
        $role->role_aid = $_GET['roleid'];
        $role->role_is_active = trim($data["isActive"]);
        $is_developer = $data['isDeveloper'];
        $role->role_datetime = date("Y-m-d H:i:s");
        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($role->role_aid);



        // archive validation if role id exist  
        if ($is_developer == 1) {
            isUserSystemAssociated($role, "archive");
        }
        isUserOtherAssociated($role, "archive");

        $query = checkActive($role);
        http_response_code(200);

        returnSuccess($role, "Role", $query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();

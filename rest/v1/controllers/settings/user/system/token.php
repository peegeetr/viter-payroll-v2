<?php

// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use JWT
require '../../../../jwt/vendor/autoload.php';
// use needed classes
require '../../../../models/settings/user/system/UserSystem.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user_system = new UserSystem($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
$response = new Response();
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    $token = $data['token'];

    $key = "jwt_admin_ko_ito";

    token($user_system, $token, $key);
}

http_response_code(200);

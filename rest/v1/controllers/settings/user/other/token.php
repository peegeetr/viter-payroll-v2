<?php

// use JWT
require '../../../../jwt/vendor/autoload.php';
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use needed classes
require '../../../../models/settings/user/other/UserOther.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user_other = new UserOther($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    $token = $data['token'];

    $key = "jwt_admin_ko_ito";

    token($user_other, $token, $key);
}

http_response_code(200);

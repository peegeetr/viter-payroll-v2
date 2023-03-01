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
// get $_GET data
// check if typeid is in the url e.g. /typeid/1
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    $user_system->user_system_email = $data['user_system_email'];
    $password = $data['password'];

    $key = "jwt_admin_ko_ito";

    $result = checkLogin($user_system);

    $row = $result->fetch(PDO::FETCH_ASSOC);
    extract($row);

    loginAccess($password, $user_system_password, $user_system_email, $row, $result, $key);
}

http_response_code(200);

<?php

// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../models/holidays/Holidays.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$holidays = new Holidays($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    // if request is a GET e.g. /role
    if (empty($_GET)) {
        $year = date("Y");
        $query = checkReadAllCurrentYear($holidays, $year);
        http_response_code(200);
        getQueriedData($query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();

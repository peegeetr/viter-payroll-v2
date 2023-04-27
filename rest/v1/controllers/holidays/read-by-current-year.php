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

    // if request is a GET e.g. paydate
    if (array_key_exists("startDate", $_GET) && array_key_exists("endDate", $_GET)) {
        // $year = date("Y"); 
        $holidays->date_from = $_GET['startDate'];
        $holidays->date_to = $_GET['endDate'];
        checkKeyword($holidays->date_from);
        checkKeyword($holidays->date_to);

        $query = checkReadAllCurrentYear($holidays);
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

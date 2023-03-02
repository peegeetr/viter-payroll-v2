<?php

// set http header 
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
// use needed classes
require '../../models/earnings/Earnings.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$earnings = new Earnings($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET) && array_key_exists("total", $_GET)) {
        // get data
        // get task id from query string
        $earnings->earnings_start = $_GET['start'];
        $earnings->earnings_total = $_GET['total'];
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($earnings->earnings_start, $earnings->earnings_total);
        $query = checkReadLimit($earnings);
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

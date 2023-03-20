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

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $holidays->holidays_start = $_GET['start'];
        $holidays->holidays_total = 5;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($holidays->holidays_start, $holidays->holidays_total);
        $query = checkReadLimit($holidays);
        $total_result = checkReadAll($holidays);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $holidays->holidays_total;
        $returnData["page"] = (int)$holidays->holidays_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $holidays->holidays_total);
        $returnData["success"] = true;
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

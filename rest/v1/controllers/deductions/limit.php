<?php

// set http header 
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
// use needed classes
require '../../models/deductions/Deductions.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$deductions = new Deductions($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET) && array_key_exists("total", $_GET)) {
        // get data
        // get task id from query string
        $deductions->deduction_start = $_GET['start'];
        $deductions->deduction_total = $_GET['total'];
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($deductions->deduction_start, $deductions->deduction_total);
        $query = checkReadLimit($deductions);
        http_response_code(200);
        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
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

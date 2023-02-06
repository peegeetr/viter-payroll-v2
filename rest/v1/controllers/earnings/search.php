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
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("search", $_GET)) {
        // get data
        // get task id from query string
        $earnings->earnings_search = $_GET['search'];
        //check to see if search keyword in query string is not empty and less than 50 chars
        checkKeyword($earnings->earnings_search);
        $query = checkSearch($earnings);
        http_response_code(200);
        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
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

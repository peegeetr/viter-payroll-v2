<?php

// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../models/earnings/Earnings.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$earnings = new Earnings($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// check if paytypeid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (
        array_key_exists("paytypeId", $_GET) && 
        array_key_exists("startDate", $_GET) &&
        array_key_exists("endDate", $_GET)
    ) {
        // get data
        $earnings->earnings_paytype_id = $_GET['paytypeId']; 
        $earnings->date_from = $_GET['startDate'];
        $earnings->date_to = $_GET['endDate'];
 
            $query = checkReadSummaryByDate($earnings);
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

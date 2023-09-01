<?php

// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/reports/paytype/ReportPayType.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payType = new ReportPayType($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (
        array_key_exists("payrolltypeid", $_GET) &&
        array_key_exists("category", $_GET) &&
        array_key_exists("startDate", $_GET) &&
        array_key_exists("endDate", $_GET)
    ) {
        // get data
        // get task id from query string
        $payType->paytype_aid = $_GET['payrolltypeid'];
        $payType->date_from = $_GET['startDate'];
        $payType->date_to = $_GET['endDate'];
        checkId($payType->paytype_aid);

        $category = $_GET['category'];
        //check to see if task id in query string is not empty and is number, if not return json error 

        if ($category === "earnings") {
            $query = checkReadReportEarningsPaytypeIdByDate($payType);
            http_response_code(200);
            getQueriedData($query);
        }
        if ($category === "deductions") {
            $query = checkReadReportDeductionPaytypeIdByDate($payType);
            http_response_code(200);
            getQueriedData($query);
        }
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();

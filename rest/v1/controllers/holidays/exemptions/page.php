<?php

// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/holidays/HolidayExemptions.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$exemption = new HolidayExemptions($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $exemption->holiday_exemption_start = $_GET['start'];
        $exemption->holiday_exemption_total = 5;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($exemption->holiday_exemption_start, $exemption->holiday_exemption_total);
        $query = checkReadLimit($exemption);
        $total_result = checkReadAll($exemption);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $exemption->holiday_exemption_total;
        $returnData["page"] = (int)$exemption->holiday_exemption_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $exemption->holiday_exemption_total);
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

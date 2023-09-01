<?php

// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/reports/paytype/ReportView.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payrollList = new ReportView($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (
        array_key_exists("start", $_GET) && array_key_exists("startDate", $_GET)
        && array_key_exists("endDate", $_GET)

    ) {
        // get task id from query string checkIndex($data, "holidays_observed")
        $payrollList->date_from = checkIndex($_GET, "startDate");
        $payrollList->date_to = checkIndex($_GET, "endDate");
        $payrollList->report_start = $_GET['start'];
        $payrollList->report_total = 5;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($payrollList->report_start, $payrollList->report_total);
        $query = checkReadByReportBasicPayLimit($payrollList);
        http_response_code(200);
        $total_result = checkReadByReportBasicPay($payrollList);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $payrollList->report_total;
        $returnData["page"] = (int)$payrollList->report_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $payrollList->report_total);
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

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
$earnings = new ReportView($conn);
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
        array_key_exists("start", $_GET) && array_key_exists("startDate", $_GET)
        && array_key_exists("endDate", $_GET) && array_key_exists("payitemId", $_GET)
    ) {

        // get payroll id  
        // get task id from query string 
        $earnings->date_from = checkIndex($_GET, "startDate");
        $earnings->date_to = checkIndex($_GET, "endDate");
        $earnings->earnings_payitem_id = $_GET['payitemId'];
        $earnings->report_start = $_GET['start'];
        $earnings->report_total = 10;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($earnings->report_start, $earnings->report_total);

        $query = checkReadReportEarningsPaytypeByIdLimit($earnings);
        http_response_code(200);
        $total_result = checkReadReportEarningsPaytypeById($earnings);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $earnings->report_total;
        $returnData["page"] = (int)$earnings->report_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $earnings->report_total);
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
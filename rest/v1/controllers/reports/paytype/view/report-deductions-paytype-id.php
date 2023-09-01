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
$deductions = new ReportView($conn);
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
        $deductions->date_from = checkIndex($_GET, "startDate");
        $deductions->date_to = checkIndex($_GET, "endDate");
        $deductions->deduction_payitem_id = $_GET['payitemId'];
        $deductions->report_start = $_GET['start'];
        $deductions->report_total = 10;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($deductions->report_start, $deductions->report_total);

        $query = checkReadReportDeductionPaytypeByIdLimit($deductions);
        http_response_code(200);
        $total_result = checkReadReportDeductionPaytypeById($deductions);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $deductions->report_total;
        $returnData["page"] = (int)$deductions->report_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $deductions->report_total);
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

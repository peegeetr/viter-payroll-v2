<?php

// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../models/pay-type/PayType.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payType = new PayType($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $payType->paytype_start = $_GET['start'];
        $payType->paytype_total = 5;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($payType->paytype_start, $payType->paytype_total);
        $query = checkReadAllPayTypeLimit($payType);
        $total_result = checkReadAllPayType($payType);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $payType->paytype_total;
        $returnData["page"] = (int)$payType->paytype_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $payType->paytype_total);
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

<?php

// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/settings/sss-bracket/SssBracket.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$sss_bracket = new SssBracket($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $sss_bracket->sss_bracket_start = $_GET['start'];
        $sss_bracket->sss_bracket_total = 5;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($sss_bracket->sss_bracket_start, $sss_bracket->sss_bracket_total);
        $query = checkReadLimit($sss_bracket);
        $total_result = checkReadAll($sss_bracket);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $sss_bracket->sss_bracket_total;
        $returnData["page"] = (int)$sss_bracket->sss_bracket_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $sss_bracket->sss_bracket_total);
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

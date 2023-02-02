<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/pay-type/pay-item/PayItem.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payItem = new PayItem($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// check if payitemid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("payitemid", $_GET)) {
        // check data
        checkPayload($data);
        // get task id from query string
        $payItem->payitem_aid = $_GET['payitemid'];
        $payItem->payitem_is_active = trim($data["isActive"]);
        $payItem->payitem_datetime = date("Y-m-d H:i:s");
        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($payItem->payitem_aid);
        $query = checkActive($payItem);
        http_response_code(200);
        $returnData["data"] = [];
        $returnData["count"] = $query->rowCount();
        $returnData["role ID"] = $payItem->payitem_aid;
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

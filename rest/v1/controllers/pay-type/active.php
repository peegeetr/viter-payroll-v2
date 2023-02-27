<?php
// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
// use needed classes
require '../../models/pay-type/PayType.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payType = new PayType($conn);
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
    if (array_key_exists("paytypeid", $_GET)) {
        // check data
        checkPayload($data);
        // get task id from query string
        $payType->paytype_aid = $_GET['paytypeid'];
        $payType->paytype_is_active = trim($data["isActive"]);
        $payType->paytype_datetime = date("Y-m-d H:i:s");
        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($payType->paytype_aid);
        $query = checkActive($payType);
        http_response_code(200);

        returnSuccess($payType, "Paytype", $query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();

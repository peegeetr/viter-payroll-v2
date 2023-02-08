<?php
// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
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
// check if earningsid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("earningsid", $_GET)) {
        // check data
        checkPayload($data);
        // get task id from query string
        $earnings->earnings_aid = $_GET['earningsid'];
        $earnings->earnings_is_paid = trim($data["isActive"]);
        $earnings->earnings_datetime = date("Y-m-d H:i:s");
        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($earnings->earnings_aid);
        $query = checkActive($earnings);
        http_response_code(200);
        $returnData["data"] = [];
        $returnData["count"] = $query->rowCount();
        $returnData["earning ID"] = $earnings->earnings_aid;
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

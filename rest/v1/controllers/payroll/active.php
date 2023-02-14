<?php
// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
// use needed classes
require '../../models/payroll/Payroll.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payroll = new Payroll($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// check if payrollid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("payrollid", $_GET)) {
        // check data
        checkPayload($data);
        // get task id from query string
        $payroll->payroll_aid = $_GET['payrollid'];
        $payroll->payroll_is_paid = trim($data["isActive"]);
        $payroll->payroll_datetime = date("Y-m-d H:i:s");
        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($payroll->payroll_aid);
        $query = checkActive($payroll);
        http_response_code(200);

        returnSuccess($payroll, "Payroll", $query);
    }
    // return 404 error if endpoint not available
    checkEnpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();

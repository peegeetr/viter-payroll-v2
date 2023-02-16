<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/settings/payroll-type/PayrollType.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payrollType = new PayrollType($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// check if userotherid is in the url e.g. /user/1
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("payrolltypeid", $_GET)) {
        // check data
        checkPayload($data);
        // get task id from query string
        $payrollType->payroll_type_aid = $_GET['payrolltypeid'];
        $payrollType->payroll_type_active = trim($data["isActive"]);
        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($payrollType->payroll_type_aid);
        $query = checkActive($payrollType);
        http_response_code(200);

        returnSuccess($payrollType, "Payroll type", $query);
    }
    // return 404 error if endpoint not available
    checkEnpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();

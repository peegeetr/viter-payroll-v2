<?php

// set http header 
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/payroll/list/PayrollList.php';
// use notification template
require '../../../notification/email-payslip.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payrollList = new PayrollList($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    // check data
    checkPayload($data);

    $emailAllEmployee = $data["allEmailEmployee"];

    if (count($emailAllEmployee) > 0) {
        for ($emp = 0; $emp < count($emailAllEmployee); $emp++) {
            $email = $emailAllEmployee[$emp]["payroll_list_employee_email"];
            $link = $emailAllEmployee[$emp]["link"];
            $payrollId = $emailAllEmployee[$emp]["payrollId"];
            $mail = sendEmail(
                $email,
                $payrollId,
                $link,
            );
        }
        $returnData = [];
        $returnData["count"] = count($emailAllEmployee);
        $returnData["success"] = true;
        $response->setData($returnData);
        $response->send();
        exit;
    }

    if (count($emailAllEmployee) === 0) {
        $returnData = [];
        $error['error'] = "Empty Employee Email.";
        $returnData["success"] = false;
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

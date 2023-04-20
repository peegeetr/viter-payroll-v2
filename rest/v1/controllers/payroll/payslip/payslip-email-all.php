<?php

// set http header 
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/payroll/list/PayrollList.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payrollList = new PayrollList($conn);
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    // if request is a GET e.g. /role
    if (empty($_GET)) {

        $allPayrollPayList = $data["payrollPayList"];
        for ($pl = 0; $pl < count($allPayrollPayList); $pl++) {
            $payrollList->payroll_list_employee_email = $allPayrollPayList[$pl]["payroll_list_employee_email"];
            $mail = sendEmail(
                $payrollList->payroll_list_employee_email
            );
            getQueriedData($query);
        }
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();

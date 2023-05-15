<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/employee/EmployeeInstallment.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$installment = new EmployeeInstallment($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// check if employeeid is in the url e.g. /employee/1
$error = [];
$returnData = [];
// validate api key 
if (array_key_exists("paytypeId", $_GET) && array_key_exists("employeeId", $_GET)) {
    // get task id from query string
    $installment->employee_installment_paytype_id = $_GET['paytypeId'];
    $installment->employee_installment_employee_id = $_GET['employeeId'];
    $installment->employee_installment_datetime = date("Y-m-d H:i:s");
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($installment->employee_installment_employee_id);
    checkId($installment->employee_installment_paytype_id);

    $query = checkReadInstallmentByEmployeeId($installment);

    // check email is exist
    $readEmpInstallment = $installment->readInstallmentByEmployeeId();

    // update if first load
    if ($readEmpInstallment->rowCount() > 0) {
        $row = $readEmpInstallment->fetch(PDO::FETCH_ASSOC);
        extract($row);
        // $sDate = new DateTime($employee_installment_start_date);
        // $dateNow = new DateTime();
        // $interval = $now->diff($date);
        // return $interval->y;
        // if ($employee_installment_status === "1") {
        //     $installment->employee_installment_status = 2;
        //     $installment->employee_installment_aid = $employee_installment_aid;

        //     // update
        //     $query = checkUpdateStatus($installment);
        // }
    }


    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();

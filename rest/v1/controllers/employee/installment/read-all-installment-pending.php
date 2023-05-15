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
if (empty($_GET)) {
    //check to see if task id in query string is not empty and is number, if not return json error 
    $query = checkReadAllInstallmentPending($installment);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();

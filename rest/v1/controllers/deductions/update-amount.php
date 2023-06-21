<?php

// set http header 
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../models/deductions/Deductions.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$deductions = new Deductions($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("deductionid", $_GET)) {
        // check data
        checkPayload($data);
        // get data
        // get deductionid from query string
        $deductions->deduction_aid = $_GET['deductionid'];
        $deductions->deduction_amount = checkIndex($data, "deduction_amount");
        $deductions->deduction_datetime = date("Y-m-d H:i:s");

        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($deductions->deduction_aid);
        // update
        $query = checkUpdateAmount($deductions);
        returnSuccess($deductions, "Deduction", $query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();

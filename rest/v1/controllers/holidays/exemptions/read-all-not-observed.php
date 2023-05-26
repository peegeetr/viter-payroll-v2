<?php

// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/holidays/HolidayExemptions.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$exemption = new HolidayExemptions($conn);
$response = new Response();
// validate api key
if (empty($_GET)) {
    // return 404 error if endpoint not available
    checkEndpoint();
}
if (array_key_exists("memberId", $_GET)) {
    checkApiKey();

    // if request is a GET e.g. paydate
    $year = date("Y");
    $exemption->holiday_exemption_eid = $_GET['memberId'];
    $query = checkReadAllExemptionNotObservedById($exemption, $year);
    http_response_code(200);
    getQueriedData($query);
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();

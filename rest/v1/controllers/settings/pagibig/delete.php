<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$rates = new Rates($conn);
// get $_GET data
// check if holidaysid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("ratesid", $_GET)) {

    // get task id from query string
    $rates->rates_aid = $_GET['ratesid'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($rates->rates_aid);

    // delete
    $query = checkDelete($rates);

    returnSuccess($rates, "Rates", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

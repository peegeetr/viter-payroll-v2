<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$earnings = new Earnings($conn);
// get $_GET data
// check if earningsid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("earningsid", $_GET)) {

    // get task id from query string
    $earnings->earnings_aid = $_GET['earningsid'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($earnings->earnings_aid);

    // delete
    $query = checkDelete($earnings);
    returnSuccess($earnings, "Earnings", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

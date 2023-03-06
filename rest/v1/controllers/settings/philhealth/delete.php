<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$philhealth = new Philhealth($conn);
// get $_GET data
// check if holidaysid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("philhealthId", $_GET)) {

    // get task id from query string
    $philhealth->philhealth_aid = $_GET['philhealthId'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($philhealth->philhealth_aid);

    // delete
    $query = checkDelete($philhealth);

    returnSuccess($philhealth, "Philhealth", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

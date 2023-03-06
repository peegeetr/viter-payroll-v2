<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$philhealth = new Philhealth($conn);
// get $_GET data
// check if departmentid is in the url e.g. /department/1
$error = [];
$returnData = [];
if (array_key_exists("philhealthId", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get departmentid from query string
    $philhealth->philhealth_aid = $_GET['philhealthId'];
    $philhealth->philhealth_percentage = checkIndex($data, "philhealth_percentage");
    $philhealth->philhealth_min = checkIndex($data, "philhealth_min");
    $philhealth->philhealth_max = checkIndex($data, "philhealth_max");
    $philhealth->philhealth_datetime = date("Y-m-d H:i:s");
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($philhealth->philhealth_aid);
    // update
    $query = checkUpdate($philhealth);

    returnSuccess($philhealth, "Philhealth", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

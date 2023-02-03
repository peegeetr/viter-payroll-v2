<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$rate = new Rates ($conn);
// get $_GET data
// check if departmentid is in the url e.g. /department/1
$error = [];
$returnData = [];
if (array_key_exists("rateid", $_GET)) {
    // get task id from query string
    $rate->rate_aid = $_GET['rateid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($rate->rate_aid);
    $query = checkReadById($rate);
    http_response_code(200);
    $returnData["data"] = getResultData($query);
    $returnData["count"] = $query->rowCount();
    $returnData["success"] = true;
    return $returnData;
}

// if request is a GET e.g. /rate
if (empty($_GET)) {
    $query = checkReadAll($rate);
    http_response_code(200);
    $returnData["data"] = getResultData($query);
    $returnData["count"] = $query->rowCount();
    $returnData["success"] = true;
    return $returnData;
}

// return 404 error if endpoint not available
checkEnpoint();
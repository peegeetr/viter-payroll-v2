<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$deductions = new Deductions($conn);
// get $_GET data
// check if deductionid is in the url e.g. /role/1
$error = [];
$returnData = [];
if (array_key_exists("deductionid", $_GET)) {
    // get task id from query string
    $deductions->deduction_aid = $_GET['deductionid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($deductions->deduction_aid);
    $query = checkReadById($deductions);
    http_response_code(200);
    $returnData["data"] = getResultData($query);
    $returnData["count"] = $query->rowCount();
    $returnData["success"] = true;
    return $returnData;
}

// if request is a GET e.g. /role
if (empty($_GET)) {
    $query = checkReadAll($deductions);
    http_response_code(200);
    $returnData["data"] = getResultData($query);
    $returnData["count"] = $query->rowCount();
    $returnData["success"] = true;
    return $returnData;
}

// return 404 error if endpoint not available
checkEndpoint();

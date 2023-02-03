<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$semiMonthly = new SemiMonthly($conn);
// get $_GET data
// check if departmentid is in the url e.g. /department/1
$error = [];
$returnData = [];
if (array_key_exists("semiMonthlyid", $_GET)) {
    // get data
    // get task id from query string
    $semiMonthly->semi_monthly_aid  = $_GET['semiMonthlyid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($semiMonthly->semi_monthly_aid );
    $query = checkDelete($semiMonthly);
    $returnData["data"] = [];
    $returnData["count"] = $query->rowCount();
    $returnData["Semi Monthly ID"] = $semiMonthly->semi_monthly_aid ;
    $returnData["success"] = true;
    return $returnData;
}

// return 404 error if endpoint not available
checkEnpoint();

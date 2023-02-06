<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$taxMonthly = new TaxMonthly($conn);
// get $_GET data
// check if departmentid is in the url e.g. /department/1
$error = [];
$returnData = [];
if (array_key_exists("taxmonthlyid", $_GET)) {
    // get data
    // get task id from query string
    $taxMonthly->tax_monthly_aid  = $_GET['taxmonthlyid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($taxMonthly->tax_monthly_aid );
    $query = checkDelete($taxMonthly);
    $returnData["data"] = [];
    $returnData["count"] = $query->rowCount();
    $returnData["Tax Monthly ID"] = $taxMonthly->tax_monthly_aid ;
    $returnData["success"] = true;
    return $returnData;
}

// return 404 error if endpoint not available
checkEnpoint();

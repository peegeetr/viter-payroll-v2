<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$taxYearly = new TaxYearly($conn);
// get $_GET data
// check if departmentid is in the url e.g. /department/1
$error = [];
$returnData = [];
if (array_key_exists("taxyearlyid", $_GET)) {
    // get data
    // get task id from query string
    $taxYearly->tax_yearly_aid = $_GET['taxyearlyid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($taxYearly->tax_yearly_aid);
    $query = checkDelete($taxYearly);

    returnSuccess($taxYearly, "Tax Yearly", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

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
if (array_key_exists("taxMonthlyid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get departmentid from query string
    $taxMonthly->tax_monthly_aid  = $_GET['taxMonthlyid'];
    $taxMonthly->tax_monthly_range_from = checkIndex($data, "tax_monthly_range_from");
    $taxMonthly->tax_monthly_range_to = checkIndex($data, "tax_monthly_range_to");
    $taxMonthly->tax_monthly_less_amount = checkIndex($data, "tax_monthly_less_amount");
    $taxMonthly->tax_monthly_rate = checkIndex($data, "tax_monthly_rate");
    $taxMonthly->tax_monthly_additional_amount = checkIndex($data, "tax_monthly_additional_amount");
    $taxMonthly->tax_monthly_datetime = date("Y-m-d H:i:s");
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($taxMonthly->tax_monthly_aid );
    // check name
    //compareName($department, $department_name_old, $department->department_name);
    // update
    $query = checkUpdate($taxMonthly);
    $returnData["data"] = [];
    $returnData["count"] = $query->rowCount();
    $returnData["Tax Monthly ID"] = $taxMonthly->tax_monthly_aid;
    $returnData["success"] = true;
    return $returnData;
}

// return 404 error if endpoint not available
checkEnpoint();

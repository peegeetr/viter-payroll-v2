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
if (array_key_exists("semimonthlyid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get departmentid from query string
    $semiMonthly->semi_monthly_aid  = $_GET['semimonthlyid'];
    $semiMonthly->semi_monthly_range_from = checkIndex($data, "semi_monthly_range_from");
    $semiMonthly->semi_monthly_range_to = checkIndex($data, "semi_monthly_range_to");
    $semiMonthly->semi_monthly_less_amount = checkIndex($data, "semi_monthly_less_amount");
    $semiMonthly->semi_monthly_rate = checkIndex($data, "semi_monthly_rate");
    $semiMonthly->semi_monthly_additional_amount = checkIndex($data, "semi_monthly_additional_amount");
    $semiMonthly->semi_monthly_datetime = date("Y-m-d H:i:s");

    $semi_monthly_range_from_old = strtolower($data["semi_monthly_range_from_old"]);
    $semi_monthly_range_to_old = strtolower($data["semi_monthly_range_to_old"]);

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($semiMonthly->semi_monthly_aid );
    // check name
    compareRangeFrom($semiMonthly, $semi_monthly_range_from_old, $semiMonthly->semi_monthly_range_from);
    compareRangeTo($semiMonthly, $semi_monthly_range_to_old, $semiMonthly->semi_monthly_range_to);
    // update
    $query = checkUpdate($semiMonthly);
    $returnData["data"] = [];
    $returnData["count"] = $query->rowCount();
    $returnData["Semi Monthly ID"] = $semiMonthly->semi_monthly_aid;
    $returnData["success"] = true;
    return $returnData;
}

// return 404 error if endpoint not available
checkEnpoint();

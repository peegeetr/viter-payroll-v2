<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$rates = new Rates($conn);
// get $_GET data
// check if departmentid is in the url e.g. /department/1
$error = [];
$returnData = [];
if (array_key_exists("rateid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get departmentid from query string
    $rates->rates_aid = $_GET['rateid'];
    $rates->rates_night_differential = checkIndex($data, "rates_night_differential");
    $rates->rates_overtime = checkIndex($data, "rates_overtime");
    $rates->rates_special_holiday = checkIndex($data, "rates_special_holiday");
    $rates->rates_regular_holiday = checkIndex($data, "rates_regular_holiday");
    $rates->rates_rest_day = checkIndex($data, "rates_rest_day");
    $rates->rates_datetime = date("Y-m-d H:i:s");
    // $rates_name_old = checkIndex($data, "rates_name_old");
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($rates->rates_aid);
    // check name
    // compareName($department, $department_name_old, $department->department_name);
    // update
    $query = checkUpdate($rates);
    $returnData["data"] = [];
    $returnData["count"] = $query->rowCount();
    $returnData["Rates ID"] = $rates->rates_aid;
    $returnData["success"] = true;
    return $returnData;
}

// return 404 error if endpoint not available
checkEnpoint();

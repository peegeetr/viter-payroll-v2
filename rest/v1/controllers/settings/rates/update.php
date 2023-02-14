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
if (array_key_exists("ratesid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get departmentid from query string
    $rates->rates_aid = $_GET['ratesid'];
    $rates->rates_name = checkIndex($data, "rates_name");
    $rates->rates_paytype_id = checkIndex($data, "rates_paytype_id");
    $rates->rates_percent = checkIndex($data, "rates_percent");
    $rates->rates_payitems_id = checkIndex($data, "rates_payitems_id");
    $rates->rates_active = 1;
    $rates->rates_datetime = date("Y-m-d H:i:s");
    // $rates_name_old = checkIndex($data, "rates_name_old");
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($rates->rates_aid);
    // check name
    // compareName($department, $department_name_old, $department->department_name);
    // update
    $query = checkUpdate($rates);

    returnSuccess($rates, "Rates", $query);
}

// return 404 error if endpoint not available
checkEnpoint();

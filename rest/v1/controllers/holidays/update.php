<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$holidays = new Holidays($conn);
// get $_GET data
// check if holidaysid is in the url e.g. /holidaysid/1
$error = [];
$returnData = [];
if (array_key_exists("holidaysid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get holidaysid from query string
    $holidays->holidays_aid = $_GET['holidaysid'];
    $holidays->holidays_name = checkIndex($data, "holidays_name");
    $holidays->holidays_date = checkIndex($data, "holidays_date");
    $holidays->holidays_type = checkIndex($data, "holidays_type");
    $holidays->holidays_rate = checkIndex($data, "holidays_rate");
    $holidays->holidays_observed = checkIndex($data, "holidays_observed");
    $holidays->holidays_is_active = 1;
    $holidays->holidays_datetime = date("Y-m-d H:i:s");


    $holidays_name_old = checkIndex($data, "holidays_name_old");
    $holidays_date_old = checkIndex($data, "holidays_date_old");
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($holidays->holidays_aid);

    compareHolidayName($holidays, $holidays_name_old, $holidays->holidays_name);
    compareHolidayDate($holidays, $holidays_date_old, $holidays->holidays_date);

    // update
    $query = checkUpdate($holidays);
    returnSuccess($holidays, "Holidays", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

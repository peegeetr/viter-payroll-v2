<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$holidays = new Holidays($conn);
// get should not be present
if (array_key_exists("holidaysid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$holidays->holidays_name = checkIndex($data, "holidays_name");
$holidays->holidays_date = checkIndex($data, "holidays_date");
$holidays->holidays_type = checkIndex($data, "holidays_type");
$holidays->holidays_rate = checkIndex($data, "holidays_rate");
$holidays->holidays_observed = checkIndex($data, "holidays_observed");
$holidays->holidays_is_active = 1;
$holidays->holidays_created = date("Y-m-d H:i:s");
$holidays->holidays_datetime = date("Y-m-d H:i:s");

isHolidayNameExist($holidays, $holidays->holidays_name);
isHolidayDateExist($holidays, $holidays->holidays_date);

// create
$query = checkCreate($holidays);
returnSuccess($holidays, "Holidays", $query);

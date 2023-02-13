<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$rates = new Rates($conn);
// get should not be present
if (array_key_exists("ratesid", $_GET)) {
    checkEnpoint();
}
// check data
checkPayload($data);
// get data

$rates->rates_name = checkIndex($data, "rates_name");
$rates->rates_paytype_id = checkIndex($data, "rates_paytype_id");
$rates->rates_percent = checkIndex($data, "rates_percent");
$rates->rates_payitems_id = checkIndex($data, "rates_payitems_id");
$rates->rates_active = 1;
$rates->rates_created = date("Y-m-d");
$rates->rates_datetime = date("Y-m-d H:i:s");

// isHolidayNameExist($rates, $rates->rates_name);
// isHolidayDateExist($rates, $rates->rates_date);

// create
$query = checkCreate($rates);

$returnData = [];
$returnData["data"] = [];
$returnData["count"] = $query->rowCount();
$returnData["Rates ID"] = $rates->lastInsertedId;
$returnData["GET"] = $_GET;
$returnData["success"] = true;
return $returnData;

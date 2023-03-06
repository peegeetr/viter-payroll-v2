<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$philhealth = new Philhealth($conn);
// get should not be present
if (array_key_exists("philhealthId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$philhealth->philhealth_percentage = checkIndex($data, "philhealth_percentage");
$philhealth->philhealth_min = checkIndex($data, "philhealth_min");
$philhealth->philhealth_max = checkIndex($data, "philhealth_max");
$philhealth->philhealth_created = date("Y-m-d H:i:s");
$philhealth->philhealth_datetime = date("Y-m-d H:i:s");

// create
$query = checkCreate($philhealth);

returnSuccess($philhealth, "philhealth", $query);

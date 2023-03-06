<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$pagibig = new Pagibig($conn);
// get should not be present
if (array_key_exists("pagibigId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$pagibig->pagibig_er_amount = checkIndex($data, "pagibig_er_amount");
$pagibig->pagibig_ee_amount = checkIndex($data, "pagibig_ee_amount");
$pagibig->pagibig_created = date("Y-m-d H:i:s");
$pagibig->pagibig_datetime = date("Y-m-d H:i:s");

// create
$query = checkCreate($pagibig);

returnSuccess($pagibig, "Pagibig", $query);

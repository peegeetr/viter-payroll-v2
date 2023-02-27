<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payItem = new PayItem($conn);
// get should not be present
if (array_key_exists("payitemid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$payItem->payitem_name = addslashes(trim($data["payitem_name"]));
$payItem->payitem_paytype_id = checkIndex($data, "payitem_paytype_id");
$payItem->payitem_is_hris = addslashes(trim($data["payitem_is_hris"]));
$payItem->payitem_is_active = 1;
$payItem->payitem_created = date("Y-m-d");
$payItem->payitem_datetime = date("Y-m-d H:i:s");

// check name
isNameExist($payItem, $payItem->payitem_name);
// create
$query = checkCreate($payItem);
returnSuccess($payItem, "Payitem", $query);

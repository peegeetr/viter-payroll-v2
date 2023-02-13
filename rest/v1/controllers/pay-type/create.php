<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payType = new PayType($conn);
// get should not be present
if (array_key_exists("paytypeid", $_GET)) {
    checkEnpoint();
}
// check data
checkPayload($data);
// get data
$payType->paytype_name = addslashes(trim($data["paytype_name"]));
$payType->paytype_description = addslashes(trim($data["paytype_description"]));
$payType->paytype_category = addslashes(trim($data["paytype_category"]));
$payType->paytype_is_active = 1;
$payType->paytype_created = date("Y-m-d");
$payType->paytype_datetime = date("Y-m-d H:i:s");
// string value convert to lower case and get first word
$column_name = strtolower(explode(" ", $data["paytype_name"])[0]);

// check name
isNameExist($payType, $payType->paytype_name);
// create
$query = checkCreate($payType);
// add column
checkAddColumn($payType, $column_name);
// update column value after adding
checkUpdateColumnValue($payType, $column_name);
$returnData = [];
$returnData["data"] = [];
$returnData["count"] = $query->rowCount();
$returnData["paytype ID"] = $payType->lastInsertedId;
$returnData["GET"] = $_GET;
$returnData["success"] = true;
return $returnData;

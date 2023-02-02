<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payItem = new PayItem($conn);
// get should not be present
if (array_key_exists("payitemid", $_GET)) {
    $response->setSuccess(false);
    $error['code'] = "404";
    $error['message'] = "Endpoint not found.";
    $error["success"] = false;
    return $error;
}
// check data
checkPayload($data);
// get data
$payItem->payitem_name = addslashes(trim($data["payitem_name"])); 
$payItem->payitem_paytype_id = addslashes(trim($data["paytypeid"]));
$payItem->payitem_is_active = 1;
$payItem->payitem_created = date("Y-m-d");
$payItem->payitem_datetime = date("Y-m-d H:i:s"); 

// check name
isNameExist($payItem, $payItem->payitem_name);
// create
$query = checkCreate($payItem); 
$returnData = [];
$returnData["data"] = [];
$returnData["count"] = $query->rowCount();
$returnData["Role ID"] = $payItem->lastInsertedId;
$returnData["GET"] = $_GET;
$returnData["success"] = true;
return $returnData;

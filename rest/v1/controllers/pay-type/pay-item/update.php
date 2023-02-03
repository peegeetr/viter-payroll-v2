<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payItem = new PayItem($conn);
// get $_GET data
// check if payitemid is in the url e.g. /payitemid/1
$error = [];
$returnData = [];
if (array_key_exists("payitemid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get payitemid from query string
    $payItem->payitem_aid = $_GET['payitemid'];
    $payItem->payitem_paytype_id = checkIndex($data, "payitem_paytype_id");
    $payItem->payitem_name = addslashes(trim($data["payitem_name"]));  
    $payItem->payitem_datetime = date("Y-m-d H:i:s");
     
    $name_old = strtolower($data["payitem_name_old"]);  

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($payItem->payitem_aid); 
    // check name
    compareName($payItem, $name_old, $payItem->payitem_name);
    // update
    $query = checkUpdate($payItem); 
    $returnData["data"] = [];
    $returnData["count"] = $query->rowCount();
    $returnData["role ID"] = $payItem->payitem_aid;
    $returnData["success"] = true;
    return $returnData;
}

// return 404 error if endpoint not available
checkEnpoint();
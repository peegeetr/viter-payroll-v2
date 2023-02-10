<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payItem = new PayItem($conn);
// get $_GET data
// check if payitemid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("payitemid", $_GET)) {

    // get task id from query string
    $payItem->payitem_aid = $_GET['payitemid'];
    $payItem->payitem_name = strtolower($data["column_name"]);

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($payItem->payitem_aid);

    // validation before deleting  
    isEarningsAssociatedToPayItem($payItem, $payItem->payitem_name);
    isRateAssociatedToPayItem($payItem, $payItem->payitem_name);
    // delete
    $query = checkDelete($payItem);
    $returnData["data"] = [];
    $returnData["count"] = $query->rowCount();
    $returnData["payitem ID"] = $payItem->payitem_aid;
    $returnData["success"] = true;
    return $returnData;
}

// return 404 error if endpoint not available
checkEnpoint();

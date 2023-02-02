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
    
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($payItem->payitem_aid);  
     
    // delete
    $query = checkDelete($payItem); 
    $returnData["data"] = [];
    $returnData["count"] = $query->rowCount();
    $returnData["Role ID"] = $payItem->payitem_aid;
    $returnData["success"] = true;
    return $returnData;
}

// return 404 error if endpoint not available
checkEnpoint();

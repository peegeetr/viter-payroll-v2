<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payType = new PayType($conn);
// get $_GET data
// check if paytypeid is in the url e.g. /paytypeid/1
$error = [];
$returnData = [];
if (array_key_exists("paytypeid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get paytypeid from query string
    $payType->paytype_aid = $_GET['paytypeid'];
    $payType->paytype_name = addslashes(trim($data["paytype_name"]));
    $payType->paytype_description = addslashes(trim($data["paytype_description"]));
    $payType->paytype_category = addslashes(trim($data["paytype_category"])); 
    $payType->paytype_datetime = date("Y-m-d H:i:s");
    $column_name_old = strtolower($data["paytype_name_old"]);
    // string value convert to lower case
    $column_name = strtolower($data["paytype_name"]);
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($payType->paytype_aid);
    // check name
    compareName($payType, $column_name_old, $payType->paytype_name);
    // update
    $query = checkUpdate($payType);
    // update column name
    checkUpdateColumnName($payType, $column_name, $column_name_old);
    $returnData["data"] = [];
    $returnData["count"] = $query->rowCount();
    $returnData["role ID"] = $payType->paytype_aid;
    $returnData["success"] = true;
    return $returnData;
}

// return 404 error if endpoint not available
checkEnpoint();

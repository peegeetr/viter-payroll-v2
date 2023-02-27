<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payType = new PayType($conn);
// get $_GET data
// check if paytypeid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("paytypeid", $_GET)) {

    // get task id from query string
    $payType->paytype_aid = $_GET['paytypeid'];
    $column_name = strtolower(explode(" ", $data["column_name"])[0]);

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($payType->paytype_aid);

    // drop column  
    isAssociated($payType);

    // drop column  
    checkDropColumnName($payType, $column_name);
    // delete
    $query = checkDelete($payType);

    returnSuccess($payType, "Paytype", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

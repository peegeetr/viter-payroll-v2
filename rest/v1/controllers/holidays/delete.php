<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$holidays = new Holidays($conn);
// get $_GET data
// check if holidaysid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("holidaysid", $_GET)) {

    // get task id from query string
    $holidays->holidays_aid = $_GET['holidaysid'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($holidays->holidays_aid);

    // delete
    $query = checkDelete($holidays);
    $returnData["data"] = [];
    $returnData["count"] = $query->rowCount();
    $returnData["Holidays ID"] = $holidays->holidays_aid;
    $returnData["success"] = true;
    return $returnData;
}

// return 404 error if endpoint not available
checkEnpoint();

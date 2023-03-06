<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$pagibig = new Pagibig($conn);
// get $_GET data
// check if holidaysid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("pagibigId", $_GET)) {

    // get task id from query string
    $pagibig->pagibig_aid = $_GET['pagibigId'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($pagibig->pagibig_aid);

    // delete
    $query = checkDelete($pagibig);

    returnSuccess($pagibig, "Pagibig", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

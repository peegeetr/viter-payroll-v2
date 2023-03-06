<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$pagibig = new Pagibig($conn);
// get $_GET data
// check if departmentid is in the url e.g. /department/1
$error = [];
$returnData = [];
if (array_key_exists("pagibigId", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get departmentid from query string
    $pagibig->pagibig_aid = $_GET['pagibigId'];
    $pagibig->pagibig_er_amount = checkIndex($data, "pagibig_er_amount");
    $pagibig->pagibig_ee_amount = checkIndex($data, "pagibig_ee_amount");
    $pagibig->pagibig_datetime = date("Y-m-d H:i:s");
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($pagibig->pagibig_aid);
    // update
    $query = checkUpdate($pagibig);

    returnSuccess($pagibig, "Pagibig", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

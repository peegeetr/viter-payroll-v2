<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$exemption = new HolidayExemptions($conn);
// get $_GET data
// check if holidaysid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("exemptionId", $_GET)) {

    // check data
    checkPayload($data);

    // get task id from query string
    $exemption->holiday_exemption_aid = $_GET['exemptionId'];
    $exemption->holiday_exemption_pr_id = checkIndex($data, "payrollId");

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($exemption->holiday_exemption_aid);

    // delete column  isAssociated 
    isAssociated($exemption, "this holiday");
    // delete
    $query = checkDelete($exemption);
    returnSuccess($exemption, "Holiday Exemptions", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

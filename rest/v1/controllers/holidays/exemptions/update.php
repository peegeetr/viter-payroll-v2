<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$exemption = new HolidayExemptions($conn);
// get $_GET data
// check if exemptionId is in the url e.g. /exemptionId/1
$error = [];
$returnData = [];
if (array_key_exists("exemptionId", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get exemptionId from query string
    $exemption->holiday_exemption_aid = $_GET['exemptionId'];
    $exemption->holiday_exemption_eid = checkIndex($data, "holiday_exemption_eid");
    $exemption->holiday_exemption_holiday_date = checkIndex($data, "holiday_exemption_holiday_date");
    $exemption->holiday_exemption_is_observe = checkIndex($data, "holiday_exemption_is_observe");
    $exemption->holiday_exemption_datetime = date("Y-m-d H:i:s");

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($exemption->holiday_exemption_aid);

    $exemption_date_old = checkIndex($data, "holiday_exemption_holiday_date_old");

    compareHolidayDate($exemption, $exemption_date_old, $exemption->holiday_exemption_holiday_date);

    // update
    $query = checkUpdate($exemption);
    returnSuccess($exemption, "Holiday Exemptions", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

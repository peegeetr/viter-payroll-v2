<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$exemption = new HolidayExemptions($conn);
// get should not be present
if (array_key_exists("exemptionId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$exemption->holiday_exemption_eid = checkIndex($data, "holiday_exemption_eid");
$exemption->holiday_exemption_holiday_date = checkIndex($data, "holiday_exemption_holiday_date");
$exemption->holiday_exemption_is_observe = checkIndex($data, "holiday_exemption_is_observe");
$exemption->holiday_exemption_created = date("Y-m-d H:i:s");
$exemption->holiday_exemption_datetime = date("Y-m-d H:i:s");


isHolidayExemptionsEmployeeExist($exemption, $exemption->holiday_exemption_holiday_date);

// create
$query = checkCreate($exemption);
returnSuccess($exemption, "Holiday Exemptions", $query);

<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$semiMonthly = new SemiMonthly($conn);
// get should not be present
if (array_key_exists("semimonthlyid", $_GET)) {
    checkEnpoint();
}
// check data
checkPayload($data);
// get data
$semiMonthly->semi_monthly_range_from = checkIndex($data, "semi_monthly_range_from");
$semiMonthly->semi_monthly_range_to = checkIndex($data, "semi_monthly_range_to");
$semiMonthly->semi_monthly_less_amount = checkIndex($data, "semi_monthly_less_amount");
$semiMonthly->semi_monthly_rate = checkIndex($data, "semi_monthly_rate");
$semiMonthly->semi_monthly_additional_amount = checkIndex($data, "semi_monthly_additional_amount");
$semiMonthly->semi_monthly_active = 1;
$semiMonthly->semi_monthly_created = date("Y-m-d");
$semiMonthly->semi_monthly_datetime = date("Y-m-d H:i:s");
// check name
isRangeFromExist($semiMonthly, $semiMonthly->semi_monthly_range_from);
isRangeToExist($semiMonthly, $semiMonthly->semi_monthly_range_to);

$query = checkCreate($semiMonthly);
returnSuccess($semiMonthly, "Semi Monthly", $query);

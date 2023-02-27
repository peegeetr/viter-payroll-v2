<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$sss_bracket = new SssBracket($conn);
// get should not be present
if (array_key_exists("sssbracketid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$sss_bracket->sss_bracket_range_from = checkIndex($data, "sss_bracket_range_from");
$sss_bracket->sss_bracket_range_to = checkIndex($data, "sss_bracket_range_to");
$sss_bracket->sss_bracket_er = checkIndex($data, "sss_bracket_er");
$sss_bracket->sss_bracket_ee = checkIndex($data, "sss_bracket_ee");
$sss_bracket->sss_bracket_total = checkIndex($data, "sss_bracket_total");
$sss_bracket->sss_bracket_active = 1;
$sss_bracket->sss_bracket_created = date("Y-m-d");
$sss_bracket->sss_bracket_datetime = date("Y-m-d H:i:s");
// check name

isRangeFromExist($sss_bracket, $sss_bracket->sss_bracket_range_from);
isRangeToExist($sss_bracket, $sss_bracket->sss_bracket_range_to);

$query = checkCreate($sss_bracket);
returnSuccess($sss_bracket, "SSS Bracket", $query);

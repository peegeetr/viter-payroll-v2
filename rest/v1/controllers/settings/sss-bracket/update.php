<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$sss_bracket = new SssBracket($conn);
// get $_GET data
// check if departmentid is in the url e.g. /department/1
$error = [];
$returnData = [];
if (array_key_exists("sssbracketid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get departmentid from query string
   $sss_bracket->sss_bracket_aid = $_GET['sssbracketid'];
   $sss_bracket->sss_bracket_range_from = checkIndex($data, "sss_bracket_range_from");
   $sss_bracket->sss_bracket_range_to = checkIndex($data, "sss_bracket_range_to");
   $sss_bracket->sss_bracket_er = checkIndex($data, "sss_bracket_er");
   $sss_bracket->sss_bracket_ee = checkIndex($data, "sss_bracket_ee");
   $sss_bracket->sss_bracket_total = checkIndex($data, "sss_bracket_total");
   $sss_bracket->sss_bracket_active = 1;
   $sss_bracket->sss_bracket_datetime = date("Y-m-d H:i:s");

   $sss_bracket_range_from_old = strtolower($data["sss_bracket_range_from_old"]);
   $sss_bracket_range_to_old = strtolower($data["sss_bracket_range_to_old"]);
   

    //$department_name_old = checkIndex($data, "department_name_old");
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($sss_bracket->sss_bracket_aid);
    // check name
    compareRangeFrom($sss_bracket, $sss_bracket_range_from_old, $sss_bracket->sss_bracket_range_from);
    compareRangeTo($sss_bracket, $sss_bracket_range_to_old, $sss_bracket->sss_bracket_range_to);
    // update
    $query = checkUpdate($sss_bracket);
    $returnData["data"] = [];
    $returnData["count"] = $query->rowCount();
    $returnData["SSS Bracket ID"] =$sss_bracket->sss_bracket_aid;
    $returnData["success"] = true;
    return $returnData;
}

// return 404 error if endpoint not available
checkEnpoint();

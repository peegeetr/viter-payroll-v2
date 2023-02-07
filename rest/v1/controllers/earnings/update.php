<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$earnings = new Earnings($conn);
// get $_GET data
// check if earningsid is in the url e.g. /earningsid/1
$error = [];
$returnData = [];
if (array_key_exists("earningsid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get earningsid from query string
    $earnings->earnings_aid = $_GET['earningsid'];
    $earnings->earnings_paytype_id = checkIndex($data, "earnings_paytype_id");
    $earnings->earnings_payitem_id = checkIndex($data, "earnings_payitem_id");
    $earnings->earnings_amount = checkIndex($data, "earnings_amount");
    $earnings->earnings_frequency = addslashes(trim($data["earnings_frequency"]));
    $earnings->earnings_is_installment = checkIndex($data, "earnings_is_installment");
    $earnings->earnings_number_of_installment = checkIndex($data, "earnings_number_of_installment");
    $earnings->earnings_start_pay_date = checkIndex($data, "earnings_start_pay_date");
    $earnings->earnings_end_pay_date = checkIndex($data, "earnings_end_pay_date");
    $earnings->earnings_datetime = date("Y-m-d H:i:s");

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($earnings->earnings_aid);
    // update
    $query = checkUpdate($earnings);
    $returnData["data"] = [];
    $returnData["count"] = $query->rowCount();
    $returnData["role ID"] = $earnings->earnings_aid;
    $returnData["success"] = true;
    return $returnData;
}

// return 404 error if endpoint not available
checkEnpoint();

<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$deductions = new Deductions($conn);
// get $_GET data
// check if deductionid is in the url e.g. /deductionid/1
$error = [];
$returnData = [];
if (array_key_exists("deductionid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get deductionid from query string
    $deductions->deduction_aid = $_GET['deductionid'];
    $deductions->deduction_paytype_id = checkIndex($data, "deduction_paytype_id");
    $deductions->deduction_payitem_id = checkIndex($data, "deduction_payitem_id");
    $deductions->deduction_amount = checkIndex($data, "deduction_amount");
    $deductions->deduction_frequency = addslashes(trim($data["deduction_frequency"]));
    $deductions->deduction_is_installment = checkIndex($data, "deduction_is_installment");
    $deductions->deduction_number_of_installment = checkIndex($data, "deduction_number_of_installment");
    $deductions->deduction_start_pay_date = checkIndex($data, "deduction_start_pay_date");
    $deductions->deduction_end_pay_date = checkIndex($data, "deduction_end_pay_date");
    $deductions->deduction_datetime = date("Y-m-d H:i:s");

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($deductions->deduction_aid);
    // update
    $query = checkUpdate($deductions);
    $returnData["data"] = [];
    $returnData["count"] = $query->rowCount();
    $returnData["earning ID"] = $deductions->deduction_aid;
    $returnData["success"] = true;
    return $returnData;
}

// return 404 error if endpoint not available
checkEnpoint();

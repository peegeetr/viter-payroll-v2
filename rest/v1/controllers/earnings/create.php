<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$earnings = new Earnings($conn);
// get should not be present
if (array_key_exists("earningsid", $_GET)) {
    $response->setSuccess(false);
    $error['code'] = "404";
    $error['message'] = "Endpoint not found.";
    $error["success"] = false;
    return $error;
}
// check data
checkPayload($data);
// get data

$earnings->earnings_employee = addslashes(trim($data["earnings_employee"]));
$earnings->earnings_employee_id = checkIndex($data, "earnings_employee_id");
$earnings->earnings_paytype_id = checkIndex($data, "earnings_paytype_id");
$earnings->earnings_payitem_id = checkIndex($data, "earnings_payitem_id");
$earnings->earnings_amount = checkIndex($data, "earnings_amount");
$earnings->earnings_frequency = addslashes(trim($data["earnings_frequency"]));
$earnings->earnings_number_of_installment = checkIndex($data, "earnings_number_of_installment");
$earnings->earnings_start_pay_date = checkIndex($data, "earnings_start_pay_date");
$earnings->earnings_end_pay_date = checkIndex($data, "earnings_end_pay_date");
$earnings->earnings_is_active = 1;
$earnings->earnings_created = date("Y-m-d");
$earnings->earnings_datetime = date("Y-m-d H:i:s");

$allEmployee = $data["employee"];

if ($earnings->earnings_employee == "all") {
    // create employee to pending all
    for ($i = 0; $i < count($allEmployee); $i++) {
        $employee_lname = $allEmployee[$i]["employee_lname"];
        $employee_fname = $allEmployee[$i]["employee_fname"];

        $earnings->earnings_employee = "$employee_lname $employee_fname";
        $earnings->earnings_employee_id = $allEmployee[$i]["employee_aid"];
        // create
        $query = checkCreate($earnings);
    }
} else {
    // create
    $query = checkCreate($earnings);
}

$returnData = [];
$returnData["data"] = [];
$returnData["count"] = $query->rowCount();
$returnData["Role ID"] = $earnings->lastInsertedId;
$returnData["GET"] = $_GET;
$returnData["success"] = true;
return $returnData;

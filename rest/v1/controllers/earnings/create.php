<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$earnings = new Earnings($conn);
$response = new Response();
// get should not be present
if (array_key_exists("earningsid", $_GET)) {
    checkEnpoint();
}
// check data
checkPayload($data);
// get data

$earnings->earnings_payroll_id = checkIndex($data, "earnings_payroll_id");
$earnings->earnings_employee = checkIndex($data, "payroll_employee");
$earnings->earnings_employee_id = checkIndex($data, "earnings_employee_id");
$earnings->earnings_paytype_id = checkIndex($data, "earnings_paytype_id");
$earnings->earnings_payitem_id = checkIndex($data, "earnings_payitem_id");
$earnings->earnings_amount = checkIndex($data, "earnings_amount");
$earnings->earnings_frequency = checkIndex($data, "earnings_frequency");
$earnings->earnings_number_of_installment = checkIndex($data, "earnings_number_of_installment");
$earnings->earnings_is_installment = checkIndex($data, "is_installment");
$earnings->earnings_start_pay_date = checkIndex($data, "earnings_start_pay_date");
$earnings->earnings_end_pay_date = checkIndex($data, "earnings_end_pay_date");
$earnings->earnings_is_paid = 0;
$earnings->earnings_created = date("Y-m-d H:i:s");
$earnings->earnings_datetime = date("Y-m-d H:i:s");

$allEmployee = $data["employee"];
$allLeave = $data["payLeave"];

// check array length
if (count($allLeave) === 0) {
    checkEnpoint();
}
// check name
isNameExist($earnings, "Pay item for $earnings->earnings_employee is ");

// create if not data from hris and all employee
if ($data["payitem_is_hris"] === "0" && $earnings->earnings_employee == "all") {
    for ($e = 0; $e < count($allEmployee); $e++) {
        $employee_lname = $allEmployee[$e]["employee_lname"];
        $employee_fname = $allEmployee[$e]["employee_fname"];

        $earnings->earnings_employee = "$employee_lname $employee_fname";
        $earnings->earnings_employee_id = $allEmployee[$e]["employee_aid"];
        $query = checkCreate($earnings);
    }
}

// create if data is from hris
// payitem 19 = leave
if ($data["payitem_is_hris"] === "1" && $earnings->earnings_payitem_id === "19") {
    for ($l = 0; $l < count($allLeave); $l++) {
        $employee_lname = $allLeave[$l]["employee_lname"];
        $employee_fname = $allLeave[$l]["employee_fname"];

        $earnings->earnings_employee = "$employee_lname $employee_fname";
        $earnings->earnings_employee_id = $allLeave[$l]["leave_list_employee_id"];
        $query = checkCreate($earnings);

        $returnData = [];
        $returnData["data"] = [];
        $returnData["count"] = $query->rowCount();
        $returnData["earning ID"] = $earnings->lastInsertedId;
        $returnData["GET"] = $_GET;
        $returnData["success"] = true;
        return $returnData;
    }
} else {
    // create if specific employee and not data from hris
    $query = checkCreate($earnings);
}



$returnData = [];
$returnData["data"] = [];
$returnData["count"] = $query->rowCount();
$returnData["earning ID"] = $earnings->lastInsertedId;
$returnData["GET"] = $_GET;
$returnData["success"] = true;
return $returnData;

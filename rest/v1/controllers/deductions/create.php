<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$deductions = new Deductions($conn);
// get should not be present
if (array_key_exists("deductionsid", $_GET)) {
    $response->setSuccess(false);
    $error['code'] = "404";
    $error['message'] = "Endpoint not found.";
    $error["success"] = false;
    return $error;
}
// check data
checkPayload($data);
// get data

$deductions->deduction_payroll_id = checkIndex($data, "deduction_payroll_id");
$deductions->deduction_employee = checkIndex($data, "deduction_employee");
$deductions->deduction_employee_id = checkIndex($data, "deduction_employee_id");
$deductions->deduction_paytype_id = checkIndex($data, "deduction_paytype_id");
$deductions->deduction_payitem_id = checkIndex($data, "deduction_payitem_id");
$deductions->deduction_amount = checkIndex($data, "deduction_amount");
$deductions->deduction_frequency = checkIndex($data, "deduction_frequency");
$deductions->deduction_number_of_installment = checkIndex($data, "deduction_number_of_installment");
$deductions->deduction_is_installment = checkIndex($data, "deduction_is_installment");
$deductions->deduction_start_pay_date = checkIndex($data, "deduction_start_pay_date");
$deductions->deduction_end_pay_date = checkIndex($data, "deduction_end_pay_date");
$deductions->deduction_is_paid = 0;
$deductions->deduction_created = date("Y-m-d H:i:s");
$deductions->deduction_datetime = date("Y-m-d H:i:s");

$allEmployee = $data["employee"];
$allLeave = $data["payLeave"];
$name = "Pay item for $deductions->deduction_employee is ";
// check name
isNameExist($deductions, $name);

// create if by employee and not data from hris
$query = checkCreate($deductions);

$returnData = [];
$returnData["data"] = [];
$returnData["count"] = $query->rowCount();
$returnData["earning ID"] = $deductions->lastInsertedId;
$returnData["GET"] = $_GET;
$returnData["success"] = true;
return $returnData;

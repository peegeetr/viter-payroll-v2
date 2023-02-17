<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$deductions = new Deductions($conn);
// get should not be present
if (array_key_exists("deductionsid", $_GET)) {
    checkEnpoint();
}
// check data
checkPayload($data);
// get data

$deductions->deduction_payroll_id = checkIndex($data, "deduction_payroll_id");
$deductions->deduction_payroll_type_id = checkIndex($data, "deduction_payroll_type_id");
$deductions->deduction_employee = checkIndex($data, "payroll_employee");
$deductions->deduction_employee_id = checkIndex($data, "deduction_employee_id");
$deductions->deduction_paytype_id = checkIndex($data, "deduction_paytype_id");
$deductions->deduction_payitem_id = checkIndex($data, "deduction_payitem_id");
$deductions->deduction_amount = checkIndex($data, "deduction_amount");
$deductions->deduction_frequency = checkIndex($data, "deduction_frequency");
$deductions->deduction_number_of_installment = checkIndex($data, "deduction_number_of_installment");
$deductions->deduction_is_installment = checkIndex($data, "is_installment");
$deductions->deduction_start_pay_date = checkIndex($data, "deduction_start_pay_date");
$deductions->deduction_end_pay_date = checkIndex($data, "deduction_end_pay_date");
$deductions->deduction_is_paid = 0;
$deductions->deduction_created = date("Y-m-d H:i:s");
$deductions->deduction_datetime = date("Y-m-d H:i:s");

$allEmployee = $data["employee"];
// check name
isNameExist($deductions, "Pay item for $deductions->deduction_employee is ");

// create if all employee
if ($deductions->deduction_employee == "all") {
    for ($e = 0; $e < count($allEmployee); $e++) {
        $employee_lname = $allEmployee[$e]["employee_lname"];
        $employee_fname = $allEmployee[$e]["employee_fname"];

        $deductions->deduction_employee = "{$employee_lname}, {$employee_fname}";
        $deductions->deduction_employee_id = $allEmployee[$e]["employee_aid"];
        $query = checkCreate($deductions);
    }
} else {
    // create if specific employee  
    $deductions->deduction_employee = explode(" ", $data["payroll_employee"])[0] . ", " . explode(" ", $data["payroll_employee"])[1];
    $query = checkCreate($deductions);
}

returnSuccess($deductions, "Deductions", $query);

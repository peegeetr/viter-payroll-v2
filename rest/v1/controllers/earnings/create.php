<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$earnings = new Earnings($conn);
// get should not be present
if (array_key_exists("earningsid", $_GET)) {
    checkEnpoint();
}
// check data
checkPayload($data);
// get data

$earnings->earnings_payroll_id = checkIndex($data, "earnings_payroll_id");
$earnings->earnings_payroll_type_id = checkIndex($data, "earnings_payroll_type_id");
$earnings->earnings_employee = checkIndex($data, "earnings_employee");
$earnings->earnings_employee_id = checkIndex($data, "earnings_employee_id");
$earnings->earnings_paytype_id = checkIndex($data, "earnings_paytype_id");
$earnings->earnings_payitem_id = checkIndex($data, "earnings_payitem_id");
$earnings->earnings_amount = checkIndex($data, "earnings_amount");
$earnings->earnings_frequency = checkIndex($data, "earnings_frequency");
$earnings->earnings_number_of_installment = checkIndex($data, "earnings_number_of_installment");
$earnings->earnings_is_installment = checkIndex($data, "is_installment");
$earnings->earnings_start_pay_date = checkIndex($data, "earnings_start_pay_date");
$earnings->earnings_end_pay_date = checkIndex($data, "earnings_end_pay_date");
$earnings->earnings_details = checkIndex($data, "earnings_details");
$earnings->earnings_is_paid = 0;
$earnings->earnings_created = date("Y-m-d H:i:s");
$earnings->earnings_datetime = date("Y-m-d H:i:s");

$allEmployee = $data["employee"];
$allLeave = $data["payLeave"];
$allUnPaidLeave = $data["unPaidLeave"];
$allOvertimeLeave = $data["overtimeLeave"];

// create if not data from hris and all employee

if ($data["payitem_is_hris"] === "0" && $earnings->earnings_employee === "all") {
    // check array length
    if (count($allEmployee) === 0) {
        checkEnpoint();
    }
    for ($e = 0; $e < count($allEmployee); $e++) {
        $employee_lname = $allEmployee[$e]["employee_lname"];
        $employee_fname = $allEmployee[$e]["employee_fname"];

        $earnings->earnings_employee = "{$employee_lname}, {$employee_fname}";
        $earnings->earnings_employee_id = $allEmployee[$e]["employee_aid"];

        $query = $earnings->checkName();

        if ($query->rowCount() !== count($allEmployee)) {
            continue;
        }

        //     isNameExist($earnings, "Pay item for $earnings->earnings_payroll_id is ");
        $query = checkCreate($earnings);
    }
    returnSuccess($earnings, "Earnings", $query);
}

// create if not data from hris and specific employee

if ($data["payitem_is_hris"] === "0" && $earnings->earnings_employee !== "all") {
    // create if specific employee and not data from hris
    $earnings->earnings_employee = explode(" ", $data["earnings_employee"])[0] . ", " . explode(" ", $data["earnings_employee"])[1];
    // check name
    isNameExist($earnings, "Pay item for $earnings->earnings_employee is ");

    $query = checkCreate($earnings);
    returnSuccess($earnings, "Earnings", $query);
}

// create if data is from hris
// payitem 19 = leave 
if ($data["payitem_is_hris"] === "1" && $earnings->earnings_payitem_id === "19") {
    // check array length
    if (count($allLeave) === 0) {
        checkEnpoint();
    }
    for ($l = 0; $l < count($allLeave); $l++) {
        // check name
        $earnings->earnings_employee_id = $allLeave[$l]["employeId"];
        $earnings->earnings_employee = $allLeave[$l]["name"];
        $earnings->earnings_amount = $allLeave[$l]["amount"];
        $earnings->earnings_details = $allLeave[$l]["details"];
        isHRISImportExist($earnings, "HRIS Leave data for $earnings->earnings_payroll_id is ");
        $query = checkCreate($earnings);
    }
    returnSuccess($earnings, "Earnings", $query);
}

// create if data is from hris
// payitem 18 = Overtime 
if ($data["payitem_is_hris"] === "1" && $earnings->earnings_payitem_id === "18") {
    // check array length
    if (count($allOvertimeLeave) === 0) {
        checkEnpoint();
    }
    for ($l = 0; $l < count($allOvertimeLeave); $l++) {
        // check name
        $earnings->earnings_employee_id = $allOvertimeLeave[$l]["employeId"];
        $earnings->earnings_employee = $allOvertimeLeave[$l]["name"];
        $earnings->earnings_amount = $allOvertimeLeave[$l]["amount"];
        $earnings->earnings_details = $allOvertimeLeave[$l]["details"];
        isHRISImportExist($earnings, "HRIS Overtime data for $earnings->earnings_payroll_id is ");
        $query = checkCreate($earnings);
    }
    returnSuccess($earnings, "Earnings", $query);
}

// create if data is from hris
// payitem 36 = absences 
if ($data["payitem_is_hris"] === "1" && $earnings->earnings_payitem_id === "36") {
    // check array length
    if (count($allUnPaidLeave) === 0) {
        checkEnpoint();
    }
    for ($u = 0; $u < count($allUnPaidLeave); $u++) {
        // check name
        $earnings->earnings_employee_id = $allUnPaidLeave[$u]["employeId"];
        $earnings->earnings_employee = $allUnPaidLeave[$u]["name"];
        $earnings->earnings_amount = $allUnPaidLeave[$u]["amount"];
        $earnings->earnings_details = $allUnPaidLeave[$u]["unpaidDetails"];
        isHRISImportExist($earnings, "HRIS absences data for $earnings->earnings_payroll_id is ");
        $query = checkCreate($earnings);
    }
    returnSuccess($earnings, "Earnings", $query);
}

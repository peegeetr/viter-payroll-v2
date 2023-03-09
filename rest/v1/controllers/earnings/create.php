<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$earnings = new Earnings($conn);
// get should not be present
if (array_key_exists("earningsid", $_GET)) {
    checkEndpoint();
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
$earnings->earnings_hris_undertime_out = 0;
$earnings->earnings_is_paid = 0;
$earnings->earnings_created = date("Y-m-d H:i:s");
$earnings->earnings_datetime = date("Y-m-d H:i:s");

$allEmployee = $data["employee"];
$allLeave = $data["payLeave"];
$allUnPaidLeave = $data["unPaidLeave"];
$allOvertimeLeave = $data["overtimeLeave"];
$allUndertime = $data["undertime"];

// create if not data from hris and all employee

if ($data["payitem_is_hris"] === "0" && $earnings->earnings_employee === "all") {
    $newCount = 0;
    // check array length
    if (count($allEmployee) === 0) {
        checkEndpoint();
    }
    for ($e = 0; $e < count($allEmployee); $e++) {
        $employee_lname = $allEmployee[$e]["employee_lname"];
        $employee_fname = $allEmployee[$e]["employee_fname"];

        $earnings->earnings_employee = "{$employee_lname}, {$employee_fname}";
        $earnings->earnings_employee_id = $allEmployee[$e]["employee_aid"];
        $earnings->earnings_hris_date =  date("Y-m-d");

        $query = $earnings->checkName();
        if ($query->rowCount() > 0) {
            continue;
        } else {
            $newCount++;
            $query = checkCreate($earnings);
        }
        // isNameExist($earnings, "Pay item for $earnings->earnings_payroll_id is ");
        // $query = checkCreate($earnings);
    }
    returnSuccess($earnings, "Earnings", $query, $newCount);
}

// create if not data from hris and specific employee

if ($data["payitem_is_hris"] === "0" && $earnings->earnings_employee !== "all") {
    // create if specific employee and not data from hris
    $earnings->earnings_employee = explode(" ", $data["earnings_employee"])[0] . ", " . explode(" ", $data["earnings_employee"])[1];
    $earnings->earnings_hris_date =  date("Y-m-d");
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
        checkEndpoint();
    }
    for ($l = 0; $l < count($allLeave); $l++) {
        // check name
        $earnings->earnings_employee_id = $allLeave[$l]["employeId"];
        $earnings->earnings_employee = $allLeave[$l]["name"];
        $earnings->earnings_amount = $allLeave[$l]["amount"];
        $earnings->earnings_details = $allLeave[$l]["details"];
        $earnings->earnings_hris_date = $allLeave[$l]["hrisStartDate"];
        $earnings->earnings_start_pay_date = $allLeave[$l]["hrisStartDate"];
        $earnings->earnings_end_pay_date = $allLeave[$l]["hrisEndDate"];
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
        checkEndpoint();
    }
    for ($o = 0; $o < count($allOvertimeLeave); $o++) {
        // check name
        $earnings->earnings_employee_id = $allOvertimeLeave[$o]["employeId"];
        $earnings->earnings_employee = $allOvertimeLeave[$o]["name"];
        $earnings->earnings_amount = $allOvertimeLeave[$o]["amount"];
        $earnings->earnings_details = $allOvertimeLeave[$o]["details"];
        $earnings->earnings_hris_date = $allOvertimeLeave[$o]["hrisDate"];
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
        checkEndpoint();
    }
    for ($unp = 0; $unp < count($allUnPaidLeave); $unp++) {
        // check name
        $earnings->earnings_employee_id = $allUnPaidLeave[$unp]["employeId"];
        $earnings->earnings_employee = $allUnPaidLeave[$unp]["name"];
        $earnings->earnings_amount = $allUnPaidLeave[$unp]["amount"];
        $earnings->earnings_hris_date = $allUnPaidLeave[$unp]["hrisStartDate"];
        $earnings->earnings_start_pay_date = $allUnPaidLeave[$unp]["hrisStartDate"];
        $earnings->earnings_end_pay_date = $allUnPaidLeave[$unp]["hrisEndDate"];
        $earnings->earnings_details = $allUnPaidLeave[$unp]["unpaidDetails"];
        isHRISImportExist($earnings, "HRIS absences data for $earnings->earnings_payroll_id is ");
        $query = checkCreate($earnings);
    }
    returnSuccess($earnings, "Earnings", $query);
}

// create if data is from hris
// payitem 43 = undertime 
if ($data["payitem_is_hris"] === "1" && $earnings->earnings_payitem_id === "43") {
    // check array length
    if (count($allUndertime) === 0) {
        checkEndpoint();
    }
    for ($u = 0; $u < count($allUndertime); $u++) {
        // check name
        $earnings->earnings_employee_id = $allUndertime[$u]["employeId"];
        $earnings->earnings_employee = $allUndertime[$u]["name"];
        $earnings->earnings_amount = $allUndertime[$u]["amount"];
        $earnings->earnings_hris_date = $allUndertime[$u]["hrisDate"];
        $earnings->earnings_hris_undertime_out = $allUndertime[$u]["hrisUndertimeOut"];
        $earnings->earnings_details = $allUndertime[$u]["details"];
        isHRISImportExist($earnings, "HRIS absences data for $earnings->earnings_payroll_id is ");
        $query = checkCreate($earnings);
    }
    returnSuccess($earnings, "Earnings", $query);
}

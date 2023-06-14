<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payroll = new Payroll($conn);
// get should not be present
if (array_key_exists("payrollid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$id = "";
$lastMemberId = $payroll->readLastPayrollId();
if ($lastMemberId->rowCount() == 0) {
    $id = "PR-001";
} else {
    $row = $lastMemberId->fetch(PDO::FETCH_ASSOC);
    extract($row);
    $existingMeberId = explode("-", $payroll_id);
    $lastId =  intval($existingMeberId[1]) + 1;

    if ($lastId < 10) {
        $id = "PR-00" . $lastId;
    } elseif ($lastId < 100) {
        $id = "PR-0" . $lastId;
    } else {
        $id = "PR-$lastId";
    }
}

checkKeyword($id);
$payroll->payroll_id = $id;
$payroll->payroll_start_date = checkIndex($data, "payroll_start_date");
$payroll->payroll_end_date = checkIndex($data, "payroll_end_date");
$payroll->payroll_pay_date = checkIndex($data, "payroll_pay_date");
$payroll->payroll_category_type = checkIndex($data, "payroll_category_type");
$payroll->payroll_is_paid = 0;
$payroll->payroll_created = date("Y-m-d H:i:s");
$payroll->payroll_datetime = date("Y-m-d H:i:s");

$isDecMonth = date("m");
$allEmployee = $data["employee"];
$bonusId = $data["bonusId"];

// if not december check if there's an existing payroll draft 
// any payroll type
if ($isDecMonth != 12) {
    isPayrollType($payroll);
}

// if ($isDecMonth == 12) {
//     if ($payroll->payroll_category_type === $bonusId) {
//         $response = new Response();
//         $error = [];
//         $response->setSuccess(false);
//         $error["count"] = 0;
//         $error["success"] = false;
//         $error['error'] = "Please complete drafts first before creating bonus payroll type.";
//         $response->setData($error);
//         $response->send();
//         exit;
//     }
// }

// // validate date
checkDateExist($payroll);
// create employee name and id
for ($i = 0; $i < count($allEmployee); $i++) {
    $employee_lname = $allEmployee[$i]["employee_lname"];
    $employee_fname = $allEmployee[$i]["employee_fname"];

    $payroll->payroll_list_employee_name = "{$employee_lname}, {$employee_fname}";
    $payroll->payroll_list_employee_id = $allEmployee[$i]["employee_aid"];
    $payroll->payroll_list_employee_email = $allEmployee[$i]["employee_job_email"];
    $payroll->payroll_list_employee_salary = $allEmployee[$i]["employee_job_salary"];
    $payroll->payroll_list_night_diff_per_day = $allEmployee[$i]["employee_job_nd_per_day"];
    $payroll->payroll_list_employee_work_on_holiday = $allEmployee[$i]["employee_job_work_reg_hol"];
    $payroll->payroll_list_deminimis = $allEmployee[$i]["employee_job_deminimis"];
    $payroll->payroll_list_pagibig_additional = $allEmployee[$i]["employee_job_pagibig_amount"];
    $payroll->payroll_list_employee_department = $allEmployee[$i]["department_name"];
    $payroll->payroll_list_deduc_employee_sss = $allEmployee[$i]["employee_job_sss_deduc"];
    $payroll->payroll_list_deduc_employee_pgbg = $allEmployee[$i]["employee_job_pag_ibig_deduc"];
    $payroll->payroll_list_deduc_employee_philhealth = $allEmployee[$i]["employee_job_phil_health_deduc"];
    $payroll->payroll_list_employee_account_number = $allEmployee[$i]["employee_job_account_number"];
    // create payroll list
    if ($allEmployee[$i]["employee_job_payroll_elegibility"] === 1) {
        checkCreatePayrollList($payroll);
    }
}

// create
$query = checkCreate($payroll);


returnSuccess($payroll, "Payroll", $query);

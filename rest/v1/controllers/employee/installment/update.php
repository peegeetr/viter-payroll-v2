<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$installment = new EmployeeInstallment($conn);
// get $_GET data
// check if employeeInstallmentId is in the url e.g. /announcement/1
$error = [];
$returnData = [];
if (array_key_exists("employeeInstallmentId", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get employeeInstallmentId from query string
    $installment->employee_installment_aid = $_GET['employeeInstallmentId'];
    $installment->employee_installment_actual_pay_date = checkIndex($data, "employee_installment_actual_pay_date");
    $installment->employee_installment_start_date = checkIndex($data, "employee_installment_start_date");
    $installment->employee_installment_end_date = checkIndex($data, "employee_installment_end_date");
    $installment->employee_installment_amount = checkIndex($data, "employee_installment_amount");
    $installment->employee_installment_details = checkIndex($data, "employee_installment_details");
    $installment->employee_installment_number_of_months = checkIndex($data, "employee_installment_number_of_months");
    $installment->employee_installment_datetime = date("Y-m-d H:i:s");

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($installment->employee_installment_aid);
    // check name 

    $total_month = checkIndex($data, "total_month");

    if ($total_month >= $installment->employee_installment_number_of_months) {
        $installment->employee_installment_status = 2;
    } else {
        $installment->employee_installment_status = checkIndex($data, "employee_installment_status");
    }
    // update
    $query = checkUpdate($installment);
    returnSuccess($installment, "Announcement", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

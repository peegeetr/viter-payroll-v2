<?php

// set http header 
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/payroll/list/PayrollList.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$payrollList = new PayrollList($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// check if userotherid is in the url e.g. /user/1
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("listpayrollid", $_GET)) {
        // check data
        checkPayload($data);
        // get task id from query string
        $payrollList->payroll_list_payroll_id = $_GET['listpayrollid'];
        $payrollList->payroll_list_is_paid = trim($data["isPaid"]);
        $payrollList->payroll_list_datetime = date("Y-m-d H:i:s");
        $payrollList->created = date("Y-m-d H:i:s");

        //check to see if payroll id (PR-001) in query string is not empty and less than 50 chars
        checkKeyword($payrollList->payroll_list_payroll_id);
        checkUpdateIsPaidPayroll($payrollList);
        $query = checkUpdateIsPaidPayrollList($payrollList);


        $allEarningsNumPayList = $data["earningsNumPayList"];
        $allDeducNumPayList = $data["deducNumPayList"];
        // installment optional deduction
        $allPagibigLoanList = $data["pagibigLoanList"];
        $allPagibigMP2List = $data["pagibigMP2List"];
        $allSSSLoanList = $data["sSSLoanList"];
        // installment other deduction
        $allTuitionList = $data["tuitionList"];
        $allTithesList = $data["tithesList"];


        //optional deduction installment
        //update pagibig Loan to completed 
        if ($allPagibigLoanList !== 0) {
            for ($pgbg = 0; $pgbg < count($allPagibigLoanList); $pgbg++) {
                $payrollList->employee_installment_aid = $allPagibigLoanList[$pgbg]["employee_installment_aid"];
                $payrollList->employee_installment_number_of_payrun = $allPagibigLoanList[$pgbg]["numOfPay"];

                $employee_installment_status = $allPagibigLoanList[$pgbg]["employee_installment_status"];
                $employee_installment_number_of_months = $allPagibigLoanList[$pgbg]["employee_installment_number_of_months"];
                $numMonths = $allPagibigLoanList[$pgbg]["numOfMonths"];
                // installemt start date DAY
                $installmentDayDate = explode("-", $allPagibigLoanList[$pgbg]["employee_installment_start_date"]);
                $installmentDay = intval($installmentDayDate[2]);
                // End pay date DAY
                $EndPayDayDate = explode("-", $allPagibigLoanList[$pgbg]["deduction_end_pay_date"]);
                $EndPayDay = intval($EndPayDayDate[2]);

                if (
                    $numMonths <= $employee_installment_number_of_months &&
                    $employee_installment_status === "0"
                ) {
                    checkUpdateDeductionInstallmentNumberOfPayrun($payrollList);
                }
                if (
                    $numMonths >= $employee_installment_number_of_months &&
                    $employee_installment_status === "0" && $installmentDay <= $EndPayDay
                ) {
                    $payrollList->employee_installment_status = 2;
                    checkUpdateDeductionInstallemnt($payrollList);
                }
            }
        }

        //optional deduction installment
        //update mp2 to completed 
        if ($allPagibigMP2List !== 0) {
            for ($mp2 = 0; $mp2 < count($allPagibigMP2List); $mp2++) {
                $payrollList->employee_installment_aid = $allPagibigMP2List[$mp2]["employee_installment_aid"];
                $payrollList->employee_installment_number_of_payrun = $allPagibigMP2List[$mp2]["numOfPay"];

                $employee_installment_status = $allPagibigMP2List[$mp2]["employee_installment_status"];
                $employee_installment_number_of_months = $allPagibigMP2List[$mp2]["employee_installment_number_of_months"];
                $numMonths = $allPagibigMP2List[$mp2]["numOfMonths"];
                // installemt start date DAY
                $installmentDayDate = explode("-", $allPagibigMP2List[$mp2]["employee_installment_start_date"]);
                $installmentDay = intval($installmentDayDate[2]);
                // End pay date DAY
                $EndPayDayDate = explode("-", $allPagibigMP2List[$mp2]["deduction_end_pay_date"]);
                $EndPayDay = intval($EndPayDayDate[2]);

                if (
                    $numMonths <= $employee_installment_number_of_months &&
                    $employee_installment_status === "0"
                ) {
                    checkUpdateDeductionInstallmentNumberOfPayrun($payrollList);
                }
                if (
                    $numMonths >= $employee_installment_number_of_months &&
                    $employee_installment_status === "0" && $installmentDay <= $EndPayDay
                ) {
                    $payrollList->employee_installment_status = 2;
                    checkUpdateDeductionInstallemnt($payrollList);
                }
            }
        }

        //optional deduction installment
        //update sss loan to completed 
        if ($allSSSLoanList !== 0) {
            for ($sss = 0; $sss < count($allSSSLoanList); $sss++) {
                $payrollList->employee_installment_aid = $allSSSLoanList[$sss]["employee_installment_aid"];
                $payrollList->employee_installment_number_of_payrun = $allSSSLoanList[$sss]["numOfPay"];

                $employee_installment_status = $allSSSLoanList[$sss]["employee_installment_status"];
                $employee_installment_number_of_months = $allSSSLoanList[$sss]["employee_installment_number_of_months"];
                $numMonths = $allSSSLoanList[$sss]["numOfMonths"];
                // installemt start date DAY
                $installmentDayDate = explode("-", $allSSSLoanList[$sss]["employee_installment_start_date"]);
                $installmentDay = intval($installmentDayDate[2]);
                // End pay date DAY
                $EndPayDayDate = explode("-", $allSSSLoanList[$sss]["deduction_end_pay_date"]);
                $EndPayDay = intval($EndPayDayDate[2]);

                if (
                    $numMonths <= $employee_installment_number_of_months &&
                    $employee_installment_status === "0"
                ) {
                    checkUpdateDeductionInstallmentNumberOfPayrun($payrollList);
                }
                if (
                    $numMonths >= $employee_installment_number_of_months &&
                    $employee_installment_status === "0" && $installmentDay <= $EndPayDay
                ) {
                    $payrollList->employee_installment_status = 2;
                    checkUpdateDeductionInstallemnt($payrollList);
                }
            }
        }

        //other deduction installment
        //update fca tuition to completed 
        if ($allTuitionList !== 0) {
            for ($tu = 0; $tu < count($allTuitionList); $tu++) {
                $payrollList->employee_installment_aid = $allTuitionList[$tu]["employee_installment_aid"];
                $payrollList->employee_installment_number_of_payrun = $allTuitionList[$tu]["numOfPay"];

                $employee_installment_status = $allTuitionList[$tu]["employee_installment_status"];
                $employee_installment_number_of_months = $allTuitionList[$tu]["employee_installment_number_of_months"];
                $numMonths = $allTuitionList[$tu]["numOfMonths"];
                // installemt start date DAY
                $installmentDayDate = explode("-", $allTuitionList[$tu]["employee_installment_start_date"]);
                $installmentDay = intval($installmentDayDate[2]);
                // End pay date DAY
                $EndPayDayDate = explode("-", $allTuitionList[$tu]["deduction_end_pay_date"]);
                $EndPayDay = intval($EndPayDayDate[2]);

                if (
                    $numMonths <= $employee_installment_number_of_months &&
                    $employee_installment_status === "0"
                ) {
                    checkUpdateDeductionInstallmentNumberOfPayrun($payrollList);
                }
                if (
                    $numMonths >= $employee_installment_number_of_months &&
                    $employee_installment_status === "0" && $installmentDay <= $EndPayDay
                ) {
                    $payrollList->employee_installment_status = 2;
                    checkUpdateDeductionInstallemnt($payrollList);
                }
            }
        }

        //other deduction installment
        //update fwc Tithes to completed 
        if ($allTithesList !== 0) {
            for ($t = 0; $t < count($allTithesList); $t++) {
                $payrollList->employee_installment_aid = $allTithesList[$t]["employee_installment_aid"];
                $payrollList->employee_installment_number_of_payrun = $allTithesList[$t]["numOfPay"];

                $employee_installment_status = $allTithesList[$t]["employee_installment_status"];
                $employee_installment_number_of_months = $allTithesList[$t]["employee_installment_number_of_months"];
                $numMonths = $allTithesList[$t]["numOfMonths"];
                // installemt start date DAY
                $installmentDayDate = explode("-", $allTithesList[$t]["employee_installment_start_date"]);
                $installmentDay = intval($installmentDayDate[2]);
                // End pay date DAY
                $EndPayDayDate = explode("-", $allTithesList[$t]["deduction_end_pay_date"]);
                $EndPayDay = intval($EndPayDayDate[2]);

                if (
                    $numMonths <= $employee_installment_number_of_months &&
                    $employee_installment_status === "0"
                ) {
                    checkUpdateDeductionInstallmentNumberOfPayrun($payrollList);
                }
                if (
                    $numMonths >= $employee_installment_number_of_months &&
                    $employee_installment_status === "0" && $installmentDay <= $EndPayDay
                ) {
                    $payrollList->employee_installment_status = 2;
                    checkUpdateDeductionInstallemnt($payrollList);
                }
            }
        }

        // payBereavementList
        if ($allEarningsNumPayList !== 0) {
            for ($eNum = 0; $eNum < count($allEarningsNumPayList); $eNum++) {
                $payrollList->payitem_id = $allEarningsNumPayList[$eNum]["earnings_payitem_id"];
                $payrollList->payroll_list_employee_id = $allEarningsNumPayList[$eNum]["earnings_employee_id"];
                $payrollList->num_pay = $allEarningsNumPayList[$eNum]["earnings_num_pay"];
                $payrollList->payroll_list_is_paid = $allEarningsNumPayList[$eNum]["earnings_is_paid"];
                checkUpdateIsPaidEarnings($payrollList);
            }
        }

        if ($allDeducNumPayList !== 0) {
            for ($dNum = 0; $dNum < count($allDeducNumPayList); $dNum++) {
                $payrollList->payitem_id = $allDeducNumPayList[$dNum]["deduction_payitem_id"];
                $payrollList->payroll_list_employee_id = $allDeducNumPayList[$dNum]["deduction_employee_id"];
                $payrollList->num_pay = $allDeducNumPayList[$dNum]["deduction_num_pay"];
                $payrollList->payroll_list_is_paid = $allDeducNumPayList[$dNum]["deduction_is_paid"];
                checkUpdateIsPaidDeduction($payrollList);
            }
        }

        http_response_code(200);
        returnSuccess($payrollList, "Payroll type", $query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();

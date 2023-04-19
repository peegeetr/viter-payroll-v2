<?php

// create eaning from run payroll 
function checkCreateEarnings($object)
{
    $query = $object->createEarnings();
    checkQuery($query, "There's a problem processing your request. (create earnings)");
    return $query;
}

// create deductions from run payroll 
function checkCreateDeductions($object)
{
    $query = $object->createDeductions();
    checkQuery($query, "There's a problem processing your request. (create Deduction)");
    return $query;
}

// Update Payroll to paid
function checkUpdateIsPaidPayroll($object)
{
    $query = $object->isPaidPayroll();
    checkQuery($query, "There's a problem processing your request. (update payroll to paid)");
    return $query;
}
// Update Payroll List to paid
function checkUpdateIsPaidPayrollList($object)
{
    $query = $object->isPaidPayrollList();
    checkQuery($query, "There's a problem processing your request. (update payroll list to paid)");
    return $query;
}

// Update earning to paid
function checkUpdateIsPaidEarnings($object)
{
    $query = $object->updateIsPaidEarnings();
    checkQuery($query, "There's a problem processing your request. (update earning to paid)");
    return $query;
}

// Update deduction to paid
function checkUpdateIsPaidDeduction($object)
{
    $query = $object->updateIsPaidDeduction();
    checkQuery($query, "There's a problem processing your request. (update deduction to paid)");
    return $query;
}

// delete not installment earnings 
function checkDeleteNotInstallmentEarnings($object)
{
    $query = $object->deleteNotInstallmentEarnings();
    checkQuery($query, "There's a problem processing your request. (delete not installment earnings)");
    return $query;
}

// delete earnings 
function checkDeleteEarnings($object)
{
    $query = $object->deleteEarnings();
    checkQuery($query, "There's a problem processing your request. (delete earnings)");
    return $query;
}

// delete not installment deductions 
function checkDeleteNotInstallmentDeductions($object)
{
    $query = $object->deleteNotInstallmentDeductions();
    checkQuery($query, "There's a problem processing your request. (delete not installment deductions)");
    return $query;
}

// delete deductions 
function checkDeleteDeductions($object)
{
    $query = $object->deleteDeductions();
    checkQuery($query, "There's a problem processing your request. (delete deductions)");
    return $query;
}

// Read all
function checkReadAllSummary($object)
{
    $query = $object->readAllSummary();
    checkQuery($query, "Empty records.(Read Summary)");
    return $query;
}

// Read limit
function checkReadSummaryLimit($object)
{
    $query = $object->readSummaryLimit();
    checkQuery($query, "Empty records.(Summary Limit)");
    return $query;
}

// filter by date
function checkReadSummaryByDate($object)
{
    $query = $object->readSummaryByDate();
    checkQuery($query, "Empty records. (payroll list limit by date)");
    return $query;
}

// filter by employee id and date
function checkReadSummaryBenefitsByEmpId($object)
{
    $query = $object->readSummaryBenefitsByEmpId();
    checkQuery($query, "Empty records. (payroll list limit by employee id and date)");
    return $query;
}

// Read by emp id
function checkReadPayslipEmpId($object)
{
    $query = $object->readPayslipEmpId();
    checkQuery($query, "Empty records (Read payslip by employee id).");
    return $query;
}
// Read limit by emp id 
function checkReadPayslipEmpIdLimit($object)
{
    $query = $object->readPayslipEmpIdLimit();
    checkQuery($query, "Empty records (Read limit payslip by employee id).");
    return $query;
}

// Report Benefits Filter
function checkReadReportBenefitsByDate($object)
{
    $query = $object->readReportBenefitsByDate();
    checkQuery($query, "Empty records. (read report benefits by date)");
    return $query;
}

// Report Benefits by employee id Filter
function checkReadReportBenefitsByEmpId($object)
{
    $query = $object->readReportBenefitsByEmpId();
    checkQuery($query, "Empty records. (read report benefits by employee id and date)");
    return $query;
}


// REPORT Monthly WTAX filter all employee by date
function checkReadReportMonthlyWtaxAllEmployeeByDate($object)
{
    $query = $object->readReportMonthlyWtaxAllEmployeeByDate();
    checkQuery($query, "Empty records. (Read report wtax all employee by date)");
    return $query;
}

// REPORT Monthly WTAX filter by employee id by date
function checkReadReportMonthlyWtaxByEmployeeIdByEmpId($object)
{
    $query = $object->readReportMonthlyWtaxByEmployeeIdByEmpId();
    checkQuery($query, "Empty records. (Read report wtax limit by employee id and date)");
    return $query;
}

// REPORT Yearly WTAX filter all employee by date
function checkReadReportYearlyWtaxAllEmployeeByDate($object)
{
    $query = $object->readReportYearlyWtaxAllEmployeeByDate();
    checkQuery($query, "Empty records. (Read report wtax all employee by date)");
    return $query;
}

// REPORT Yearly WTAX filter by employee id by date
function checkReadReportYearlyWtaxByEmployeeIdByEmpId($object)
{
    $query = $object->readReportYearlyWtaxByEmployeeIdByEmpId();
    checkQuery($query, "Empty records. (Read report wtax limit by employee id and date)");
    return $query;
}

// REPORT Employee payrun filter all employee by date
function checkReadEmployeePayrunAllEmployeeByDate($object)
{
    $query = $object->readEmployeePayrunAllEmployeeByDate();
    checkQuery($query, "Empty records. (Read report Employee Payrun all employee by date)");
    return $query;
}

// REPORT Employee payrun filter by employee id by date
function checkReadEmployeePayrunByEmployeeIdByEmpId($object)
{
    $query = $object->readEmployeePayrunByEmployeeIdByEmpId();
    checkQuery($query, "Empty records. (Read report Employee Payrun limit by employee id and date)");
    return $query;
}

// Read all payroll list in a year for 13th month
function checkReadAllPayrollListCompute13thMonth($object, $year, $payroll_category_type)
{
    $query = $object->readAllPayrollListCompute13thMonth($year, $payroll_category_type);
    checkQuery($query, "Empty records. (Read all payroll list in a year for 13th month)");
    return $query;
}

// Update 
function checkUpdate13thMonth($object)
{
    $query = $object->update13thMonth();
    checkQuery($query, "There's a problem processing your request. (update payroll list 13th month)");
    return $query;
}

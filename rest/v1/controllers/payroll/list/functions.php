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

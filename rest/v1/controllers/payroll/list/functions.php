<?php

// create payroll list

function checkCreateEarnings($object)
{
    $query = $object->createEarnings();
    checkQuery($query, "There's a problem processing your request. (create earnings)");
    return $query;
}

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

// delete earnings 
function checkDeleteEarnings($object)
{
    $query = $object->deleteEarnings();
    checkQuery($query, "There's a problem processing your request. (delete earnings)");
    return $query;
}

// delete deductions 
function checkDeleteDeductions($object)
{
    $query = $object->deleteDeductions();
    checkQuery($query, "There's a problem processing your request. (delete deductions)");
    return $query;
}

<?php

// create payroll list

function checkCreatePayrollList($object)
{
    $query = $object->createPayrollList();
    checkQuery($query, "There's a problem processing your request. (create list)");
    return $query;
}

// delete payroll list 
function checkDeletePayrollList($object)
{
    $query = $object->deletePayrollList();
    checkQuery($query, "There's a problem processing your request. (delete list)");
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

// check name
function isEarningType($object, $name)
{
    $query = $object->checkEarningType();
    $count = $query->rowCount();
    checkExistence($count, "Payroll draft already exist. Please complete it first before creating a new draft.");
}


// Read by draft
function checkReadByDraft($object)
{
    $query = $object->readByDraft();
    checkQuery($query, "Empty records (draft).");
    return $query;
}

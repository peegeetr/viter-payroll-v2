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

// check name
function isEarningType($object, $name)
{
    $query = $object->checkEarningType();
    $count = $query->rowCount();
    checkExistence($count, "You cannot create {$name} because you have already draft.");
}

// Read by draft
function checkReadByDraft($object)
{
    $query = $object->readByDraft();
    checkQuery($query, "Empty records (draft).");
    return $query;
}
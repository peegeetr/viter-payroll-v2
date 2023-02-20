<?php

// Read all Pr id in earnings
function isEarningsValidateId($object)
{
    $query = $object->checkValidateId();
    checkQuery($query, "Empty records (draft).");
    return $query;
}

// Read all Pr id in earnings
function checkEarningsPayrollId($object)
{
    $query = $object->checkEarningsPayrollId();
    checkQuery($query, "Empty records (earning payroll id).");
    return $query;
}

// check name
function isHRISImportExist($object, $name)
{
    $query = $object->checkHRISImportExist();
    $count = $query->rowCount();
    checkExistence($count, "{$name} already exist.");
}

<?php

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

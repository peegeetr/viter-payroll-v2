<?php

// employee

//read MP2 employees
function checkReadInstallmentByEmployeeId($object)
{
    $query = $object->readInstallmentByEmployeeId();
    checkQuery($query, "Empty records. (read installment employee by id)");
    return $query;
}

//read MP2 employees
function checkReadAllInstallmentByEmployeeId($object)
{
    $query = $object->readAllInstallmentByEmployeeId();
    checkQuery($query, "Empty records. (read all installment employee by id)");
    return $query;
}

//read MP2 employees
function checkReadAllInstallmentPending($object)
{
    $query = $object->readAllInstallmentPending();
    checkQuery($query, "Empty records. (read all installment pending)");
    return $query;
}

// Update Status
function checkUpdateStatus($object)
{
    $query = $object->updateStatus();
    checkQuery($query, "There's a problem processing your request. (update Status)");
    return $query;
}

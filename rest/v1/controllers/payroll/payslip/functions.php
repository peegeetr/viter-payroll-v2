<?php


// Read by draft
function checkReadPayslipById($object)
{
    $query = $object->readPayslipById();
    checkQuery($query, "Empty records (Read payslip by id).");
    return $query;
}

// Read by draft
function checkReadPayslipByPaytypeId($object)
{
    $query = $object->readPayslipById();
    checkQuery($query, "Empty records (Read payslip by id).");
    return $query;
}

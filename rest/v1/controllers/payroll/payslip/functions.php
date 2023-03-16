<?php


// Read by draft
function checkReadPayslipById($object)
{
    $query = $object->readPayslipById();
    checkQuery($query, "Empty records (Read payslip by id).");
    return $query;
}

function checkReadPayslipByPaytypeId($object)
{
    $query = $object->readPayslipByPaytypeId();
    checkQuery($query, "Empty records (Read payslip by paytype id).");
    return $query;
}

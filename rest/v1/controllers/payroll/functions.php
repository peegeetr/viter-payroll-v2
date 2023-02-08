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

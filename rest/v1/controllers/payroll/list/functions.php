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

// Update 
function checkUpdateEarnings($object)
{
    $query = $object->updateEarnings();
    checkQuery($query, "There's a problem processing your request. (update earnings)");
    return $query;
}

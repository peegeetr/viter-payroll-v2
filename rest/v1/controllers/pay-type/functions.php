<?php
// Read limit all paytype
function checkReadAllPayTypeLimit($object)
{
    $query = $object->readAllPayTypeLimit();
    checkQuery($query, "Empty records.(read all paytype limit)");
    return $query;
}

// Read all paytype
function checkReadAllPayType($object)
{
    $query = $object->readAllPayType();
    checkQuery($query, "Empty records.(read all paytype)");
    return $query;
}

// Read all paytype earning
function checkReadReportEarningsPaytypeIdByDate($object)
{
    $query = $object->readReportEarningsPaytypeIdByDate();
    checkQuery($query, "Empty records.(read all paytype earnings)");
    return $query;
}

// Read all paytype deduction
function checkReadReportDeductionPaytypeIdByDate($object)
{
    $query = $object->readReportDeductionPaytypeIdByDate();
    checkQuery($query, "Empty records.(read all paytype deduction)");
    return $query;
}

// // Read all paytype deduction
// function checkReadReportAllPaytypeIdByDate($object)
// {
//     $query = $object->readReportAllPaytypeIdByDate();
//     checkQuery($query, "Empty records.(read all paytype deduction)");
//     return $query;
// }

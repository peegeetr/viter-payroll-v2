
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
function checkReadEarningsPaytypeIdByDate($object)
{
    $query = $object->readEarningsPaytypeIdByDate();
    checkQuery($query, "Empty records.(read all paytype earnings)");
    return $query;
}

// Read all paytype deduction
function checkReadDeductionPaytypeIdByDate($object)
{
    $query = $object->readDeductionPaytypeIdByDate();
    checkQuery($query, "Empty records.(read all paytype deduction)");
    return $query;
}

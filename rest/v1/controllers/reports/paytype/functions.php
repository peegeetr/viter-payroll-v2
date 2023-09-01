<?php

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

// Read all Basic pay
function checkReadReportFilterBasicPay($object)
{
    $query = $object->readReportFilterBasicPay();
    checkQuery($query, "Empty records.(Read all basic pay)");
    return $query;
}

<?php
// REPORT Read all Summary
function checkReadReportDeductionPaytypeById($object)
{
    $query = $object->readReportDeductionPaytypeById();
    checkQuery($query, "Empty records.(Read deduction report paytype id )");
    return $query;
}

// REPORT Read limit Summary
function checkReadReportDeductionPaytypeByIdLimit($object)
{
    $query = $object->readReportDeductionPaytypeByIdLimit();
    checkQuery($query, "Empty records.(Read deduction report paytype id Limit)");
    return $query;
}

// REPORT Read all Summary
function checkReadReportEarningsPaytypeById($object)
{
    $query = $object->readReportEarningsPaytypeById();
    checkQuery($query, "Empty records.(Read earnings report paytype id )");
    return $query;
}

// REPORT Read limit Summary
function checkReadReportEarningsPaytypeByIdLimit($object)
{
    $query = $object->readReportEarningsPaytypeByIdLimit();
    checkQuery($query, "Empty records.(Read earnings report paytype id Limit)");
    return $query;
}

// Report Read all basic pay
function checkReadByReportBasicPay($object)
{
    $query = $object->readByReportBasicPay();
    checkQuery($query, "Empty records.(Read all report basic pay page)");
    return $query;
}

// Report Read all limit basic pay
function checkReadByReportBasicPayLimit($object)
{
    $query = $object->readByReportBasicPayLimit();
    checkQuery($query, "Empty records.(Read all limit report basic pay page)");
    return $query;
}

<?php

// Read all Pr id in deductions
function isDeductionsValidateId($object)
{
    $query = $object->checkValidateId();
    checkQuery($query, "Empty records (draft).");
    return $query;
}

// delete specific employee id and earnings id 
function checkDeleteDeductionIdAndEmployeeId($object)
{
    $query = $object->deleteDeductionIdAndEmployeeId();
    checkQuery($query, "There's a problem processing your request. (delete deduction id and Employee id)");
    return $query;
}

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

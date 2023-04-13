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

<?php

// Read all Pr id in deductions
function isDeductionsValidateId($object)
{
    $query = $object->checkValidateId();
    checkQuery($query, "Empty records (draft).");
    return $query;
}

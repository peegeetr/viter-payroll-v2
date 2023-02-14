<?php

// Read all Pr id in earnings
function isEarningsValidateId($object)
{
    $query = $object->checkValidateId();
    checkQuery($query, "Empty records (draft).");
    return $query;
    // $count = $query->rowCount();
    // checkExistence($count, "You cannot create {$name} because you have already draft.");
}

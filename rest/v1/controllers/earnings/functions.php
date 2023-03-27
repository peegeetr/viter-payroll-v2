<?php

// Read all Pr id in earnings
function isEarningsValidateId($object)
{
    $query = $object->checkValidateId();
    checkQuery($query, "Empty records (draft).");
    return $query;
}

// check name
function isHRISImportExist($object, $name)
{
    $query = $object->checkHRISImportExist();
    $count = $query->rowCount();
    checkExistence($count, "{$name} already exist.");
}
// Read all Summary
function checkReadAllSummary($object)
{
    $query = $object->readAllSummary();
    checkQuery($query, "Empty records.(Read Summary)");
    return $query;
}

// Read limit Summary
function checkReadSummaryLimit($object)
{
    $query = $object->readSummaryLimit();
    checkQuery($query, "Empty records.(Summary Limit)");
    return $query;
}

// Read summary paytype
function checkReadSummaryByDate($object)
{
    $query = $object->readSummaryByDate();
    checkQuery($query, "Empty records. (limit)");
    return $query;
}

// Read summary de minis
function checkReadDeminimisByDate($object)
{
    $query = $object->readDeminimisByDate();
    checkQuery($query, "Empty records. (filter de minimis)");
    return $query;
}
// Read all Summary
function checkReadAllSummaryView($object)
{
    $query = $object->readAllSummaryView();
    checkQuery($query, "Empty records.(Read Summary view)");
    return $query;
}

// Read limit Summary
function checkReadSummaryViewLimit($object)
{
    $query = $object->readSummaryViewLimit();
    checkQuery($query, "Empty records.(Summary view Limit)");
    return $query;
}

// delete earnings 
function checkDeleteEarnings($object)
{
    $query = $object->deleteEarnings();
    checkQuery($query, "There's a problem processing your request. (delete earnings)");
    return $query;
}

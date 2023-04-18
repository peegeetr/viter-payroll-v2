<?php

// check if no data from HRIS
function noDataFound()
{

    $response = new Response();
    $error = [];
    $response->setSuccess(false);
    $error['error'] = "No Data found.";
    $error["success"] = false;
    $response->setData($error);
    $response->send();
    exit;
}
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


// delete earnings 
function checkDeleteEarnings($object)
{
    $query = $object->deleteEarnings();
    checkQuery($query, "There's a problem processing your request. (delete earnings)");
    return $query;
}

// delete specific employee id and earnings id 
function checkDeleteEarningsIdAndEmployeeId($object)
{
    $query = $object->deleteEarningsIdAndEmployeeId();
    checkQuery($query, "There's a problem processing your request. (delete earnings id and Employee id)");
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

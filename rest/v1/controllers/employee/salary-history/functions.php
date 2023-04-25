<?php

// compare name
function compareDate($object, $name_old, $name)
{
    if (strtolower($name_old) !=  strtolower($name)) {
        isDateExist($object, $name);
    }
}
// check name
function isDateExist($object, $name)
{
    $query = $object->checkDateExist();
    $count = $query->rowCount();
    checkExistence($count, " $name already exist.");
}

// read by employee id 
function checkReadByEmployeeId($object)
{
    $query = $object->readByEmployeeId();
    checkQuery($query, "Empty records. (Read employee by id)");
    return $query;
}

// Read report salary history by employee id
function checkReadReportSalaryHistoryByEmployeeId($object)
{
    $query = $object->readReportSalaryHistoryByEmployeeId();
    checkQuery($query, "Empty records. (Read report salary history by employee id)");
    return $query;
}

// read by employee id 
function checkReadReportSalaryHistoryAllEmployee($object)
{
    $query = $object->readReportSalaryHistoryAllEmployee();
    checkQuery($query, "Empty records. (Read all employee )");
    return $query;
}

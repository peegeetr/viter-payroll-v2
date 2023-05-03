<?php

// Read search
function checkReadAllCurrentYear($object)
{
    $query = $object->readAllCurrentYear();
    checkQuery($query, "Empty records. (read all holiday by pay period)");
    return $query;
}

function isHolidayNameExist($object, $name)
{
    $query = $object->checkHolidayName();
    $count = $query->rowCount();
    checkExistence($count, "Holiday name {$name} already exist.");
}

function isHolidayDateExist($object, $name)
{
    $query = $object->checkHolidayDate();
    $count = $query->rowCount();
    checkExistence($count, "Holiday date {$name} already exist.");
}

function compareHolidayName($object, $name_old, $name)
{
    if (strtolower($name_old) !=  strtolower($name)) {
        isHolidayNameExist($object, $name);
    }
}

function compareHolidayDate($object, $name_old, $name)
{
    if (strtolower($name_old) !=  strtolower($name)) {
        isHolidayDateExist($object, $name);
    }
}

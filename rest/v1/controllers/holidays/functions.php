<?php

function isHolidayNameExist($object, $name)
{
    $query = $object->checkHolidayName();
    $count = $query->rowCount();
    checkExistence($count, "Holiday Name {$name} already exist.");
}



function isHolidayDateExist($object, $name)
{
    $query = $object->checkHolidayDate();
    $count = $query->rowCount();
    checkExistence($count, "Holiday Date {$name} already exist.");
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

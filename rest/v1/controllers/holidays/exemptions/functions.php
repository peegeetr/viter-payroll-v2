<?php

function isHolidayExemptionsEmployeeExist($object, $date)
{
    $query = $object->checkHolidayExemptionsEmployee();
    $count = $query->rowCount();
    checkExistence($count, "Holiday date {$date} is already exist.");
}


function compareHolidayDate($object, $date_old, $date)
{
    if (strtolower($date_old) !=  strtolower($date)) {
        isHolidayExemptionsEmployeeExist($object, $date);
    }
}

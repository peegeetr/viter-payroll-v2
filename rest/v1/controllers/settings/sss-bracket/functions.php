<?php

function isRangeFromExist($object, $name)
{
    $query = $object->checkRangeFrom();
    $count = $query->rowCount();
    checkExistence($count, "Rangre from {$name} already exist.");
}



function isRangeToExist($object, $name)
{
    $query = $object->checkRangeTo();
    $count = $query->rowCount();
    checkExistence($count, "Rangre to {$name} already exist.");
}


function compareRangeFrom($object, $name_old, $name)
{
    if (strtolower($name_old) !=  strtolower($name)) {
        isRangeFromExist($object, $name);
    }
}


function compareRangeto($object, $name_old, $name)
{
    if (strtolower($name_old) !=  strtolower($name)) {
        isRangeToExist($object, $name);
    }
}

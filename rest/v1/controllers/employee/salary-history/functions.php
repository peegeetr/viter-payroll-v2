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

<?php

// read maintenance is on
function checkReadMaintenanceOn($object)
{
    $query = $object->readMaintenanceOn();
    checkQuery($query, "There's a problem processing your request. (read maintenance is on)");
    return $query;
}

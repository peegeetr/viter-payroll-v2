<?php

// Update email
function checkUpdateEmail($object)
{
    $query = $object->updateEmail();
    checkQuery($query, "There's a problem processing your request. (update email)");
    return $query;
}

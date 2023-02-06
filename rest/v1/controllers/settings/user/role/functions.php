<?php

// role

// check association
function isUserSystemAssociated($object, $name)
{
    $query = $object->checkUserSystemAssociation();
    $count = $query->rowCount();
    checkExistence($count, "You cannot {$name} this item because it is already associated with other module.");
}

function isUserOtherAssociated($object, $name)
{
    $query = $object->checkUserOtherAssociation();
    $count = $query->rowCount();
    checkExistence($count, "You cannot {$name} this item because it is already associated with other module.");
}

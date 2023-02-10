<?php


// check pay item association
function isEarningsAssociatedToPayItem($object, $name)
{
    $query = $object->checkEarningsAssociatedToPayItem();
    $count = $query->rowCount();
    checkExistence($count, "You cannot '{$name}' this item because it is already associated with other module.");
}

function isRateAssociatedToPayItem($object, $name)
{
    $query = $object->checkRateAssociatedToPayItem();
    $count = $query->rowCount();
    checkExistence($count, "You cannot '{$name}' this item because it is already associated with other module.");
}

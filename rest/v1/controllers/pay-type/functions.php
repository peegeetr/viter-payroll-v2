<?php

// create payroll list

// check association
function isEarningsAssociatedToPayItem($object, $name)
{
    $query = $object->checkEarningsAssociatedToPayItem();
    $count = $query->rowCount();
    checkExistence($count, "You cannot {$name} this item because it is already associated with other module.");
}

function isRateAssociatedToPaytype($object, $name)
{
    $query = $object->checkRateAssociatedToPaytype();
    $count = $query->rowCount();
    checkExistence($count, "You cannot {$name} this item because it is already associated with other module.");
}

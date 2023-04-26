<?php

// role

// check association
function isPayrollTypeAssociatedToPayroll($object, $name)
{
    $query = $object->checkPayrollTypeAssociationToPayroll();
    $count = $query->rowCount();
    checkExistence($count, "You cannot delete {$name} because it is already associated with payroll.");
}

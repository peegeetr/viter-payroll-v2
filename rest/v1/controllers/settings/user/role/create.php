<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$role = new Role($conn);
// get should not be present
if (array_key_exists("roleid", $_GET)) {
    checkEnpoint();
}
// check data
checkPayload($data);
// get data
$role->role_name = addslashes(trim($data["role_name"]));
$role->role_description = addslashes(trim($data["role_description"]));
$role->role_is_active = 1;
$role->role_created = date("Y-m-d");
$role->role_datetime = date("Y-m-d H:i:s");
// string value convert to lower case
$column_name = strtolower(explode(" ", $data["role_name"])[0]);

// check name
isNameExist($role, $role->role_name);
// create
$query = checkCreate($role);
// add column
checkAddColumn($role, $column_name);
// update column value after adding
checkUpdateColumnValue($role, $column_name);

returnSuccess($role, "Role", $query);

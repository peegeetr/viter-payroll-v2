<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$role = new Role($conn);
// get should not be present
if (array_key_exists("roleid", $_GET)) {
    $response->setSuccess(false);
    $error['code'] = "404";
    $error['message'] = "Endpoint not found.";
    $error["success"] = false;
    return $error;
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
$column_name = strtolower($data["role_name"]);

// check name
isNameExist($role, $role->role_name);
// create
$query = checkCreate($role);
// add column
checkAddColumn($role, $column_name);
// update column value after adding
checkUpdateColumnValue($role, $column_name);
$returnData = [];
$returnData["data"] = [];
$returnData["count"] = $query->rowCount();
$returnData["Role ID"] = $role->lastInsertedId;
$returnData["GET"] = $_GET;
$returnData["success"] = true;
return $returnData;

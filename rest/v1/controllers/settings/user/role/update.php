<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$role = new Role($conn);
// get $_GET data
// check if roleid is in the url e.g. /roleid/1
$error = [];
$returnData = [];
if (array_key_exists("roleid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get roleid from query string
    $role->role_aid = $_GET['roleid'];
    $role->role_name = addslashes(trim($data["role_name"]));
    $role->role_description = addslashes(trim($data["role_description"]));
    $role->role_datetime = date("Y-m-d H:i:s");
    $role_name_old = strtolower($data["role_name_old"]);
    // string value convert to lower case
    $column_name = strtolower($data["role_name"]);
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($role->role_aid);
    // check name
    compareName($role, $role_name_old, $role->role_name);
    // update
    $query = checkUpdate($role);
    // update column name
    checkUpdateColumnName($role, $column_name, $role_name_old);

    returnSuccess($role, "Role", $query);
}

// return 404 error if endpoint not available
checkEndpoint();

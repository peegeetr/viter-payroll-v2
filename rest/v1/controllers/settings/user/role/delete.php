<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$role = new Role($conn);
// get $_GET data
// check if roleid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("roleid", $_GET)) {
 
    // get task id from query string
    $role->role_aid = $_GET['roleid'];
    $column_name = strtolower(explode(" ",$data["column_name"])[0]);  
    $is_developer = $data['isDeveloper'];
    
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($role->role_aid); 
    
    // delete validation if role id exist  
    if ($is_developer == 1) {
        isUserSystemAssociated($role);
    } 
    isUserOtherAssociated($role);
    
    // drop column  
    checkDropColumnName($role, $column_name);
    
    // delete
    $query = checkDelete($role); 
    $returnData["data"] = [];
    $returnData["count"] = $query->rowCount();
    $returnData["Role ID"] = $role->role_aid;
    $returnData["success"] = true;
    return $returnData;
}

// return 404 error if endpoint not available
checkEnpoint();

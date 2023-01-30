<?php
include_once("../../../common/package.php");
include_once("../../config.php");
include_once("../func-stripe.php");

try {
    $api_url = 'https://crm.frontlinebusiness.com.ph/dev-api/rest/v2/tasks';
    $username = '123';
    $password = '';
    $context = stream_context_create(array(
        'http' => array(
            'header' => "Authorization: Basic " . base64_encode("$username:$password"),
        ),
    ));
    $result = file_get_contents($api_url, false, $context);
    if(!$result) {
        http_response_code(500);
        echo json_encode(["error" => "You did not provide an API key. You need to provide your API key in the Authorization header, using Bearer auth (e.g. 'Authorization: Bearer YOUR_SECRET_KEY').", 
                            "type" => "invalid_request_error"
                        ]);
        exit;        
    }

    echo $result;
}catch (Error $e) {
    response("Code error", "There is an error on your code.");
}


// curl php method
// try {        
//     include_once("../../../common/package.php");
//     include_once("../../config.php");
//     include_once("../func-stripe.php");  
//     $payload = "";
//     $url = "https://crm.frontlinebusiness.com.ph/dev-api/rest/v2/controller/task/get-task.php";
//     $result = fetchDataCrm($url, $payload, "GET");
//     echo $result;
// }catch (Error $e) {
//     response("Code error", "There is an error on your code.");   
// }

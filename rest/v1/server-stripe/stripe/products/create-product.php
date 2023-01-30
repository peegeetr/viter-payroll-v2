<?php
    try {        
        include_once("../../../common/package.php");
        include_once("../../config.php");
        include_once("../func-stripe.php");  

        // GET SOURCE OBJECT
        $body = file_get_contents('php://input');
        checkSourceData($body);        	

        // DECODE BODY
        $data = json_decode($body);
        $fund = explode(":", $data->fund);
        $designation= $fund[0];
        $description = "FWC monthly donation";
        $mode = "subscription";

        $payload = "name={$designation}"; 
        $payload .=  "&description={$description}";
        $payload .= "&metadata[from]=FWC";
            
        $url = "https://api.stripe.com/v1/products";
        $result = fetchData($url, $payload, "POST");
        echo $result;
    }catch (Error $e) {
        response("Code error", "There is an error on your code.");   
    }

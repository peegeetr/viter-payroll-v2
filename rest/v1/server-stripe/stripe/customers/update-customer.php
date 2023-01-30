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
         $customer = $data->customer;
         $name = $data->name;
         $email = $data->email;

        $payload = "name={$name}";
        $payload .= "&email={$email}";
            
        $url = "https://api.stripe.com/v1/customers/{$customer}";
        $result = fetchData($url, $payload, "POST");
        echo $result;
    }catch (Error $e) {
        response("Code error", "There is an error on your code.");   
    }

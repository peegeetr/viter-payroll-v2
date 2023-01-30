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
        $card = $data->card;

        $url = "https://api.stripe.com/v1/customers/{$customer}/sources/{$card}";
        $result = fetchData($url, $payload, "DELETE");
        echo $result;
    }catch (Error $e) {
        response("Code error", "There is an error on your code.");   
    }

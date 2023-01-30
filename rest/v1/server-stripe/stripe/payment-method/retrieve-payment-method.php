<?php
    try {        
        include_once("../../../common/package.php");
        include_once("../../config.php");
        include_once("../func-stripe.php");  

        // GET SOURCE OBJECT
        $body = file_get_contents('php://input');   
        // DECODE BODY
        $data = json_decode($body);
        $paymentMethod = $data->paymentMethod;

        $url = "https://api.stripe.com/v1/payment_methods/" . $paymentMethod . "";
        $result = fetchData($url, $payload, "GET");
        echo $result;
    }catch (Error $e) {
        response("Code error", "There is an error on your code.");   
    }

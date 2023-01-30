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

        $payload = "";

        $url = "https://api.stripe.com/v1/payment_methods/" . $paymentMethod . "/detach";
        $result = fetchData($url, $payload, "POST");
        echo $result;
    }catch (Error $e) {
        response("Code error", "There is an error on your code.");   
    }

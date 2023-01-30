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
        $customer = $data->customer;

        $payload = "customer={$customer}";

        $url = "https://api.stripe.com/v1/payment_methods/" . $paymentMethod . "/attach";
        $result = fetchData($url, $payload, "POST");
        echo $result;
    }catch (Error $e) {
        response("Code error", "There is an error on your code.");   
    }

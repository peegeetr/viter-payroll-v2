<?php
    try {        
        include_once("../../../common/package.php");
        include_once("../../config.php");
        include_once("../func-stripe.php");  

        // GET SOURCE OBJECT
        $body = file_get_contents('php://input');
        // DECODE BODY
        $data = json_decode($body);
        $customer = $data->customer;

        $url = "https://api.stripe.com/v1/customers/" . $customer . "";
        $result = fetchData($url, $payload, "GET");
        echo $result;

        // Stripe API  
        // fetchStripeApi("https://api.stripe.com/v1/customers/" . $customer . "", $payload, "GET");
    }catch (Error $e) {
        echo json_encode(["error" => ["message" => "There's a problem with your request."], 
                        "type" => "",
                    ]);  
    }

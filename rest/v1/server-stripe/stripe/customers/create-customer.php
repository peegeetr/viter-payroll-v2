<?php
include_once("../../../common/package.php");
include_once("../../config.php");
include_once("../func-stripe.php");  

try {    
    // GET SOURCE OBJECT
    $body = file_get_contents('php://input');
    // DECODE BODY
    $data = json_decode($body);
    
    $name = $data->name;
    $email = $data->email;
    $description = $data->description;

    $payload = "name={$name}";
    $payload .= "&email={$email}";
    $payload .= "&description={$description}";
        
    // Stripe API  
    fetchStripeApi('https://api.stripe.com/v1/customers', $payload, "POST");
}catch (Error $e) {
    echo json_encode(["error" => ["message" => "There's a problem with your request."], 
                    "type" => "",
                ]);    
}

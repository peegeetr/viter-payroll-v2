<?php
include_once("../../../common/package.php");
include_once("../../../recaptcha/verify-recaptcha.php");
include_once("../../config.php");
include_once("../func-stripe.php"); 

try {    
    // GET SOURCE OBJECT
    $body = file_get_contents('php://input');
    // DECODE BODY
    $data = json_decode($body);

    // Google recaptcha validation
    verifyRecaptcha($data->recapt);    
    
    $fund = explode(":", $data->fund);
    $amount = $data->amount * 100;
    $currency = "usd";
    $quantity = "1";
    $email = $data->email;
    $customer = $data->customer;
    $userId = $data->userId;
    $designation = $fund[0];
    $designationId = $fund[1];
    $description = "FWC One-time donation";
    $mode = $data->frequency;
    $price_id = $data->priceId;
    $roleId = $data->roleId;
    $success_url = STRIPE_SUCCESS_URL;
    $cancel_url = STRIPE_CANCEL_URL; 

    if($notes != ""){
        $designation= $designation . ' (' . $notes . ')';
    }

    if($mode == "subscription"){
        $description= "FWC monthly donation";
    }

    $payload = "success_url={$success_url}";
    $payload .= "&cancel_url={$cancel_url}";
    $payload .= $customer != null ? "&customer={$customer}" : "";
    // $payload .= "&customer=cus_N10W8PdF0O08TI";
    $payload .= "&mode={$mode}";
    $payload .= ($price_id == "" ? "&line_items[0][name]={$designation}" : ""); // use for subscription
    $payload .= ($price_id == "" ? "&line_items[0][amount]={$amount}" : ""); // use for subscription
    $payload .= ($price_id == "" ? "&line_items[0][currency]={$currency}" : ""); // use for subscription
    $payload .= ($price_id == "" ? "" : "&line_items[0][price]={$price_id}"); // use for subscription
    $payload .= ($price_id == "" ? "&submit_type=donate" : ""); // use for subscription
    $payload .= ($price_id == "" ? "&payment_intent_data[description]={$description}" : ""); // use for subscription
    $payload .= ($price_id == "" ? "&payment_intent_data[statement_descriptor]=FWC" : ""); // use for subscription
    $payload .= ($price_id == "" ? "&payment_intent_data[metadata[name]]={$designation}" : ""); // use for subscription
    $payload .= ($price_id == "" ? "&payment_intent_data[metadata[fundId]]={$designationId}" : ""); // use for subscription
    $payload .= ($price_id == "" ? "&payment_intent_data[metadata[roleId]]={$roleId}" : ""); // use for subscription
    $payload .= ($price_id == "" ? "&payment_intent_data[metadata[cus_id]]={$customer}" : ""); // use for subscription
    $payload .= ($price_id == "" ? "&payment_intent_data[metadata[userId]]={$userId}" : ""); // use for subscription
    $payload .= ($price_id == "" ? "" : "&subscription_data[description]=FWC"); // use for subscription
    $payload .= ($price_id == "" ? "" : "&subscription_data[metadata[fundId]]={$designationId}"); // use for subscription
    $payload .= ($price_id == "" ? "" : "&subscription_data[metadata[roleId]]={$roleId}"); // use for subscription
    $payload .= ($price_id == "" ? "" : "&subscription_data[metadata[cus_id]]={$customer}"); // use for subscription
    $payload .= ($price_id == "" ? "" : "&subscription_data[metadata[userId]]={$userId}"); // use for subscription
    $payload .= "&line_items[0][quantity]={$quantity}";
    $payload .= "&line_items[0][description]={$description}";
    $payload .= "&billing_address_collection=required";
    $payload .= "&metadata[from]=FWC";
    $payload .= "&metadata[fundId]={$designationId}";
    $payload .= "&metadata[roleId]={$roleId}";

    // // Stripe API  
    // fetchStripeApi('https://api.stripe.com/v1/checkout/sessions', $payload, "POST");  

    $url = "https://api.stripe.com/v1/checkout/sessions";
    $result = fetchData($url, $payload, "POST");
    echo $result;


}catch (Error $e) {
    echo json_encode(["error" => ["message" => "There's a problem with your request."], 
                        "type" => "",
                    ]); 
}
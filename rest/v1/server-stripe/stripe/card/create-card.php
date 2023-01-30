<?php
include_once("../../../common/package.php");
include_once("../../config.php");
include_once("../func-stripe.php"); 

try {        
    // GET SOURCE OBJECT
    $body = file_get_contents('php://input');
    // DECODE BODY
    $data = json_decode($body);
    $customer = $data->customer;
    $name = $data->card_name;
    $number = str_replace(' ', '', $data->card_number);
    $exp_month = $data->card_exp_month;
    $exp_year = $data->card_exp_year;
    $cvc = $data->card_cvc;
    $street = $data->card_street;
    $city = $data->card_city;
    $zip = $data->card_zip;
    $state = $data->card_state;
    // $country = $data->card_country;

    $payload = "source[object]=card";
    $payload .= "&source[name]={$name}";
    $payload .= "&source[number]={$number}";
    $payload .= "&source[exp_month]={$exp_month}";
    $payload .= "&source[exp_year]={$exp_year}";
    $payload .= "&source[cvc]={$cvc}";
    $payload .= "&source[address_line1]={$street}";
    $payload .= "&source[address_city]={$city}";
    $payload .= "&source[address_zip]={$zip}";
    $payload .= "&source[address_state]={$state}";
    // $payload .= "&source[address_country]={$country}";
    
    $url = "https://api.stripe.com/v1/customers/{$customer}/sources";
    $result = fetchData($url, $payload, "POST");
    echo $result;
}catch (Error $e) {
    echo json_encode(["error" => ["message" => "There's a problem with your request."], 
                        "type" => "",
                    ]);   
}
<?php
    try {        
        include_once("../../../common/package.php");
        include_once("../../config.php");
        include_once("../func-stripe.php");  

        // GET SOURCE OBJECT
        $body = file_get_contents('php://input');   
        // DECODE BODY
        $data = json_decode($body);

        $name = $data->card_name;
        $number = str_replace(' ', '', $data->card_number);
        $cvc = $data->card_cvc;
        $exp_month = $data->card_exp_month;
        $exp_year = $data->card_exp_year;
        $street = $data->card_street;
        $city = $data->card_city;
        $zip = $data->card_zip;
        $state = $data->card_state;

        $payload = "type=card";
        $payload .= "&card[number]={$number}";
        $payload .= "&card[exp_month]={$exp_month}";
        $payload .= "&card[exp_year]={$exp_year}";
        $payload .= "&card[cvc]={$cvc}";
        $payload .= "&billing_details[name]={$name}";
        $payload .= "&billing_details[address[line1]]={$street}";
        $payload .= "&billing_details[address[city]]={$city}";
        $payload .= "&billing_details[address[postal_code]]={$zip}";
        $payload .= "&billing_details[address[state]]={$state}";

        $url = "https://api.stripe.com/v1/payment_methods";
        $result = fetchData($url, $payload, "POST");
        echo $result;
    }catch (Error $e) {
        response("Code error", "There is an error on your code.");   
    }

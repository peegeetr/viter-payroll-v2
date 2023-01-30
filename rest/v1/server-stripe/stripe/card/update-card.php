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
        $card = $data->card;
        $customer = $data->customer;
        $name = $data->card_name;
        $exp_month = $data->card_exp_month;
        $exp_year = $data->card_exp_year;
        $street = $data->card_street;
        $city = $data->card_city;
        $zip = $data->card_zip;
        $state = $data->card_state;
        $country = $data->card_country;

        // $payload = "source[object]=card";
        $payload = "name={$name}";
        $payload .= "&exp_month={$exp_month}";
        $payload .= "&exp_year={$exp_year}";
        $payload .= "&address_line1={$street}";
        $payload .= "&address_city={$city}";
        $payload .= "&address_zip={$zip}";
        $payload .= "&address_state={$state}";
        $payload .= "&address_country={$country}";
        
            
        $url = "https://api.stripe.com/v1/customers/{$customer}/sources/{$card}";
        $result = fetchData($url, $payload, "POST");
        echo $result;

    }catch (Error $e) {
        response("Code error", "There is an error on your code.");   
    }

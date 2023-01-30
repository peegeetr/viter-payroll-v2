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
        $fund = explode(":", $data->fund);
        $currency = "usd";
        $unit_amount = $data->amount * 100;
        $name = $fund[0];
        $designationId = $fund[1];
        $product = $data->product;
        $recurring = "month";

        $payload = "product={$product}";
        $payload .= "&currency={$currency}";
        $payload .= "&unit_amount={$unit_amount}";
        $payload .= "&nickname={$name}";
        $payload .= "&recurring[interval]={$recurring}";
        $payload .= "&metadata[from]=FWC";
        $payload .= "&metadata[fundId]={$designationId}";
        $payload .= "&metadata[roleId]={$roleId}";

        $url = "https://api.stripe.com/v1/prices";
        $result = fetchData($url, $payload, "POST");
        echo $result;
    }catch (Error $e) {
        response("Code error", "There is an error on your code.");   
    }

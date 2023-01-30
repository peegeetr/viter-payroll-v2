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
        $product = $data->product;
        $name = $data->product_name;
        $description = addslashes($data->product_description);
        $amount = $data->product_amount;

        $payload = "name={$name}"; 
        // $payload .=  "&description={$description}";
        $payload .=  "&metadata[amount]={$amount}";
            
        $url = "https://api.stripe.com/v1/products/{$product}";
        $result = fetchData($url, $payload, "POST");
        echo $result;
    }catch (Error $e) {
        response("Code error", "There is an error on your code.");   
    }

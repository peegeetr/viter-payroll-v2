<?php

    function response($code, $msg) {
        echo json_encode(
            array(
                "status" => $code, 
                "message" => $msg,
            )
        );
    }

    function checkSourceData($data) {
        if(empty($data)) {
            response("400", "The page is not accessible.");
            exit();
        }
    }

    function fetchData($url, $payload = array(), $req) {
        // Initialized curl
        $curl = curl_init();

        //HTTP username
        // $username = STRIPE_PFM_SK_LIVE;
        $username = STRIPE_FWC_SK_TEST;

        //HTTP password
        $password = '';      
        
        // OPTIONS:
        curl_setopt($curl, CURLOPT_URL, $url);   
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        if($req == "POST") {
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
        }elseif($req == "DELETE") {
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'DELETE');
        }elseif($req == "GET") {
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'GET');
        }
        
        // if $payload not empty do POST else GET
        if(!empty($payload)){
            curl_setopt($curl, CURLOPT_POSTFIELDS, $payload);      
        }
        
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/x-www-form-urlencoded',
            'Authorization: Basic '. base64_encode("$username:$password")
        ));
        
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

        // EXECUTE:
        $result = curl_exec($curl);
        if(!$result){
            response("Execution error", "There is an error on your code.");            
            exit();
        }
        curl_close($curl);
        // file_put_contents( 'pi.log', $result);
        return $result;
    }

    function fetchDataCrm($url, $payload = array(), $req) {
        // Initialized curl
        $curl = curl_init();

        //HTTP username
        // $username = STRIPE_PFM_SK_LIVE;
        $username = "123";

        //HTTP password
        $password = '';      
        
        // OPTIONS:
        curl_setopt($curl, CURLOPT_URL, $url);   
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        if($req == "POST") {
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
        }elseif($req == "DELETE") {
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'DELETE');
        }elseif($req == "GET") {
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'GET');
        }
        
        // if $payload not empty do POST else GET
        if(!empty($payload)){
            curl_setopt($curl, CURLOPT_POSTFIELDS, $payload);      
        }
        
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/x-www-form-urlencoded',
            'Authorization: Basic '. base64_encode("$username:$password")
        ));
        
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

        // EXECUTE:
        $result = curl_exec($curl);
        if(!$result){
            response("Execution error", "There is an error on your code.");            
            exit();
        }
        curl_close($curl);
        // file_put_contents( 'pi.log', $result);
        return $result;
    }
    
    function fetchStripeApi($url, $payload, $method) {
    	$api_url = $url;
        $username = STRIPE_FWC_SK_TEST;
        $password = '';
        $context = stream_context_create(array(
            'http' => array(
                'method' => $method,
                'header' => "Authorization: Basic " . base64_encode("$username:$password"),
                'content' => $payload
            ),
        ));
        $result = file_get_contents($api_url, false, $context);
        if(!$result) {
            echo json_encode(["error" => ["message" => "There's a problem with your request. Please check back later."], 
                                "type" => "invalid_request_error",
                            ]);
            exit;        
        }

        echo $result;
    }

    
<?php
	include_once("../common/package.php");
	include_once("../notification/wh-event-stripe-fwc.php");  
	require '../vendor-stripe/autoload.php';
    require_once 'config.php';
	include_once("../admin/members/Members.php");
    include_once("../admin/members/functions-members.php"); 
	include_once("../admin/donor-payment-details/PaymentDetails.php");
    // include_once("../admin/donor-payment-details/functions-payment-details.php");  

    \Stripe\Stripe::setApiKey(STRIPE_FWC_SK_LIVE);

    $payload = @file_get_contents('php://input');
	$event = null;
	
	try {
	    $event = \Stripe\Event::constructFrom(
	        json_decode($payload, true)
	    );

		$customerId = $event->data->object->customer;
		$paymentIntentId = $event->data->object->payment_intent;
		$invoiceId = $event->data->object->invoice;
		$payMethod = $event->data->object->payment_method;
		$donorFrequency = $invoiceId ? "Monthly" : "One-time";

		// Customer API
		$customer = \Stripe\Customer::retrieve($customerId, []);
		$customerUpdate = $invoiceId ? \Stripe\Customer::update($customerId, ["invoice_settings" => ["default_payment_method" => $payMethod]]) : null;
		// Invoice API
		$invoice = $invoiceId ? \Stripe\Invoice::retrieve($invoiceId, []) : null;
		// PaymentIntent API
		$pi = \Stripe\PaymentIntent::retrieve($paymentIntentId, []);
		
		// mysql data
		$connection = checkConnection();
		$member = new Members($connection);
		$payment = new PaymentDetails($connection);
		$encrypt = new Encryption();
	} catch(\UnexpectedValueException $e) {
	    // Invalid payload
	    echo json_encode(array("400" => "Invalid payload. " . $e . ""));
	    // http_response_code(400);
	    exit();
	}

    switch ($event->type) {
		case 'charge.succeeded':
            if($customerId == null){
				$donorName = $event->data->object->billing_details->name;
				$donorEmail = $event->data->object->receipt_email;
			}else {				
				$donorEmail = $customer->email;
				$donorName = $customer->name;
			}

			
			if($invoice == null) {
				$donorDesignation = $event->data->object->metadata->name;
				$fundId = $event->data->object->metadata->fundId; // value = fund id
				$roleId = $event->data->object->metadata->roleId; // value = role id
				$cusId = $event->data->object->metadata->cus_id; // value = customer id
				$userId = $event->data->object->metadata->userId; // value = user id
				
				if($customerId == null){
					$donorDesignation = $event->data->object->description;
				}
            }else {
				$donorDesignation = $invoice->lines->data[0]->plan->nickname;
				$fundId = $invoice->lines->data[0]->metadata->fundId; // value = fund id
				$roleId = $invoice->lines->data[0]->metadata->roleId; // value = role id
				$cusId = $invoice->lines->data[0]->metadata->cus_id; // value = customer id
				$userId = $invoice->lines->data[0]->metadata->userId; // value = user id
            }

			$donationDate = date("F j, Y");
	        $amount = $event->data->object->amount / 100;
	        $donorCard = $event->data->object->payment_method_details->card->brand . ' *' . $event->data->object->payment_method_details->card->last4;
						
			sendEmail($donationDate, $donorDesignation, $donorFrequency, $amount, $donorCard, $donorName, $donorEmail);
			// sendEmailAdmin($donationDate, $donorDesignation, $donorFrequency, $amount, $donorCard, $donorName, $donorEmail);
			sendEmailDev($donationDate, $donorDesignation, $donorFrequency, $amount, $donorCard, $donorName, $donorEmail);		

			// if donor is login
			if($userId) {
				// insert payment	
				$payment->payment_details_member_id = $userId;  
				$payment->payment_details_date = date("Y-m-d"); 
				$payment->payment_details_amount = $amount;  
				$payment->payment_details_frequency = $donorFrequency;  
				$payment->payment_details_fund_id = $fundId;   
				$payment->payment_details_created = date("Y-m-d");  
				$payment->payment_details_datetime = date("Y-m-d H:i:s"); 	
				checkCreatePayment($payment);  
				echo json_encode(array("Payment" => "Creted."));
			}

			// update customer id if empty and if logged in
			if(!$cusId && $userId) {
				$member->don_member_cus_id = $customerId; 
				$member->don_member_aid = $userId;
				$member->don_member_datetime = date("Y-m-d H:i:s"); 	
				$updateMemberCusId = checkUpdateMemberCusId($member); 
				echo json_encode(array("Member cus id" => "Updated."));
			}
			
			// Create donor data only if new
			if($invoice != null && $customerId != null) {
				$member->don_member_cus_id = $customerId;
				$member->don_member_name = $event->data->object->billing_details->name;
				$member->don_member_email = $event->data->object->billing_details->email;
				$member->don_member_address = $event->data->object->billing_details->address->line1;
				$member->don_member_city = $event->data->object->billing_details->address->city;
				$member->don_member_zipcode = $event->data->object->billing_details->address->postal_code;
				$member->don_member_state = $event->data->object->billing_details->address->state;
				$member->don_member_is_active = 1 ; 
				$member->don_member_created = date("Y-m-d");  
        		$member->don_member_datetime = date("Y-m-d H:i:s"); 
				$role_id = $roleId; 
				$account_key = $encrypt->doHash(rand()); 

				// create member
				checkReadMemberEmail($member);
				$result = checkCreate($member);

				// create new donor account
				$createAccount = checkCreateAccount($member,  $role_id, $account_key); 
				sendDonorAccount($member->don_member_email, $account_key, $member->don_member_name);  

				// insert payment	
				$payment->payment_details_member_id = $member->last_created_id;  
				$payment->payment_details_date = $member->don_member_created; 
				$payment->payment_details_amount = $amount;  
				$payment->payment_details_frequency = $donorFrequency;  
				$payment->payment_details_fund_id = $fundId;   
				$payment->payment_details_created =$member->don_member_created;  
				$payment->payment_details_datetime = $member->don_member_datetime;

				checkCreatePayment($payment);  
				echo json_encode(array("Payment" => "Creted."));
			
			}

			
			break;
		case 'charge.failed':			
			if($customerId == null){
				$donorName = $event->data->object->billing_details->name;
				$donorEmail = $event->data->object->receipt_email;
			}else {				
				$donorEmail = $customer->email;
				$donorName = $customer->name;
			}

			if($invoice == null) {
				$donorDesignation = $pi->metadata->name;
				
				if($customerId == null){
					$donorDesignation = $event->data->object->description;
				}
            }else {
				$donorDesignation = $invoice->lines->data[0]->plan->nickname;
            }
			
			$failureMessage = $event->data->object->failure_message;
			$donationDate = date("F j, Y");
			$amount = $event->data->object->amount / 100;
			$donorCard = $event->data->object->payment_method_details->card->brand . ' *' . $event->data->object->payment_method_details->card->last4;
			
			// sendEmailFailed($donationDate, $donorDesignation, $donorFrequency, $amount, $donorCard, $donorName, $donorEmail);
			// sendEmailFailedAdmin($donationDate, $donorDesignation, $donorFrequency, $amount, $donorCard, $donorName, $donorEmail);
			sendEmailFailedDev($donationDate, $donorDesignation, $donorFrequency, $amount, $donorCard, $donorName, $donorEmail, $failureMessage);
			// sendEmailExpiringCardDev($donorEmail, $donorName, $donorCard, "December");	
			
			break; 
		case 'customer.source.expiring':			
			$donorEmail = $customer->email;
			$donorName = $customer->name;
			$donorCard = $event->data->object->brand . ' *' . $event->data->object->last4;
			$cardMonth = $event->data->object->exp_month;
			$dateObj = DateTime::createFromFormat('!m', $cardMonth);
			$monthName = $dateObj->format('F'); // F is the word Month, M is the 3 letter word Mar

			// sendEmailExpiringCard($donorEmail, $donorName, $donorCard, $monthName);
			sendEmailExpiringCardDev($donorEmail, $donorName, $donorCard, $monthName);		
			
			break; 
	    // ... handle other event types
	    default:
	        // Unexpected event type
	        //http_response_code(400);
	        //exit();
	        echo json_encode(array("400" => "default Failed sending email.", "Event type" => $event->type));
	        exit();
	}

	function checkCreatePayment($object) {
        $result = $object->create();
        if(!$result) {
            Response::sendResponse(false, "Please check your sql query. (create member)", []);
            exit();
        }
        return $result;
    } 
	
	http_response_code(200);
<?php 
    
    use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\SMTP;
	use PHPMailer\PHPMailer\Exception;
	
	require 'PHPMailer/PHPMailer.php';
	require 'PHPMailer/SMTP.php';
	require 'PHPMailer/Exception.php';

    include_once("mail-config.php");
    include_once("html/html-wh-stripe.php");   
	include_once("html/html-wh-stripe-failed.php");   
	include_once("html/html-wh-stripe-expiring-card.php");  
	include_once("html/html-new-account.php");
	
	function sendEmail($donationDate, $donorDesignation, $donorFrequency, $amount, $donorCard, $donorName, $donorEmail) {
        $mail = new PHPMailer(true);
		$mail->isSMTP();
		$mail->Host = 'thefrontline.asia'; // SiteGround
		$mail->Port = 465;
		$mail->SMTPSecure = "ssl";
		$mail->SMTPAuth = true;		
		$mail->Username =  USERNAME; // if gmail use your gmail email
		$mail->Password = PASSWORD; // if gmail use your email password
		$mail->Subject = SUBJECT_DONATION_RECEIPT;
		$mail->setFrom(USERNAME, FROM);
		$mail->isHTML(true);
        $mail->Body = getHtmlWhStripe($donationDate, $donorDesignation, $donorFrequency, $amount, $donorCard, $donorName, $donorEmail, IMAGES_URL);
        $mail->addAddress($donorEmail);
        
        if($mail->Send()){
            echo json_encode(array("mailed" => "Success sending email."));
        }else {
            echo json_encode(array("mailed" => "Failed sending email."));
        }
    }

	function sendEmailDev($donationDate, $donorDesignation, $donorFrequency, $amount, $donorCard, $donorName, $donorEmail) {
        $mail = new PHPMailer(true);
		$mail->isSMTP();
		$mail->Host = 'thefrontline.asia'; // SiteGround
		$mail->Port = 465;
		$mail->SMTPSecure = "ssl";
		$mail->SMTPAuth = true;		
		$mail->Username =  USERNAME; // if gmail use your gmail email
		$mail->Password = PASSWORD; // if gmail use your email password
		$mail->Subject = SUBJECT_DONATION_RECEIPT;
		$mail->setFrom(USERNAME, FROM);
		$mail->isHTML(true);
        $mail->Body = getHtmlWhStripe($donationDate, $donorDesignation, $donorFrequency, $amount, $donorCard, $donorName, $donorEmail, IMAGES_URL);
        $mail->addAddress(DEVELOPER);
        
		if($mail->Send()){
            echo json_encode(array("mailed" => "Success sending email confirmed."));
        }else {
            echo json_encode(array("mailed" => "Failed sending email confirmed."));
        }
    }

	function sendEmailAdmin($donationDate, $donorDesignation, $donorFrequency, $amount, $donorCard, $donorName, $donorEmail) {
        $mail = new PHPMailer(true);
		$mail->isSMTP();
		$mail->Host = 'thefrontline.asia'; // SiteGround
		$mail->Port = 465;
		$mail->SMTPSecure = "ssl";
		$mail->SMTPAuth = true;		
		$mail->Username =  USERNAME; // if gmail use your gmail email
		$mail->Password = PASSWORD; // if gmail use your email password
		$mail->Subject = SUBJECT_DONATION_RECEIPT;
		$mail->setFrom(USERNAME, FROM);
		$mail->isHTML(true);
        $mail->Body = getHtmlWhStripe($donationDate, $donorDesignation, $donorFrequency, $amount, $donorCard, $donorName, $donorEmail, IMAGES_URL);
        $mail->addAddress(ADMIN);
        
		if($mail->Send()){
            echo json_encode(array("mailed" => "Success sending email admin."));
        }else {
            echo json_encode(array("mailed" => "Failed sending email admin."));
        }
    }

	function sendEmailFailed($donationDate, $donorDesignation, $donorFrequency, $amount, $donorCard, $donorName, $donorEmail, $failureMessage) {
        $mail = new PHPMailer(true);
		$mail->isSMTP();
		$mail->Host = 'thefrontline.asia'; // SiteGround
		$mail->Port = 465;
		$mail->SMTPSecure = "ssl";
		$mail->SMTPAuth = true;		
		$mail->Username =  USERNAME; // if gmail use your gmail email
		$mail->Password = PASSWORD; // if gmail use your email password
		$mail->Subject = SUBJECT_DONATION_FAILED;
		$mail->setFrom(USERNAME, FROM);
		$mail->isHTML(true);
        $mail->Body = getHtmlWhStripeFailed($donationDate, $donorDesignation, $donorFrequency, $amount, $donorCard, $donorName, $donorEmail, $failureMessage, IMAGES_URL, ROOT_DOMAIN);
		$mail->addAddress($donorEmail);
        
		if($mail->Send()){
            echo json_encode(array("mailed" => "Success sending email."));
        }else {
            echo json_encode(array("mailed" => "Failed sending email."));
        }
    }

	function sendEmailFailedDev($donationDate, $donorDesignation, $donorFrequency, $amount, $donorCard, $donorName, $donorEmail, $failureMessage) {
        $mail = new PHPMailer(true);
		$mail->isSMTP();
		$mail->Host = 'thefrontline.asia'; // SiteGround
		$mail->Port = 465;
		$mail->SMTPSecure = "ssl";
		$mail->SMTPAuth = true;		
		$mail->Username =  USERNAME; // if gmail use your gmail email
		$mail->Password = PASSWORD; // if gmail use your email password
		$mail->Subject = SUBJECT_DONATION_FAILED;
		$mail->setFrom(USERNAME, FROM);
		$mail->isHTML(true);
        $mail->Body = getHtmlWhStripeFailed($donationDate, $donorDesignation, $donorFrequency, $amount, $donorCard, $donorName, $donorEmail, $failureMessage, IMAGES_URL, ROOT_DOMAIN);
		$mail->addAddress(DEVELOPER);
        
		if($mail->Send()){
            echo json_encode(array("mailed" => "Success sending email confirmed."));
        }else {
            echo json_encode(array("mailed" => "Failed sending email confirmed."));
        }
    }

	function sendEmailFailedAdmin($donationDate, $donorDesignation, $donorFrequency, $amount, $donorCard, $donorName, $donorEmail, $failureMessage) {
        $mail = new PHPMailer(true);
		$mail->isSMTP();
		$mail->Host = 'thefrontline.asia'; // SiteGround
		$mail->Port = 465;
		$mail->SMTPSecure = "ssl";
		$mail->SMTPAuth = true;		
		$mail->Username =  USERNAME; // if gmail use your gmail email
		$mail->Password = PASSWORD; // if gmail use your email password
		$mail->Subject = SUBJECT_DONATION_FAILED;
		$mail->setFrom(USERNAME, FROM);
		$mail->isHTML(true);
        $mail->Body = getHtmlWhStripeFailed($donationDate, $donorDesignation, $donorFrequency, $amount, $donorCard, $donorName, $donorEmail, $failureMessage, IMAGES_URL, ROOT_DOMAIN);
		$mail->addAddress(ADMIN);
        
		if($mail->Send()){
            echo json_encode(array("mailed" => "Success sending email admin."));
        }else {
            echo json_encode(array("mailed" => "Failed sending email admin."));
        }
    }

	function sendEmailExpiringCard($donorEmail, $donorName, $donorCard, $monthName) {
        $mail = new PHPMailer(true);
		$mail->isSMTP();
		$mail->Host = 'thefrontline.asia'; // SiteGround
		$mail->Port = 465;
		$mail->SMTPSecure = "ssl";
		$mail->SMTPAuth = true;		
		$mail->Username =  USERNAME; // if gmail use your gmail email
		$mail->Password = PASSWORD; // if gmail use your email password
		$mail->Subject = SUBJECT_DONATION_EXPIRING;
		$mail->setFrom(USERNAME, FROM);
		$mail->isHTML(true);
        $mail->Body = getHtmlWhStripeExpiringCard($donorEmail, $donorName, $donorCard, $monthName, IMAGES_URL, ROOT_DOMAIN);
        $mail->addAddress($donorEmail);
        
		if($mail->Send()){
            echo json_encode(array("mailed" => "Success sending email."));
        }else {
            echo json_encode(array("mailed" => "Failed sending email."));
        }
    }

	function sendEmailExpiringCardDev($donorEmail, $donorName, $donorCard, $monthName) {
        $mail = new PHPMailer(true);
		$mail->isSMTP();
		$mail->Host = 'thefrontline.asia'; // SiteGround
		$mail->Port = 465;
		$mail->SMTPSecure = "ssl";
		$mail->SMTPAuth = true;		
		$mail->Username =  USERNAME; // if gmail use your gmail email
		$mail->Password = PASSWORD; // if gmail use your email password
		$mail->Subject = SUBJECT_DONATION_EXPIRING;
		$mail->setFrom(USERNAME, FROM);
		$mail->isHTML(true);
        $mail->Body = getHtmlWhStripeExpiringCard($donorEmail, $donorName, $donorCard, $monthName, IMAGES_URL, ROOT_DOMAIN);
        $mail->addAddress(DEVELOPER);
        
		if($mail->Send()){
            echo json_encode(array("mailed" => "Success sending email confirmed."));
        }else {
            echo json_encode(array("mailed" => "Failed sending email confirmed."));
        }
    }

	function sendEmailExpiringCardAdmin($donorEmail, $donorName, $donorCard, $monthName) {
        $mail = new PHPMailer(true);
		$mail->isSMTP();
		$mail->Host = 'thefrontline.asia'; // SiteGround
		$mail->Port = 465;
		$mail->SMTPSecure = "ssl";
		$mail->SMTPAuth = true;		
		$mail->Username =  USERNAME; // if gmail use your gmail email
		$mail->Password = PASSWORD; // if gmail use your email password
		$mail->Subject = SUBJECT_DONATION_EXPIRING;
		$mail->setFrom(USERNAME, FROM);
		$mail->isHTML(true);
        $mail->Body = getHtmlWhStripeExpiringCard($donorEmail, $donorName, $donorCard, $monthName, IMAGES_URL, ROOT_DOMAIN);
        $mail->addAddress(ADMIN);
        
		if($mail->Send()){
            echo json_encode(array("mailed" => "Success sending email admin."));
        }else {
            echo json_encode(array("mailed" => "Failed sending email admin."));
        }
    }

	function sendDonorAccount($email, $key, $fname) {
        $mail = new PHPMailer(true);
		$mail->isSMTP();
		$mail->Host = 'giow10.siteground.us'; // SiteGround
		$mail->Port = 465;
		$mail->SMTPSecure = "ssl";
		$mail->SMTPAuth = true;		
		$mail->Username =  USERNAME; // if gmail use your gmail email
		$mail->Password = PASSWORD; // if gmail use your email password
		$mail->Subject = SUBJECT_NEW_ACCOUNT;
		$mail->setFrom(USERNAME, FROM);
		$mail->isHTML(true);
        $mail->Body = getHtmlNewAccount($email, $key, $fname, ROOT_DOMAIN);
        $mail->addAddress($email);
        
        if($mail->Send()){
            echo json_encode(array("mailed" => "Account sent"));
        }else {    
            echo json_encode(array("mailed" => "Account failed"));
        } 
	}

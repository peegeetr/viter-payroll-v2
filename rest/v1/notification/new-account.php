<?php 
    
    use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\SMTP;
	use PHPMailer\PHPMailer\Exception;
	
	require 'PHPMailer/PHPMailer.php';
	require 'PHPMailer/SMTP.php';
	require 'PHPMailer/Exception.php';

    include_once("mail-config.php");
    include_once("html/html-new-account.php");
	
	function sendEmail($email, $key, $name) {
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
        $mail->Body = getHtmlNewAccount($email, $key, $name, ROOT_DOMAIN);
        $mail->addAddress($email);
        
        if($mail->Send()){
            return true;
        }else {    
            return false;
        } 
	}

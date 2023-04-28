<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

include_once("mail-config.php");
include_once("template/change-email.php");

function sendEmail($oldEmail, $password_link, $name, $email, $key)
{
	$mail = new PHPMailer(true);
	$mail->isSMTP();
	$mail->Host = 'giow10.siteground.us'; // SiteGround
	$mail->Port = 465;
	$mail->SMTPSecure = "ssl";
	$mail->SMTPAuth = true;
	$mail->Username =  USERNAME; // if gmail use your gmail email
	$mail->Password = PASSWORD; // if gmail use your email password
	$mail->Subject = VERIFY_ACCOUNT;
	$mail->setFrom(USERNAME, FROM);
	$mail->isHTML(true);
	$mail->Body = getHtmlConfirmEmail(
		$password_link,
		$name,
		$email,
		$key,
		ROOT_DOMAIN
	);
	$mail->addAddress($oldEmail);

	if ($mail->Send()) {
		return "Success sending email.";
	} else {
		return "Failed sending email.";
	}
}

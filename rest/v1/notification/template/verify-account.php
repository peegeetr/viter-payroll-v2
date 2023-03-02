<?php

function getHtmlVerifyAccount(
  $password_link,
  $name,
  $email,
  $key,
  $ROOT_DOMAIN
) {
  $html = '
<style>
    @import url("https://fonts.cdnfonts.com/css/Helvetica Neue-neue-9");
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    p {
      margin-bottom: 10px;
      font-size: 15px;
    }

    .info td {
      padding: 2px;
      font-size: 15px;
    }
    table {
      border-spacing: 0;
    }
  </style>
  <body
    style="
      background-color: #f0f0f0;
      font-family: Helvetica Neue, sans-serif;
      line-height: 1.6;
      padding: 10px 0;
      background-color: #fff;
    "
  >
    <div style="width: 100%; max-width: 600px; margin: 10px auto">
    <div style="padding: 10px 10px 0px; text-align: center">
        <div
          style="
            background-image: url(https://demo.frontlinebusiness.com.ph/dev/notification-images/bg-white.jpg);
            width: 170px;
            display: inline-block;
          "
        >
          <img
            src="https://hris.frontlinebusiness.com.ph/img/logo-fbs.png"
            alt=""
            width="170px"
          />
        </div>
      </div>
      <div style="padding: 0 10px 0px">
        <h1
          style="
            padding-bottom: 20px;
            line-height: 1.2;
            margin: 20px 0 0px;
            font-size: 23px;
            width: 70%;
            color: black;
          "
        >
          Email Verification
        </h1>
        <div
          style="
            padding: 20px;
            border-top: 1px solid #f3f3f3;
            color: #505050;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
          "
        >
          <p style="font-size: 15px;">Hi ' . $name . ',</p>
          <p style="margin-bottom: 20px;font-size: 15px;">
            Please confirm that you want to use
            <strong> ' . $email . '</strong> as account email address.
            Please click the button below to set your password
            and start using Online Payroll System.
          </p>

          <a
            href="' . $ROOT_DOMAIN . '' . $password_link . '?key=' . $key . '"
            style="
              padding: 4px 25px;
              background-color: #630b3c;
              color: #fff;
              display: inline-block;
              text-decoration: none;
              font-size: 13px;
              border-radius: 30px;
              margin-bottom: 10px;
            "
            >Create Password</a
          >
        </div>
      </div>

      <div style="padding: 10px">
        <div style="color: #505050">
          <p style="font-size: 12px">
            Having issues with the link? try to paste this text on the browser
            URL:
            <a
              rel="nofollow"
              style="
                font-size: 12px;
                font-family: Helvetica Neue, san-serif;
                text-decoration: none;
                color: #505050;
              "
              >' . $ROOT_DOMAIN . '' . $password_link . '?key=' . $key . '</a
            >
          </p>
        </div>
      </div>

      <div
        style="
          text-align: center;
          padding: 20px 0;
          margin: 0 10px;
          border-top: 1px solid #ddd;
        "
      >
        <p style="font-size: 10px; line-height: 1.4; opacity: 0.5">
          &copy; ' . date("Y") . ' All Rights Reserved <br />
          Frontline Business Solutions, Inc., Baloc Road, Brgy. San Ignacio
          <br />
          San Pablo City, 4000, Laguna, Philippines
        </p>
      </div>
    </div>
  </body>
';
  return $html;
}

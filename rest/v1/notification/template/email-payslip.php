<?php

function getHtmlEmailPayslip()
{
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
      font-size: 14px;
    }

    .info td {
      padding: 2px;
      font-size: 14px;
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
    <div style="width: 100%; max-width: 500px; margin: 10px auto">
      <div style="padding: 10px 10px 0px">
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
            line-height: 1.2;
            color: #000000;
            font-size: 15px;
            width: 70%;
            margin-top: 20px;
          "
        >
          PAYROLL SYSTEM ELECTRONIC PAYSLIP
        </h1>
        <div
          style="
            margin: 20px 0;
            padding: 20px;
            border-top: 1px solid #f3f3f3;
            color: #505050;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
          "
        >
          <p style="margin-bottom: 20px">
            In order to view your payslip, please login to your Human Resource
            Information System for authorization and security pursposes by
            clicking
            <span style="color: #0b6351"> MyInfo > Payslip</span>.
          </p>

          <a
            href="https://hr-app.frontlinebusiness.com.ph/login"
            style="
              padding: 4px 25px;
              background-color: #0b6351;
              color: #fff;
              display: inline-block;
              text-decoration: none;
              font-size: 13px;
              border-radius: 30px;
              margin-bottom: 10px;
            "
            >Login</a
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
                text-decoration: underline;
                font-size: 12px;
                font-family: Helvetica Neue, san-serif;
                color: #505050;
              "
              >https://hr-app.frontlinebusiness.com.ph/login</a
            >
          </p>
        </div>
      </div>

      <div
        style="
          text-align: center;
          padding: 20px 0px;
          border-top: 1px solid #ddd;
        "
      >
        <p style="font-size: 10px; line-height: 1.4; opacity: 0.5">
          &copy; 2023 All Rights Reserved <br />
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

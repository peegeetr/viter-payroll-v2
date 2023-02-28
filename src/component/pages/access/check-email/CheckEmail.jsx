import React from "react";
import { IoIosMailOpen } from "react-icons/io";
import FbsLogoLg from "../../../svg/FbsLogoLg.jsx";
const CheckEmail = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-[25rem] w-full text-center border border-solid border-zinc-100	p-6 shadow-sm">
        <IoIosMailOpen className="mx-auto text-6xl mb-5 fill-primary" />
        <h1 className="text-2xl uppercase mb-2">Email Confirmation</h1>
        <p>
          We have sent email to{" "}
          <strong className="text-primary">ramon.plaza@gmail.com</strong> to
          confirm the validity of your email address. After receiving the email
          follow the link provided to complete your registration
        </p>
        <p className="mt-6 py-4 border-t-[1px] border-solid border-zinc-100 text-xs">
          Did not receive the mail? Check your spam or junk folder
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;

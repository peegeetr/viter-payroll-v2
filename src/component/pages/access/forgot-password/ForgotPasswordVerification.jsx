import React from "react";
import { IoIosUnlock } from "react-icons/io";
import { StoreContext } from "../../../../store/StoreContext";
import { getUrlParam } from "../../../helpers/functions-general";

const ForgotPasswordVerification = () => {
  const email = getUrlParam().get("email");

  return (
    <>
      <div
        className="flex justify-center items-center "
        style={{ transform: "translateY(clamp(5rem,17vw,22rem))" }}
      >
        <div className="max-w-[25rem] w-full text-center p-6">
          <IoIosUnlock className="mx-auto text-6xl mb-5 fill-yellow-500" />
          <h1 className="text-2xl uppercase mb-2">Reset Password Email Sent</h1>
          <p>
            We have sent email to
            <strong className="text-primary"> {email}</strong>. After receiving
            the email follow the link provided to reset your password.
          </p>
          <p className="mt-6 py-4 border-t-[1px] border-solid border-zinc-100 text-xs">
            Did not receive the mail? Check your spam or junk folder
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordVerification;

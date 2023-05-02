import { FaCheck } from "react-icons/fa";
import { devNavUrl, getUrlParam } from "../../../helpers/functions-general";
import FbsLogoLg from "../../../svg/FbsLogoLg";

const ForgotPasswordVerification = () => {
  const email = getUrlParam().get("email");
  const redirect = getUrlParam().get("redirect");

  return (
    <>
      <div
        className="flex justify-center items-center "
        style={{ transform: "translateY(clamp(5rem,12vw,22rem))" }}
      >
        <div className="max-w-[25rem] w-full text-center p-6">
          <div className="flex justify-center ">
            <FbsLogoLg />
          </div>
          <FaCheck className="mx-auto text-6xl my-5 fill-green-600" />
          <h1 className="text-2xl uppercase mb-2">Reset Password Email Sent</h1>
          <p>
            We have sent email to
            <strong className="text-primary"> {email}</strong>. After receiving
            the email follow the link provided to reset your password.
          </p>
          <p className="mt-6 py-4 border-t-[1px] border-solid border-zinc-100 text-xs">
            Did not receive the mail? Check your spam or junk folder
          </p>
          <a href={`${devNavUrl}${redirect}`} className="btn-primary">
            Proceed to Login
          </a>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordVerification;

import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { devNavUrl, getUrlParam } from "../../../helpers/functions-general.jsx";
const CreatePasswordSuccess = () => {
  const redirect = getUrlParam().get("redirect");
  const removeItem = () => {
    localStorage.removeItem("fbsPayroll");
  };
  return (
    <>
      <div
        className="flex justify-center items-center"
        style={{ transform: "translateY(clamp(5rem,17vw,22rem))" }}
      >
        <div className="max-w-[25rem] w-full text-center p-6">
          <FaCheck className="mx-auto text-6xl mb-5 fill-green-600" />
          <h1 className="text-2xl uppercase mb-2">All Set</h1>
          <p className="mb-6">
            Your password has been successfully set! You can now login using
            your new password
          </p>
          <Link
            to={`${devNavUrl}${redirect}`}
            onClick={removeItem}
            className="btn-primary"
          >
            Proceed to Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default CreatePasswordSuccess;

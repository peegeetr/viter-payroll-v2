import React from "react";
import FbsLogoLg from "../svg/FbsLogoLg";
import { FaTools } from "react-icons/fa";

const PageUnderMaintenance = () => {
  return (
    <>
      <div
        className="flex justify-center items-center"
        style={{ transform: "translateY(clamp(5rem,10vw,22rem))" }}
      >
        <div className="max-w-[25rem] w-full text-center p-6">
          <div className="flex justify-center mb-6">
            <FbsLogoLg />
          </div>
          <FaTools className="mx-auto text-6xl my-5 fill-primary" />
          <h2 className="font-bold text-2xl">Will be right back . . .</h2>
          <p className="font-bold mb-6">Thank you for your patience.</p>
          <p className="mb-6">
            Our developer are working quickly to resolve the issue.
          </p>
        </div>
      </div>
    </>
  );
};

export default PageUnderMaintenance;

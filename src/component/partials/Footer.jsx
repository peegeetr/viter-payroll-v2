import React from "react";
import FbsLogoDark from "../svg/FbsLogoDark";
import DemoMode from "./DemoMode";

const Footer = () => {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <>
      <footer className="absolute right-0 bottom-0 left-0 flex justify-center flex-col items-center z-10 py-2 print:hidden">
        <FbsLogoDark className />
        <div className="flex items-center text-xs mt-1 gap-1">
          &copy; {getCurrentYear()} | <button type="button">Support</button>
        </div>
      </footer>
    </>
  );
};

export default Footer;

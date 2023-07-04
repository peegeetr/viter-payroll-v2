import React from "react";

import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const HolidayIsObserved = ({ item, isWorkOnHoliday, isObserved }) => {
  return (
    <>
      {isWorkOnHoliday === "0" && (isObserved === "1" || isObserved === 1) ? (
        <div className="flex items-center absolute right-[86px] mt-4 text-primary">
          <ImCross className="text-red-800" />
          <p className=" mb-0 ml-2">Will not observe</p>
        </div>
      ) : isObserved === "0" || isObserved === 0 ? (
        <div className="flex items-center absolute right-[100px] mt-4  ">
          <FaCheck className="text-green-800" />

          <p className=" mb-0 ml-2 text-primary">Will observe</p>
        </div>
      ) : item && isWorkOnHoliday === "1" ? (
        <div className="flex items-center absolute right-[100px] mt-4  ">
          <FaCheck className="text-green-800" />
          <p className=" mb-0 ml-2 text-primary">Will observe</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default HolidayIsObserved;

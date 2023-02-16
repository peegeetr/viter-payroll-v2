import React from "react";

const StatusOngoing = ({ text = "Ongoing" }) => {
  return (
    <span className="bg-orange-200 text-green-800 text-[10px] font-medium mr-2 px-2 py-0.2 rounded-full ">
      {text}
    </span>
  );
};

export default StatusOngoing;
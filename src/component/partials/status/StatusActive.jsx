import React from "react";

const StatusActive = ({ text = "Active" }) => {
  return (
    <span className="bg-green-200 text-green-800 text-[10px] font-medium mr-2 px-2 py-0.2 rounded-full ">
      {text}
    </span>
  );
};

export default StatusActive;

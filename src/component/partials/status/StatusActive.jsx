import React from "react";

const StatusActive = ({ text = "Active" }) => {
  return (
    <span className="bg-green-200 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
      {text}
    </span>
  );
};

export default StatusActive;

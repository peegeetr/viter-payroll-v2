import React from "react";

const StatusInactive = ({ text = "Inactive" }) => {
  return (
    <span className="bg-gray-100 text-gray-800 text-[10px] font-medium mr-2 px-2 py-0.2 rounded-full">
      {text}
    </span>
  );
};

export default StatusInactive;

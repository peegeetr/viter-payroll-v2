import React from "react";

const StatusInactive = ({ text = "Inactive" }) => {
  return (
    <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
      {text}
    </span>
  );
};

export default StatusInactive;

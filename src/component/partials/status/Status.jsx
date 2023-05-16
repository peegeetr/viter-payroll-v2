import React from "react";

const Status = ({ text = "completed" }) => {
  return (
    <span
      className={
        text === "stop"
          ? "bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full capitalize"
          : text === "ongoing"
          ? "bg-orange-100 text-orange-800 text-xs font-medium px-2 py-0.5 rounded-full capitalize"
          : "bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full capitalize"
      }
    >
      {text}
    </span>
  );
};

export default Status;

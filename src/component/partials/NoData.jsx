import React from "react";
import { FaFolderOpen } from "react-icons/fa";

const NoData = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col p-2">
        <span className="text-7xl text-gray-400">
          <FaFolderOpen />
        </span>
        <span className="font-bold text-gray-300 text-2xl">No Data</span>
      </div>
    </>
  );
};

export default NoData;
